import { supabase } from "@/lib/supabase/client";
import { Database, UserRole } from "@/lib/types";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

/**
 * Data Access Service: Profiles (Core Auth Identity Profile)
 */
export async function getProfile(userId: string): Promise<ProfileRow | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function updateProfile(
  userId: string,
  updates: ProfileUpdate
): Promise<{ data: ProfileRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function setUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
