import { canManageCompanyJobs, canManageCompanyMembers } from "@/lib/auth/permissions";

export function testPermissionsIntegration(): boolean {
  return canManageCompanyJobs("owner") && !canManageCompanyMembers("recruiter");
}
