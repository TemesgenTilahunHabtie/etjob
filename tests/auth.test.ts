import { isCandidate, isEmployer, isAdmin, hasRole } from "@/lib/auth/roles";
import { canManageCompanyJobs, canManageCompanyMembers } from "@/lib/auth/permissions";

export function runAuthUnitTests(): { passed: boolean; message: string } {
  try {
    if (!isCandidate("candidate")) throw new Error("isCandidate candidate failed");
    if (isCandidate("employer")) throw new Error("isCandidate employer failed");
    if (!isEmployer("employer")) throw new Error("isEmployer failed");
    if (!isAdmin("admin")) throw new Error("isAdmin failed");
    if (!hasRole("employer", ["employer", "admin"])) throw new Error("hasRole failed");

    if (!canManageCompanyJobs("owner")) throw new Error("canManageCompanyJobs owner failed");
    if (!canManageCompanyJobs("recruiter")) throw new Error("canManageCompanyJobs recruiter failed");
    if (canManageCompanyMembers("recruiter")) throw new Error("canManageCompanyMembers recruiter failed");
    if (!canManageCompanyMembers("admin")) throw new Error("canManageCompanyMembers admin failed");

    return { passed: true, message: "All auth unit tests passed successfully." };
  } catch (err) {
    return { passed: false, message: (err as Error).message };
  }
}
