// ── Types for SOMHi Arquitectura Técnica ──────────────────

export type ProjectCategory =
  | "obra_nueva"
  | "rehabilitacion"
  | "viviendas"
  | "otros";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number | null;
  location: string | null;
  client: string | null;
  status: "completed" | "in_progress";
  area: string | null;
  description: string | null;
  body: string | null;
  cover_url: string | null;
  gallery: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export const CATEGORY_LABELS: Record<ProjectCategory | "todos", string> = {
  todos:          "Todos",
  "obra_nueva":   "Obra Nueva",
  rehabilitacion: "Rehabilitación",
  viviendas:      "Viviendas",
  otros:          "Otros",
};
