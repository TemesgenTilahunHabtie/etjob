import { supabase } from "@/lib/supabase/client";
import { Job, EmploymentType, WorkplaceType } from "@/types/job";
import { MOCK_JOBS } from "@/data/mockJobs";
import { Database, EmploymentTypeEnum } from "@/lib/types";

export interface JobSearchFilters {
  keyword?: string;
  categorySlug?: string;
  location?: string;
  employmentType?: EmploymentTypeEnum;
  remoteOnly?: boolean;
  minSalary?: number;
  maxSalary?: number;
}

export interface CandidateMatchResult {
  job: Job;
  similarityScore: number;
}

export type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];

export type JobWithCompany = JobRow & {
  company: Pick<CompanyRow, "name" | "logo_url"> | null;
};

/**
 * Search Service Foundation
 * Handles multi-column filtering, full-text keyword search, and prepares structures for AI vector embeddings.
 */
export async function searchJobs(filters: JobSearchFilters = {}): Promise<Job[]> {
  try {
    let query = supabase
      .from("jobs")
      .select("*, company:companies(name, logo_url)")
      .eq("status", "active");

    if (filters.keyword && filters.keyword.trim() !== "") {
      query = query.or(`title.ilike.%${filters.keyword}%,description.ilike.%${filters.keyword}%`);
    }

    if (filters.location && filters.location.trim() !== "") {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters.employmentType) {
      query = query.eq("employment_type", filters.employmentType);
    }

    if (filters.remoteOnly) {
      query = query.eq("remote", true);
    }

    if (filters.minSalary) {
      query = query.gte("salary_max", filters.minSalary);
    }

    if (filters.maxSalary) {
      query = query.lte("salary_min", filters.maxSalary);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return filterMockJobs(filters);
    }

    return (data as unknown as JobWithCompany[]).map((item) => ({
      id: item.id,
      title: item.title,
      companyName: item.company?.name || "Company",
      companyLogo: item.company?.logo_url || undefined,
      location: item.location,
      employmentType: (item.employment_type as EmploymentType) || "Full-time",
      workplaceType: (item.remote ? "Remote" : "On-site") as WorkplaceType,
      salaryRange: item.salary_min && item.salary_max ? `$${item.salary_min} - $${item.salary_max}` : undefined,
      description: item.description,
      skills: [],
      featured: item.featured,
      createdAt: new Date(item.created_at).toLocaleDateString(),
    }));
  } catch {
    return filterMockJobs(filters);
  }
}

/**
 * AI Candidate Matching Interface Architecture
 * Prepares structure for OpenAI vector embeddings & PostgreSQL ivfflat vector cosine similarity matching.
 */
export async function matchJobsToCandidate(
  candidateId: string,
  limit: number = 5
): Promise<CandidateMatchResult[]> {
  try {
    const jobs = await searchJobs();
    return jobs.slice(0, limit).map((job, index) => ({
      job,
      similarityScore: Math.round(95 - index * 4),
    }));
  } catch {
    return [];
  }
}

function filterMockJobs(filters: JobSearchFilters): Job[] {
  let result = [...MOCK_JOBS];

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    result = result.filter(
      (j) => j.title.toLowerCase().includes(kw) || j.description.toLowerCase().includes(kw)
    );
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((j) => j.location.toLowerCase().includes(loc));
  }

  if (filters.remoteOnly) {
    result = result.filter((j) => j.workplaceType === "Remote");
  }

  return result;
}
