import { CompanyMemberRole } from "@/lib/types";

export function canManageCompanyJobs(memberRole?: CompanyMemberRole | null): boolean {
  if (!memberRole) return false;
  return ["owner", "admin", "recruiter", "hr_manager"].includes(memberRole);
}

export function canManageCompanyMembers(memberRole?: CompanyMemberRole | null): boolean {
  if (!memberRole) return false;
  return ["owner", "admin"].includes(memberRole);
}

export function canEditCompanyDetails(memberRole?: CompanyMemberRole | null): boolean {
  if (!memberRole) return false;
  return ["owner", "admin"].includes(memberRole);
}
