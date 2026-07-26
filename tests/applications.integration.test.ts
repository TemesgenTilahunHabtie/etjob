import { getCandidateApplications } from "@/services/applications";

export async function testApplicationsIntegration(): Promise<boolean> {
  try {
    const apps = await getCandidateApplications("demo-candidate-id");
    return Array.isArray(apps);
  } catch {
    return false;
  }
}
