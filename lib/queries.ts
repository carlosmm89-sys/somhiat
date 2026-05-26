import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Project } from "@/types";
import { STATIC_PROJECTS, STATIC_FEATURED } from "@/lib/static-data";

// ─── Supabase server client ───────────────────────────────────────────
async function getClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return url.startsWith("https://") && key.startsWith("eyJ") && key.length > 50;
}

// ─── Read queries (Supabase → fallback static) ────────────────────────

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return STATIC_FEATURED;
  try {
    const supabase = await getClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);
    if (error || !data?.length) throw error ?? new Error("empty");
    return data as Project[];
  } catch {
    return STATIC_FEATURED;
  }
}

export async function getProjects(category?: string): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    if (category && category !== "all") return STATIC_PROJECTS.filter((p) => p.category === category);
    return STATIC_PROJECTS;
  }
  try {
    const supabase = await getClient();
    let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (category && category !== "all") query = query.eq("category", category);
    const { data, error } = await query;
    if (error || !data?.length) throw error ?? new Error("empty");
    return data as Project[];
  } catch {
    if (category && category !== "all") return STATIC_PROJECTS.filter((p) => p.category === category);
    return STATIC_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
  try {
    const supabase = await getClient();
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
    if (error || !data) throw error ?? new Error("not found");
    return data as Project;
  } catch {
    return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getAdjacentProjects(
  slug: string,
  sort_order: number
): Promise<{ prev: Project | null; next: Project | null }> {
  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}

// ─── Contact (Supabase only) ──────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

function getAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function saveContactMessage(data: {
  name: string; email: string; subject?: string; message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const sb = getAnon();
  if (!sb) return { ok: false, error: "Not configured" };
  const { error } = await sb.from("contact_messages").insert(data);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
