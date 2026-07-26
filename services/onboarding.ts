import { supabase } from "@/lib/supabase/client";
import { Database, ExperienceLevelType } from "@/lib/types";

export interface CandidateOnboardingData {
  userId: string;
  fullName: string;
  headline?: string;
  bio?: string;
  location?: string;
  yearsExperience?: number;
  skills?: { skillId: string; experienceLevel?: ExperienceLevelType }[];
  resumeUrl?: string;
  preferredLocations?: string[];
  preferredJobTypes?: string[];
  salaryExpectation?: number;
  remotePreference?: boolean;
}

export interface EmployerOnboardingData {
  userId: string;
  companyName: string;
  companySlug: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
}

/**
 * Onboarding Service
 */
export async function completeCandidateProfile(
  data: CandidateOnboardingData
): Promise<{ success: boolean; error: Error | null }> {
  try {
    // 1. Update Core Profile full name
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: data.fullName, updated_at: new Date().toISOString() })
      .eq("id", data.userId);

    if (profileError) return { success: false, error: new Error(profileError.message) };

    // 2. Upsert Candidate Profile details
    const completionScore = calculateCandidateCompletionScore(data);

    const { data: candProfile, error: candError } = await supabase
      .from("candidate_profiles")
      .upsert({
        user_id: data.userId,
        headline: data.headline || null,
        bio: data.bio || null,
        location: data.location || null,
        years_experience: data.yearsExperience || 0,
        resume_url: data.resumeUrl || null,
        profile_completion: completionScore,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (candError || !candProfile) return { success: false, error: new Error(candError?.message || "Candidate profile failed") };

    // 3. Add Candidate Skills
    if (data.skills && data.skills.length > 0) {
      const skillsToInsert = data.skills.map((s) => ({
        candidate_id: candProfile.id,
        skill_id: s.skillId,
        experience_level: s.experienceLevel || ("mid" as ExperienceLevelType),
      }));

      await supabase.from("candidate_skills").upsert(skillsToInsert, { onConflict: "candidate_id,skill_id" });
    }

    // 4. Upsert Job Preferences
    await supabase.from("job_preferences").upsert({
      candidate_id: candProfile.id,
      preferred_locations: data.preferredLocations || [],
      preferred_job_types: data.preferredJobTypes || [],
      salary_expectation: data.salaryExpectation || 0,
      remote_preference: data.remotePreference ?? true,
    });

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

export async function completeEmployerProfile(
  data: EmployerOnboardingData
): Promise<{ companyId: string | null; error: Error | null }> {
  try {
    // 1. Update Core Profile role
    await supabase
      .from("profiles")
      .update({ role: "employer", updated_at: new Date().toISOString() })
      .eq("id", data.userId);

    // 2. Insert Company record
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({
        owner_id: data.userId,
        name: data.companyName,
        slug: data.companySlug,
        industry: data.industry || null,
        location: data.location || null,
        website: data.website || null,
        description: data.description || null,
        logo_url: data.logoUrl || null,
      })
      .select()
      .single();

    if (companyError || !company) return { companyId: null, error: new Error(companyError?.message || "Company creation failed") };

    // 3. Insert Owner Member
    await supabase.from("company_members").insert({
      company_id: company.id,
      user_id: data.userId,
      role: "owner",
    });

    return { companyId: company.id, error: null };
  } catch (err) {
    return { companyId: null, error: err as Error };
  }
}

export async function getProfileCompletion(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("candidate_profiles")
      .select("profile_completion")
      .eq("user_id", userId)
      .single();

    if (error || !data) return 0;
    return data.profile_completion || 0;
  } catch {
    return 0;
  }
}

function calculateCandidateCompletionScore(data: CandidateOnboardingData): number {
  let score = 20; // Base signup score
  if (data.headline) score += 20;
  if (data.bio) score += 15;
  if (data.location) score += 10;
  if (data.skills && data.skills.length > 0) score += 15;
  if (data.resumeUrl) score += 20;
  return Math.min(score, 100);
}
