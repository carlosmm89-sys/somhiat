import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { path, referrer } = await request.json();
    if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });

    const supabase = await createClient();
    await supabase.from("page_views").insert({ path, referrer: referrer || null });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
