"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import ImageUploader from "@/components/admin/ImageUploader";
import type { ProjectCategory } from "@/types";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

const CATS: { value: ProjectCategory; label: string }[] = [
  { value: "obra-nueva",      label: "Obra Nueva" },
  { value: "rehabilitacion",  label: "Rehabilitación de Edificios" },
  { value: "viviendas",       label: "Viviendas" },
];

export default function NuevoProyectoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");

  function toSlug(s: string) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      slug:        fd.get("slug") as string,
      title:       fd.get("title") as string,
      category:    fd.get("category") as ProjectCategory,
      description: fd.get("description") as string,
      body:        fd.get("body") as string,
      location:    fd.get("location") as string,
      year:        fd.get("year") ? Number(fd.get("year")) : null,
      client:      fd.get("client") as string,
      status:      fd.get("status") as "completed" | "in-progress",
      cover_url:   fd.get("cover_url") as string || null,
      gallery:     JSON.parse((fd.get("gallery") as string) || "[]"),
      featured:    fd.get("featured") === "on",
      sort_order:  Number(fd.get("sort_order") || 99),
    };

    const supabase = createClient();
    const { error: insertError } = await supabase.from("projects").insert(data);

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
    } else {
      router.push("/admin/proyectos");
      router.refresh();
    }
  }

  return (
    <div style={{ maxWidth: "860px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
          Proyectos
        </p>
        <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
          Nuevo proyecto
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <Field label="Título *">
            <input name="title" required onChange={(e) => setSlug(toSlug(e.target.value))}
              style={inputStyle} />
          </Field>
          <Field label="Slug (URL) *">
            <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)}
              style={inputStyle} />
          </Field>
          <Field label="Categoría *">
            <select name="category" required style={inputStyle}>
              {CATS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </Field>
          <Field label="Estado">
            <select name="status" style={inputStyle}>
              <option value="completed">Completado</option>
              <option value="in-progress">En ejecución</option>
            </select>
          </Field>
          <Field label="Ubicación">
            <input name="location" style={inputStyle} />
          </Field>
          <Field label="Cliente">
            <input name="client" style={inputStyle} />
          </Field>
          <Field label="Año">
            <input name="year" type="number" min="2000" max="2030" style={inputStyle} />
          </Field>
          <Field label="Orden">
            <input name="sort_order" type="number" defaultValue="99" style={inputStyle} />
          </Field>
        </div>

        <Field label="Descripción corta">
          <textarea name="description" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <div style={{ marginBottom: "1.5rem" }} />
        <Field label="Texto completo (memoria del proyecto)">
          <textarea name="body" rows={6} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <input type="checkbox" name="featured" style={{ accentColor: "#C3E0C5" }} />
            <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>
              Destacar en la página principal
            </span>
          </label>
        </div>

        {/* Image uploader */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1rem" }}>
            Imágenes
          </p>
          <ImageUploader projectSlug={slug || "nuevo"} />
        </div>

        {error && <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#f87171", marginBottom: "1rem" }}>{error}</p>}

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" disabled={saving} style={{
            padding: "0.875rem 2rem",
            backgroundColor: saving ? "#2d5538" : "#C3E0C5",
            color: "#1a3d24", fontFamily: fontB, fontSize: "14px", fontWeight: 600,
            border: "none", cursor: saving ? "not-allowed" : "pointer",
          }}>
            {saving ? "Guardando..." : "Publicar proyecto"}
          </button>
          <a href="/admin/proyectos" style={{
            padding: "0.875rem 2rem",
            backgroundColor: "transparent", border: "1px solid rgba(195,224,197,0.15)",
            color: "#8b9a90", fontFamily: fontB, fontSize: "14px",
            textDecoration: "none", display: "inline-flex", alignItems: "center",
          }}>
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "0.25rem" }}>
      <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", display: "block", marginBottom: "0.4rem" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem", boxSizing: "border-box",
  backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
  color: "#e8ecef", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem",
  outline: "none",
};
