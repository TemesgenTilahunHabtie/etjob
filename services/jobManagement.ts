import { supabase } from "@/lib/supabase/client";
import { Database, JobStatusEnum, EmploymentTypeEnum, ExperienceLevelType } from "@/lib/types";

export type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
export type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];

export interface CreateJobInput {
  companyId: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  employmentType?: EmploymentTypeEnum;
  experienceLevel?: ExperienceLevelType;
  salaryMin?: number;
  salaryMax?: number;
  remote?: boolean;
  featured?: boolean;
  status?: JobStatusEnum;
  expiresAt?: string;
  skillIds?: string[];
}

/**
 * Job Management Service (Employer Workflow)
 */
export async function createManagedJob(
  input: CreateJobInput
): Promise<{ data: JobRow | null; error: Error | null }> {
  try {
    const validationError = validateJobInput(input);
    if (validationError) return { data: null, error: new Error(validationError) };

    const { data: job, error } = await supabase
      .from("jobs")
      .insert({
        company_id: input.companyId,
        category_id: input.categoryId,
        title: input.title,
        description: input.description,
        location: input.location,
        employment_type: input.employmentType || "Full-time",
        experience_level: input.experienceLevel || "mid",
        salary_min: input.salaryMin || null,
        salary_max: input.salaryMax || null,
        remote: input.remote ?? false,
        featured: input.featured ?? false,
        status: input.status || "active",
        expires_at: input.expiresAt || null,
      })
      .select()
      .single();

    if (error || !job) return { data: null, error: new Error(error?.message || "Failed to create job") };

    // Link Skill Requirements
    if (input.skillIds && input.skillIds.length > 0) {
      const jobSkills = input.skillIds.map((skillId) => ({
        job_id: job.id,
        skill_id: skillId,
      }));
      await supabase.from("job_skills").insert(jobSkills);
    }

    return { data: job, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateJobStatus(
  jobId: string,
  status: JobStatusEnum
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from("jobs")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", jobId);

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

export async function publishJob(jobId: string) {
  return updateJobStatus(jobId, "active");
}

export async function pauseJob(jobId: string) {
  return updateJobStatus(jobId, "paused");
}

export async function closeJob(jobId: string) {
  return updateJobStatus(jobId, "closed");
}

function validateJobInput(input: CreateJobInput): string | null {
  if (!input.title || input.title.trim().length < 3) {
    return "Job title must be at least 3 characters long.";
  }
  if (!input.description || input.description.trim().length < 10) {
    return "Job description must be at least 10 characters long.";
  }
  if (!input.location) {
    return "Job location is required.";
  }
  if (input.salaryMin && input.salaryMax && input.salaryMin > input.salaryMax) {
    return "Minimum salary cannot exceed maximum salary.";
  }
  return null;
}
