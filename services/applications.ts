import { supabase } from "@/lib/supabase/client";
import { Database, ApplicationStatusEnum } from "@/lib/types";

export type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];
export type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"];
export type ApplicationUpdate = Database["public"]["Tables"]["applications"]["Update"];

export interface ApplicationWithDetails extends ApplicationRow {
  job?: Database["public"]["Tables"]["jobs"]["Row"] & {
    company?: Pick<Database["public"]["Tables"]["companies"]["Row"], "name" | "logo_url"> | null;
  } | null;
  candidate?: Database["public"]["Tables"]["candidate_profiles"]["Row"] & {
    profile?: Pick<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "avatar_url"> | null;
  } | null;
}

/**
 * Data Access Service: Applications Subsystem
 */
export async function applyForJob(
  jobId: string,
  candidateId: string,
  coverLetter?: string
): Promise<{ data: ApplicationRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        job_id: jobId,
        candidate_id: candidateId,
        cover_letter: coverLetter || null,
        status: "submitted",
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function submitApplication(
  jobId: string,
  candidateId: string,
  coverLetter?: string
) {
  return applyForJob(jobId, candidateId, coverLetter);
}

export async function getMyApplications(
  candidateId: string
): Promise<ApplicationWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, job:jobs(*, company:companies(name, logo_url))")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as unknown as ApplicationWithDetails[];
  } catch {
    return [];
  }
}

export async function getCandidateApplications(candidateId: string) {
  return getMyApplications(candidateId);
}

export async function getJobApplications(
  jobId: string
): Promise<ApplicationWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*, candidate:candidate_profiles(*, profile:profiles(full_name, avatar_url))")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as unknown as ApplicationWithDetails[];
  } catch {
    return [];
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatusEnum
): Promise<{ data: ApplicationRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function withdrawApplication(
  applicationId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("applications")
      .update({ status: "withdrawn", updated_at: new Date().toISOString() })
      .eq("id", applicationId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
