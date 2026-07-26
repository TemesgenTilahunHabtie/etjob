import { createServerInstance } from "@/lib/supabase/server";
import { ProfileRow } from "@/services/profiles";
import { UserRole } from "@/lib/types";
import { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createServerInstance();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentProfile(): Promise<ProfileRow | null> {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const supabase = await createServerInstance();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<{ user: User; profile: ProfileRow }> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: User session required");
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("Unauthorized: Profile not found");
  }

  return { user, profile };
}

export async function requireRole(allowedRoles: UserRole[]): Promise<{ user: User; profile: ProfileRow }> {
  const { user, profile } = await requireUser();

  if (!allowedRoles.includes(profile.role)) {
    throw new Error(`Forbidden: Role in [${allowedRoles.join(", ")}] required`);
  }

  return { user, profile };
}

export async function requireCandidate(): Promise<{ user: User; profile: ProfileRow }> {
  return requireRole(["candidate", "admin"]);
}

export async function requireEmployer(): Promise<{ user: User; profile: ProfileRow }> {
  return requireRole(["employer", "admin"]);
}
