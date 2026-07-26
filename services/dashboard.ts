import { supabase } from "@/lib/supabase/client";
import { Job, EmploymentType, WorkplaceType } from "@/types/job";
import { getFeaturedJobs } from "@/services/jobs";
import { Database } from "@/lib/types";

export interface CandidateDashboardData {
  profileCompletion: number;
  savedJobsCount: number;
  applicationsCount: number;
  recommendedJobs: Job[];
}

export interface EmployerDashboardData {
  company: Database["public"]["Tables"]["companies"]["Row"] | null;
  activeJobsCount: number;
  totalApplicantsCount: number;
  pendingApplicationsCount: number;
  recentJobs: Database["public"]["Tables"]["jobs"]["Row"][];
}

/**
 * Real Dashboard Data Aggregation Layer
 */
export async function getCandidateDashboard(userId: string): Promise<CandidateDashboardData> {
  try {
    // 1. Fetch Candidate Profile Completion
    const { data: candidate } = await supabase
      .from("candidate_profiles")
      .select("id, profile_completion")
      .eq("user_id", userId)
      .single();

    const candidateId = candidate?.id;
    const profileCompletion = candidate?.profile_completion || 20;

    let savedJobsCount = 0;
    let applicationsCount = 0;

    if (candidateId) {
      // 2. Fetch Saved Jobs Count
      const { count: savedCount } = await supabase
        .from("saved_jobs")
        .select("id", { count: "exact", head: true })
        .eq("candidate_id", candidateId);

      savedJobsCount = savedCount || 0;

      // 3. Fetch Applications Count
      const { count: appCount } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .eq("candidate_id", candidateId);

      applicationsCount = appCount || 0;
    }

    // 4. Recommended Jobs
    const recommendedJobs = await getFeaturedJobs(4);

    return {
      profileCompletion,
      savedJobsCount,
      applicationsCount,
      recommendedJobs,
    };
  } catch {
    return {
      profileCompletion: 20,
      savedJobsCount: 0,
      applicationsCount: 0,
      recommendedJobs: [],
    };
  }
}

export async function getEmployerDashboard(userId: string): Promise<EmployerDashboardData> {
  try {
    // 1. Fetch Company owned by user
    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", userId)
      .single();

    if (!company) {
      return {
        company: null,
        activeJobsCount: 0,
        totalApplicantsCount: 0,
        pendingApplicationsCount: 0,
        recentJobs: [],
      };
    }

    // 2. Fetch Jobs count
    const { count: activeJobsCount } = await supabase
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("company_id", company.id)
      .eq("status", "active");

    // 3. Fetch Recent Jobs
    const { data: recentJobs } = await supabase
      .from("jobs")
      .select("*")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false })
      .limit(5);

    // 4. Fetch Applications count for company jobs
    const { data: companyJobIds } = await supabase
      .from("jobs")
      .select("id")
      .eq("company_id", company.id);

    let totalApplicantsCount = 0;
    let pendingApplicationsCount = 0;

    if (companyJobIds && companyJobIds.length > 0) {
      const jobIds = companyJobIds.map((j) => j.id);

      const { count: totalApps } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .in("job_id", jobIds);

      totalApplicantsCount = totalApps || 0;

      const { count: pendingApps } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true })
        .in("job_id", jobIds)
        .eq("status", "submitted");

      pendingApplicationsCount = pendingApps || 0;
    }

    return {
      company,
      activeJobsCount: activeJobsCount || 0,
      totalApplicantsCount,
      pendingApplicationsCount,
      recentJobs: recentJobs || [],
    };
  } catch {
    return {
      company: null,
      activeJobsCount: 0,
      totalApplicantsCount: 0,
      pendingApplicationsCount: 0,
      recentJobs: [],
    };
  }
}
