import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/types";

export type SavedJobRow = Database["public"]["Tables"]["saved_jobs"]["Row"];

export interface SavedJobWithJob extends SavedJobRow {
  job?: Database["public"]["Tables"]["jobs"]["Row"] & {
    company?: Pick<Database["public"]["Tables"]["companies"]["Row"], "name" | "logo_url"> | null;
  } | null;
}

/**
 * Data Access Service: Saved Jobs (Bookmarks)
 */
export async function saveJob(
  candidateId: string,
  jobId: string
): Promise<{ data: SavedJobRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert({ candidate_id: candidateId, job_id: jobId })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function unsaveJob(
  candidateId: string,
  jobId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("candidate_id", candidateId)
      .eq("job_id", jobId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

export async function getSavedJobs(candidateId: string): Promise<SavedJobWithJob[]> {
  try {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job:jobs(*, company:companies(name, logo_url))")
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as unknown as SavedJobWithJob[];
  } catch {
    return [];
  }
}

export async function isJobSaved(
  candidateId: string,
  jobId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("candidate_id", candidateId)
      .eq("job_id", jobId)
      .single();

    return !error && !!data;
  } catch {
    return false;
  }
}
