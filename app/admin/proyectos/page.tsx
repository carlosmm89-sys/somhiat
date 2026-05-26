"use client";

import { useState } from "react";
import Link from "next/link";
import { STATIC_PROJECTS } from "@/lib/static-data";
import { CATEGORY_LABELS } from "@/types";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

const CATS = [
  { value: "all",              label: "Todos" },
  { value: "obra_nueva",       label: "Obra Nueva" },
  { value: "rehabilitacion",   label: "Rehabilitación" },
  { value: "viviendas",        label: "Viviendas" },
];

export default function AdminProyectosPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const projects = STATIC_PROJECTS
    .filter((p) => cat === "all" || p.category === cat)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.location?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
            Gestión
          </p>
          <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
            Proyectos
          </h1>
        </div>
        <Link href="/admin/proyectos/nuevo" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          backgroundColor: "#C3E0C5", color: "#1a3d24",
          fontFamily: fontB, fontSize: "14px", fontWeight: 600,
          padding: "0.75rem 1.5rem", textDecoration: "none",
        }}>
          + Nuevo proyecto
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {CATS.map(({ value, label }) => (
          <button key={value} onClick={() => setCat(value)} style={{
            fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em",
            textTransform: "uppercase", padding: "0.5rem 1rem",
            backgroundColor: cat === value ? "rgba(195,224,197,0.1)" : "transparent",
            border: cat === value ? "1px solid rgba(195,224,197,0.4)" : "1px solid rgba(195,224,197,0.1)",
            color: cat === value ? "#C3E0C5" : "#8b9a90",
            cursor: "pointer",
          }}>
            {label}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{
            marginLeft: "auto", padding: "0.5rem 1rem",
            backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.1)",
            color: "#e8ecef", fontFamily: fontB, fontSize: "0.875rem",
            outline: "none", minWidth: "200px",
          }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.07)" }}>
        {/* Head */}
        <div style={{
          display: "grid", gridTemplateColumns: "3fr 1fr 80px 100px 120px",
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid rgba(195,224,197,0.07)",
        }}>
          {["Proyecto", "Categoría", "Año", "Estado", "Acciones"].map((h) => (
            <span key={h} style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8fb0a8" }}>{h}</span>
          ))}
        </div>

        {projects.length === 0 && (
          <p style={{ padding: "3rem", textAlign: "center", fontFamily: font, fontSize: "0.6rem", color: "#8fb0a8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            No hay proyectos
          </p>
        )}

        {projects.map((p) => (
          <div key={p.id} style={{
            display: "grid", gridTemplateColumns: "3fr 1fr 80px 100px 120px",
            padding: "1rem 1.5rem", alignItems: "center",
            borderBottom: "1px solid rgba(195,224,197,0.04)",
          }}>
            {/* Title + thumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              {p.cover_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_url} alt="" style={{ width: "52px", height: "38px", objectFit: "cover", flexShrink: 0 }} />
              )}
              <div>
                <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#e8ecef" }}>{p.title}</p>
                <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.08em", color: "#8fb0a8" }}>{p.location}</p>
              </div>
            </div>

            {/* Category */}
            <span style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8b9a90" }}>
              {CATEGORY_LABELS[p.category]}
            </span>

            {/* Year */}
            <span style={{ fontFamily: font, fontSize: "0.6rem", color: "#8b9a90" }}>
              {p.year ?? "—"}
            </span>

            {/* Status */}
            <span style={{
              fontFamily: font, fontSize: "0.48rem", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: p.status === "completed" ? "#C3E0C5" : "#fcd34d",
            }}>
              {p.status === "completed" ? "Completado" : "En ejecución"}
            </span>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Link href={`/admin/proyectos/${p.slug}`} style={{
                fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#C3E0C5", textDecoration: "none",
              }}>
                Editar
              </Link>
              <button
                onClick={() => setConfirmDelete(p.slug)}
                style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#f87171", background: "none", border: "none", cursor: "pointer" }}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}

        {/* Footer count */}
        <div style={{ padding: "0.875rem 1.5rem", borderTop: "1px solid rgba(195,224,197,0.07)" }}>
          <span style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
            {projects.length} proyecto{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(44,62,71,0.9)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
        }}>
          <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(248,113,113,0.3)", padding: "2rem", maxWidth: "360px", width: "100%" }}>
            <p style={{ fontFamily: fontD, fontSize: "1.2rem", color: "#e8ecef", marginBottom: "1rem" }}>
              ¿Borrar proyecto?
            </p>
            <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90", marginBottom: "2rem" }}>
              Esta acción no se puede deshacer. El proyecto <strong style={{ color: "#e8ecef" }}>{confirmDelete}</strong> se eliminará permanentemente.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setConfirmDelete(null)} style={{
                flex: 1, padding: "0.75rem", backgroundColor: "transparent",
                border: "1px solid rgba(195,224,197,0.15)", color: "#8b9a90",
                fontFamily: fontB, fontSize: "14px", cursor: "pointer",
              }}>
                Cancelar
              </button>
              <button onClick={() => {
                // TODO: llamar deleteProject(confirmDelete) cuando esté en Supabase
                alert("Función disponible cuando los proyectos estén en Supabase");
                setConfirmDelete(null);
              }} style={{
                flex: 1, padding: "0.75rem", backgroundColor: "#7f1d1d",
                border: "none", color: "#fca5a5",
                fontFamily: fontB, fontSize: "14px", cursor: "pointer",
              }}>
                Sí, borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
