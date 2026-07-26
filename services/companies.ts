import { supabase } from "@/lib/supabase/client";
import { Database, CompanyMemberRole } from "@/lib/types";

export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];
export type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"];
export type CompanyUpdate = Database["public"]["Tables"]["companies"]["Update"];
export type CompanyMemberRow = Database["public"]["Tables"]["company_members"]["Row"];

export interface CompanyWithMembers extends CompanyRow {
  members?: (CompanyMemberRow & {
    profile?: Pick<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "avatar_url"> | null;
  })[];
}

/**
 * Data Access Service: Companies & Organization
 */
export async function getCompanyBySlug(slug: string): Promise<CompanyWithMembers | null> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*, members:company_members(*, profile:profiles(full_name, avatar_url))")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data as unknown as CompanyWithMembers;
  } catch {
    return null;
  }
}

export async function getCompanyById(id: string): Promise<CompanyWithMembers | null> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*, members:company_members(*, profile:profiles(full_name, avatar_url))")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as unknown as CompanyWithMembers;
  } catch {
    return null;
  }
}

export async function createCompany(
  ownerId: string,
  companyData: Omit<CompanyInsert, "owner_id">
): Promise<{ data: CompanyRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .insert({
        ...companyData,
        owner_id: ownerId,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };

    // Auto-add owner as company owner member
    if (data) {
      await supabase.from("company_members").insert({
        company_id: data.id,
        user_id: ownerId,
        role: "owner",
      });
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateCompany(
  companyId: string,
  updates: CompanyUpdate
): Promise<{ data: CompanyRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", companyId)
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function addCompanyMember(
  companyId: string,
  userId: string,
  role: CompanyMemberRole = "recruiter"
): Promise<{ data: CompanyMemberRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("company_members")
      .insert({
        company_id: companyId,
        user_id: userId,
        role,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function removeCompanyMember(
  memberId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("company_members")
      .delete()
      .eq("id", memberId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
