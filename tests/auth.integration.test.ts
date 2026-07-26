import { isCandidate, isEmployer, isAdmin } from "@/lib/auth/roles";

export function testAuthIntegration(): boolean {
  return isCandidate("candidate") && isEmployer("employer") && isAdmin("admin");
}
