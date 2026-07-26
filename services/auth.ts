import { supabase } from "@/lib/supabase/client";
import { UserRole } from "@/lib/types";
import { User, Session } from "@supabase/supabase-js";

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

/**
 * Supabase Authentication Data Access Service
 */
export async function signUp({
  email,
  password,
  fullName,
  role,
}: SignUpParams): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      return { user: null, session: null, error: new Error(error.message) };
    }

    // Automatically ensure profile record exists in profiles table
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        role: role,
        updated_at: new Date().toISOString(),
      });

      // If candidate role, initialize candidate_profiles row
      if (role === "candidate") {
        await supabase.from("candidate_profiles").upsert({
          user_id: data.user.id,
          profile_completion: 20,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return { user: data.user, session: data.session, error: null };
  } catch (err) {
    return { user: null, session: null, error: err as Error };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, session: null, error: new Error(error.message) };
    }

    return { user: data.user, session: data.session, error: null };
  } catch (err) {
    return { user: null, session: null, error: err as Error };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: new Error(error.message) };
    return { error: null };
  } catch (err) {
    return { error: err as Error };
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    return session;
  } catch {
    return null;
  }
}

export async function resetPassword(
  email: string,
  redirectTo?: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) return { success: false, error: new Error(error.message) };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
