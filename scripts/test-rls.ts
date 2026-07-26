import { canManageCompanyJobs, canManageCompanyMembers } from "../lib/auth/permissions";
import { isCandidate, isEmployer, isAdmin } from "../lib/auth/roles";

export function verifyRLSAccessControlRules(): { passed: boolean; details: Record<string, boolean> } {
  const details = {
    candidateRoleCheck: isCandidate("candidate") && !isCandidate("employer"),
    employerRoleCheck: isEmployer("employer") && !isEmployer("candidate"),
    adminRoleCheck: isAdmin("admin"),
    companyJobsPermissionOwner: canManageCompanyJobs("owner"),
    companyJobsPermissionRecruiter: canManageCompanyJobs("recruiter"),
    companyMembersPermissionRecruiter: !canManageCompanyMembers("recruiter"),
    companyMembersPermissionAdmin: canManageCompanyMembers("admin"),
  };

  const passed = Object.values(details).every(Boolean);
  return { passed, details };
}

console.log("RLS Rules Test Results:", verifyRLSAccessControlRules());
