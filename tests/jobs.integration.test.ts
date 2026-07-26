import { getFeaturedJobs, getJobs } from "@/services/jobs";

export async function testJobsIntegration(): Promise<boolean> {
  try {
    const featured = await getFeaturedJobs(2);
    const all = await getJobs();
    return Array.isArray(featured) && Array.isArray(all);
  } catch {
    return false;
  }
}
