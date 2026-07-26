import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types";

/**
 * Browser/Client-side Supabase Client Layer
 * 
 * Purpose:
 * Provides singleton browser client access to Supabase for React Client Components ('use client').
 * Automatically reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from environment.
 * Generates strongly typed queries using the Database schema type interface.
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Export singleton instance for client component usage
export const supabase = createBrowserClient();
