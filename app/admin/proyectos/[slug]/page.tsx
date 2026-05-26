"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import ImageUploader from "@/components/admin/ImageUploader";
import { STATIC_PROJECTS } from "@/lib/static-data";
import type { Project, ProjectCategory } from "@/types";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

const CATS: { value: ProjectCategory; label: string }[] = [
  { value: "obra_nueva",      label: "Obra Nueva" },
  { value: "rehabilitacion",  label: "Rehabilitación de Edificios" },
  { value: "viviendas",       label: "Viviendas" },
];

interface Props { params: Promise<{ slug: string }> }

export default function EditarProyectoPage({ params }: Props) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    params.then(({ slug: s }) => {
      setSlug(s);
      // Try Supabase first, fall back to static
      const supabase = createClient();
      supabase.from("projects").select("*").eq("slug", s).single()
        .then(({ data, error }) => {
          if (data && !error) setProject(data as Project);
          else {
            const fallback = STATIC_PROJECTS.find((p) => p.slug === s) ?? null;
            setProject(fallback);
          }
        });
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      title:       fd.get("title") as string,
      category:    fd.get("category") as ProjectCategory,
      description: fd.get("description") as string,
      body:        fd.get("body") as string,
      location:    fd.get("location") as string,
      year:        fd.get("year") ? Number(fd.get("year")) : null,
      client:      fd.get("client") as string,
      status:      fd.get("status") as "completed" | "in_progress",
      cover_url:   fd.get("cover_url") as string || project.cover_url,
      gallery:     JSON.parse((fd.get("gallery") as string) || JSON.stringify(project.gallery ?? [])),
      featured:    fd.get("featured") === "on",
      sort_order:  Number(fd.get("sort_order") || project.sort_order),
    };

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("projects")
      .update(data)
      .eq("slug", project.slug);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push("/admin/proyectos");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!project) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("projects").delete().eq("slug", project.slug);
    router.push("/admin/proyectos");
    router.refresh();
  }

  if (!project) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      <p style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4a5254" }}>
        Cargando...
      </p>
    </div>
  );

  return (
    <div style={{ maxWidth: "860px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a5254", marginBottom: "0.5rem" }}>
            Editar proyecto
          </p>
          <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#dfe3e6" }}>
            {project.title}
          </h1>
        </div>
        <button onClick={() => setConfirmDelete(true)} style={{
          padding: "0.6rem 1.2rem", backgroundColor: "transparent",
          border: "1px solid rgba(248,113,113,0.3)",
          color: "#f87171", fontFamily: fontB, fontSize: "13px", cursor: "pointer",
        }}>
          Borrar proyecto
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <Field label="Título *">
            <input name="title" required defaultValue={project.title} style={inputStyle} />
          </Field>
          <Field label="Slug (URL)">
            <input name="slug" defaultValue={project.slug} disabled style={{ ...inputStyle, opacity: 0.4, cursor: "not-allowed" }} />
          </Field>
          <Field label="Categoría *">
            <select name="category" required defaultValue={project.category} style={inputStyle}>
              {CATS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </Field>
          <Field label="Estado">
            <select name="status" defaultValue={project.status ?? "completed"} style={inputStyle}>
              <option value="completed">Completado</option>
              <option value="in_progress">En ejecución</option>
            </select>
          </Field>
          <Field label="Ubicación">
            <input name="location" defaultValue={project.location ?? ""} style={inputStyle} />
          </Field>
          <Field label="Cliente">
            <input name="client" defaultValue={project.client ?? ""} style={inputStyle} />
          </Field>
          <Field label="Año">
            <input name="year" type="number" defaultValue={project.year ?? ""} style={inputStyle} />
          </Field>
          <Field label="Orden">
            <input name="sort_order" type="number" defaultValue={project.sort_order} style={inputStyle} />
          </Field>
        </div>

        <Field label="Descripción corta">
          <textarea name="description" rows={2} defaultValue={project.description ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <div style={{ marginBottom: "1.5rem" }} />
        <Field label="Texto completo">
          <textarea name="body" rows={6} defaultValue={project.body ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <input type="checkbox" name="featured" defaultChecked={project.featured ?? false} style={{ accentColor: "#c4f1d5" }} />
            <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b938c" }}>
              Destacar en la página principal
            </span>
          </label>
        </div>

        {/* Images */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c4f1d5", marginBottom: "1rem" }}>
            Imágenes
          </p>
          <ImageUploader
            initialData={{ slug: project.slug, cover_url: project.cover_url, gallery: Array.isArray(project.gallery) ? project.gallery as string[] : [] }}
            projectSlug={project.slug}
          />
        </div>

        {error && <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#f87171", marginBottom: "1rem" }}>{error}</p>}

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" disabled={saving} style={{
            padding: "0.875rem 2rem",
            backgroundColor: saving ? "#1e3d2a" : "#c4f1d5",
            color: "#0c3825", fontFamily: fontB, fontSize: "14px", fontWeight: 600,
            border: "none", cursor: saving ? "not-allowed" : "pointer",
          }}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <a href="/admin/proyectos" style={{
            padding: "0.875rem 2rem",
            backgroundColor: "transparent", border: "1px solid rgba(195,224,197,0.15)",
            color: "#8b938c", fontFamily: fontB, fontSize: "14px",
            textDecoration: "none", display: "inline-flex", alignItems: "center",
          }}>
            Cancelar
          </a>
        </div>
      </form>

      {/* Delete modal */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(44,62,71,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "#131819", border: "1px solid rgba(248,113,113,0.3)", padding: "2rem", maxWidth: "360px", width: "100%" }}>
            <p style={{ fontFamily: fontD, fontSize: "1.2rem", color: "#dfe3e6", marginBottom: "1rem" }}>¿Borrar proyecto?</p>
            <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b938c", marginBottom: "2rem" }}>
              Se eliminará <strong style={{ color: "#dfe3e6" }}>{project.title}</strong> permanentemente.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "transparent", border: "1px solid rgba(195,224,197,0.15)", color: "#8b938c", fontFamily: fontB, fontSize: "14px", cursor: "pointer" }}>
                Cancelar
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#7f1d1d", border: "none", color: "#fca5a5", fontFamily: fontB, fontSize: "14px", cursor: "pointer" }}>
                {deleting ? "Borrando..." : "Sí, borrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "0.25rem" }}>
      <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b938c", display: "block", marginBottom: "0.4rem" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem", boxSizing: "border-box",
  backgroundColor: "#1b2022", border: "1px solid rgba(195,224,197,0.1)",
  color: "#dfe3e6", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem",
  outline: "none",
};
