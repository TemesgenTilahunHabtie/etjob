import { supabase } from "@/lib/supabase/client";
import { Database, CompanyMemberRole, JobStatusEnum, EmploymentTypeEnum, ExperienceLevelType } from "@/lib/types";

export type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
export type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
export type JobUpdate = Database["public"]["Tables"]["jobs"]["Update"];
export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];
export type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"];
export type CompanyUpdate = Database["public"]["Tables"]["companies"]["Update"];
export type CompanyMemberRow = Database["public"]["Tables"]["company_members"]["Row"];

/**
 * Data Access Service: Employer Workflows
 */
export async function createCompany(
  ownerId: string,
  companyData: Omit<CompanyInsert, "owner_id">
): Promise<{ data: CompanyRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .insert({ ...companyData, owner_id: ownerId })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };

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
      .insert({ company_id: companyId, user_id: userId, role })
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

export async function createJob(
  jobData: JobInsert
): Promise<{ data: JobRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert({ ...jobData, status: jobData.status || "active" })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateJob(
  jobId: string,
  updates: JobUpdate
): Promise<{ data: JobRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", jobId)
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function deleteJob(
  jobId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

export async function getCompanyJobs(companyId: string): Promise<JobRow[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
