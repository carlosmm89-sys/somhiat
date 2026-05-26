import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600; // cache 1h

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, key);

  // Check if there's a custom favicon in site_config
  const { data } = await supabase
    .from("site_config")
    .select("value")
    .eq("key", "faviconUrl")
    .single();

  if (data?.value) {
    // Proxy the image from Supabase Storage
    const cleanUrl = data.value.split("?")[0]; // remove cache-bust param
    const res = await fetch(cleanUrl);
    if (res.ok) {
      const blob = await res.blob();
      return new NextResponse(blob, {
        headers: {
          "Content-Type": res.headers.get("Content-Type") || "image/png",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      });
    }
  }

  // Fallback: serve the static icon
  const fallbackUrl = `${url}/storage/v1/object/public/site-assets/favicon.png`;
  try {
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const blob = await res.blob();
      return new NextResponse(blob, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch {
    // ignore
  }

  // Last resort: 1x1 transparent pixel
  return new NextResponse(null, { status: 404 });
}
