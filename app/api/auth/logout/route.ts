import { NextResponse } from "next/server";
import { createServerInstance } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createServerInstance();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
