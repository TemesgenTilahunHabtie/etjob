import { supabase } from "@/lib/supabase/client";
import { Database, ExperienceLevelType } from "@/lib/types";

export type CandidateProfileRow = Database["public"]["Tables"]["candidate_profiles"]["Row"];
export type CandidateProfileInsert = Database["public"]["Tables"]["candidate_profiles"]["Insert"];
export type CandidateProfileUpdate = Database["public"]["Tables"]["candidate_profiles"]["Update"];
export type CandidateSkillRow = Database["public"]["Tables"]["candidate_skills"]["Row"];
export type JobPreferenceRow = Database["public"]["Tables"]["job_preferences"]["Row"];

export interface FullCandidateProfile extends CandidateProfileRow {
  profile?: Database["public"]["Tables"]["profiles"]["Row"] | null;
  skills?: (CandidateSkillRow & {
    skill?: Database["public"]["Tables"]["skills"]["Row"] | null;
  })[];
  preferences?: JobPreferenceRow | null;
}

/**
 * Data Access Service: Candidate Profiles & Preferences
 */
export async function getCandidateProfileByUserId(
  userId: string
): Promise<FullCandidateProfile | null> {
  try {
    const { data, error } = await supabase
      .from("candidate_profiles")
      .select("*, profile:profiles(*), skills:candidate_skills(*, skill:skills(*)), preferences:job_preferences(*)")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;
    return data as unknown as FullCandidateProfile;
  } catch {
    return null;
  }
}

export async function createCandidateProfile(
  userId: string,
  profileData?: Partial<CandidateProfileInsert>
): Promise<{ data: CandidateProfileRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("candidate_profiles")
      .insert({
        user_id: userId,
        headline: profileData?.headline || null,
        bio: profileData?.bio || null,
        location: profileData?.location || null,
        years_experience: profileData?.years_experience || 0,
        resume_url: profileData?.resume_url || null,
        profile_completion: 20,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateCandidateProfile(
  candidateId: string,
  updates: CandidateProfileUpdate
): Promise<{ data: CandidateProfileRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("candidate_profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", candidateId)
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function addSkillToCandidate(
  candidateId: string,
  skillId: string,
  experienceLevel: ExperienceLevelType = "mid"
): Promise<{ data: CandidateSkillRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("candidate_skills")
      .insert({
        candidate_id: candidateId,
        skill_id: skillId,
        experience_level: experienceLevel,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function removeSkillFromCandidate(
  candidateSkillId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("candidate_skills")
      .delete()
      .eq("id", candidateSkillId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

export async function updateJobPreferences(
  candidateId: string,
  preferences: Partial<JobPreferenceRow>
): Promise<{ data: JobPreferenceRow | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("job_preferences")
      .upsert({
        candidate_id: candidateId,
        preferred_locations: preferences.preferred_locations || [],
        preferred_job_types: preferences.preferred_job_types || [],
        salary_expectation: preferences.salary_expectation || 0,
        remote_preference: preferences.remote_preference ?? true,
      })
      .select()
      .single();

    if (error) return { data: null, error: new Error(error.message) };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
