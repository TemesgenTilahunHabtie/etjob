import { supabase } from "@/lib/supabase/client";
import { Job, EmploymentType, WorkplaceType } from "@/types/job";
import { MOCK_JOBS } from "@/data/mockJobs";
import { Database } from "@/lib/types";

export type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];

export type JobWithCompany = JobRow & {
  company: Pick<CompanyRow, "name" | "logo_url"> | null;
};

/**
 * Data Access Service: Jobs
 * Connects frontend components to Supabase `jobs` table with fallback to seed data.
 */

export async function getFeaturedJobs(limit: number = 2): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company:companies(name, logo_url)")
      .eq("status", "active")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      return MOCK_JOBS.slice(0, limit);
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
    return MOCK_JOBS.slice(0, limit);
  }
}

export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company:companies(name, logo_url)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_JOBS;
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
    return MOCK_JOBS;
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company:companies(name, logo_url)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return MOCK_JOBS.find((j) => j.id === id) || null;
    }

    const item = data as unknown as JobWithCompany;

    return {
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
    };
  } catch {
    return MOCK_JOBS.find((j) => j.id === id) || null;
  }
}
