import { NextResponse } from "next/server";
import { createServerInstance } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName, role } = body;

    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: "Missing required fields (email, password, fullName, role)" },
        { status: 400 }
      );
    }

    const supabase = await createServerInstance();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        role: role,
        updated_at: new Date().toISOString(),
      });

      if (role === "candidate") {
        await supabase.from("candidate_profiles").upsert({
          user_id: data.user.id,
          profile_completion: 20,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ user: data.user, session: data.session }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
