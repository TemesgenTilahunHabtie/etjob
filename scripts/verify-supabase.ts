import { supabase } from "../lib/supabase/client";
import { getCategories } from "../services/categories";
import { getFeaturedJobs, getJobs } from "../services/jobs";
import { getCandidateDashboard, getEmployerDashboard } from "../services/dashboard";

export async function runSupabaseCloudVerification() {
  console.log("Starting Supabase Cloud verification...");

  const results: Record<string, boolean> = {
    readCategories: false,
    readJobs: false,
    readCompanies: false,
    candidateDashboard: false,
    employerDashboard: false,
  };

  try {
    // 1. Read Job Categories
    const categories = await getCategories();
    results.readCategories = Array.isArray(categories) && categories.length > 0;

    // 2. Read Jobs
    const jobs = await getJobs();
    results.readJobs = Array.isArray(jobs);

    // 3. Read Companies
    const { data: companies, error: compErr } = await supabase.from("companies").select("*").limit(5);
    results.readCompanies = !compErr && Array.isArray(companies);

    // 4. Test Candidate Dashboard Service
    const candidateDash = await getCandidateDashboard("00000000-0000-0000-0000-000000000000");
    results.candidateDashboard = typeof candidateDash.profileCompletion === "number";

    // 5. Test Employer Dashboard Service
    const employerDash = await getEmployerDashboard("00000000-0000-0000-0000-000000000000");
    results.employerDashboard = typeof employerDash.activeJobsCount === "number";

    console.log("Supabase Cloud verification results:", results);
    return results;
  } catch (err) {
    console.error("Verification failed:", err);
    return results;
  }
}

runSupabaseCloudVerification();
