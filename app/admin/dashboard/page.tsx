import Link from "next/link";
import { STATIC_PROJECTS } from "@/lib/static-data";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

export default function AdminDashboard() {
  const total        = STATIC_PROJECTS.length;
  const obraNueva    = STATIC_PROJECTS.filter((p) => p.category === "obra-nueva").length;
  const rehabilitacion = STATIC_PROJECTS.filter((p) => p.category === "rehabilitacion").length;
  const viviendas    = STATIC_PROJECTS.filter((p) => p.category === "viviendas").length;
  const inProgress   = STATIC_PROJECTS.filter((p) => p.status === "in-progress").length;
  const recent       = [...STATIC_PROJECTS].sort((a, b) => b.sort_order - a.sort_order).slice(0, 5);

  const stats = [
    { label: "Total proyectos",      value: total,           color: "#C3E0C5" },
    { label: "Obra nueva",           value: obraNueva,       color: "#93c5fd" },
    { label: "Rehabilitación",       value: rehabilitacion,  color: "#fcd34d" },
    { label: "Viviendas",            value: viviendas,       color: "#a5b4fc" },
    { label: "En ejecución",         value: inProgress,      color: "#fb923c" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
          Panel de administración
        </p>
        <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={{
            backgroundColor: "#30424c",
            border: "1px solid rgba(195,224,197,0.07)",
            padding: "1.5rem",
          }}>
            <p style={{ fontFamily: fontD, fontSize: "2.5rem", fontWeight: 300, color, marginBottom: "0.5rem" }}>
              {value}
            </p>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8fb0a8" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <Link href="/admin/proyectos/nuevo" style={{
          display: "flex", alignItems: "center", gap: "1rem",
          backgroundColor: "#C3E0C5", padding: "1.25rem 1.5rem",
          textDecoration: "none", transition: "opacity 0.2s",
        }}>
          <span style={{ fontSize: "1.5rem" }}>+</span>
          <div>
            <p style={{ fontFamily: fontB, fontSize: "14px", fontWeight: 600, color: "#1a3d24" }}>Nuevo proyecto</p>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d5538" }}>Crear y publicar</p>
          </div>
        </Link>
        <Link href="/admin/proyectos" style={{
          display: "flex", alignItems: "center", gap: "1rem",
          backgroundColor: "#30424c",
          border: "1px solid rgba(195,224,197,0.15)",
          padding: "1.25rem 1.5rem",
          textDecoration: "none",
        }}>
          <span style={{ fontSize: "1.5rem", color: "#C3E0C5" }}>▦</span>
          <div>
            <p style={{ fontFamily: fontB, fontSize: "14px", fontWeight: 600, color: "#e8ecef" }}>Ver todos</p>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>Lista de proyectos</p>
          </div>
        </Link>
      </div>

      {/* Recent projects */}
      <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.07)", padding: "1.5rem" }}>
        <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
          Proyectos recientes
        </p>
        <div>
          {recent.map((p) => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.875rem 0",
              borderBottom: "1px solid rgba(195,224,197,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {p.cover_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover_url} alt={p.title} style={{ width: "48px", height: "36px", objectFit: "cover", backgroundColor: "#3a4f5a" }} />
                )}
                <div>
                  <p style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#e8ecef" }}>{p.title}</p>
                  <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>{p.category}</p>
                </div>
              </div>
              <Link href={`/admin/proyectos/${p.slug}`} style={{
                fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#C3E0C5", textDecoration: "none",
              }}>
                Editar →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
