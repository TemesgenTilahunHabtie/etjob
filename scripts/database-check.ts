import { supabase } from "../lib/supabase/client";

export async function runDatabaseHealthCheck(): Promise<{ success: boolean; details: Record<string, boolean> }> {
  const details: Record<string, boolean> = {
    profiles: false,
    jobs: false,
    companies: false,
    applications: false,
  };

  try {
    const { error: pErr } = await supabase.from("profiles").select("id").limit(1);
    details.profiles = !pErr;

    const { error: jErr } = await supabase.from("jobs").select("id").limit(1);
    details.jobs = !jErr;

    const { error: cErr } = await supabase.from("companies").select("id").limit(1);
    details.companies = !cErr;

    const { error: aErr } = await supabase.from("applications").select("id").limit(1);
    details.applications = !aErr;

    const allPassed = Object.values(details).every(Boolean);
    return { success: allPassed, details };
  } catch {
    return { success: false, details };
  }
}
