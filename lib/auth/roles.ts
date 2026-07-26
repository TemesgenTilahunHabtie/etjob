import { UserRole } from "@/lib/types";

export function isCandidate(role?: UserRole | null): boolean {
  return role === "candidate";
}

export function isEmployer(role?: UserRole | null): boolean {
  return role === "employer";
}

export function isAdmin(role?: UserRole | null): boolean {
  return role === "admin";
}

export function hasRole(userRole: UserRole | null | undefined, requiredRoles: UserRole[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}
