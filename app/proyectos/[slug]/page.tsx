import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getAllProjectSlugs,
} from "@/lib/queries";
import { CATEGORY_LABELS } from "@/types";
import ProjectGallery from "@/components/projects/ProjectGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.title,
    description: project.description ?? `Proyecto ${project.title} por SOMHi Arquitectura Técnica`,
    openGraph: {
      images: project.cover_url ? [{ url: project.cover_url }] : [],
    },
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug, project.sort_order);
  const gallery: string[] = Array.isArray(project.gallery) ? project.gallery : [];
  // Excluir portada si ya está en la galería para no duplicar
  const galleryImages = gallery.length > 0 ? gallery : [];

  const font = "var(--font-jetbrains),'JetBrains Mono',monospace";
  const fontDisplay = "var(--font-hanken),'Hanken Grotesk',sans-serif";
  const fontBody = "var(--font-inter),'Inter',sans-serif";

  return (
    <div style={{ backgroundColor: "#354853", minHeight: "100vh" }}>

      {/* ── Hero full-width ── */}
      {project.cover_url && (
        <div className="hero-cover" style={{ position: "relative", height: "80vh", width: "100%", overflow: "hidden" }}>
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_url}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(53,72,83,0.3) 0%, transparent 40%, rgba(53,72,83,0.85) 100%)" }} />

          {/* Breadcrumb overlay */}
          <div style={{ position: "absolute", bottom: "3rem", left: 0, right: 0 }}>
            <div className="container">
              <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c4f1d5", marginBottom: "0.75rem" }}>
                {CATEGORY_LABELS[project.category]}
                {project.location && ` — ${project.location}`}
              </p>
              <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 300, color: "#dfe3e6", lineHeight: 1.05 }}>
                {project.title}
              </h1>
              {project.year && (
                <p style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", color: "#8b938c", marginTop: "0.5rem" }}>
                  {project.year}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="grid-2col-content" style={{ gap: "4rem", alignItems: "start", marginBottom: "4rem" }}>

          {/* Description */}
          <div>
            {project.description && (
              <p style={{ fontFamily: fontBody, fontSize: "1.0625rem", lineHeight: 1.8, color: "#bec8cc", marginBottom: "2rem" }}>
                {project.description}
              </p>
            )}
            {project.body && (
              <div style={{ borderTop: "1px solid rgba(195,224,197,0.08)", paddingTop: "2rem" }}>
                {project.body.split("\n").map((para, i) =>
                  para.trim() ? (
                    <p key={i} style={{ fontFamily: fontBody, fontSize: "1rem", lineHeight: 1.8, color: "#8b938c", marginBottom: "1rem" }}>
                      {para}
                    </p>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Sidebar: Ficha técnica */}
          <div className="ficha-tecnica" style={{ backgroundColor: "#2a3c45", border: "1px solid rgba(195,224,197,0.08)", padding: "2rem", position: "sticky", top: "88px" }}>
            <h2 style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c4f1d5", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(195,224,197,0.08)" }}>
              Ficha Técnica
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Cliente",    value: project.client },
                { label: "Tipo",       value: CATEGORY_LABELS[project.category] },
                { label: "Estado",     value: project.status === "completed" ? "Completado" : "En ejecución" },
                { label: "Año",        value: project.year?.toString() },
                { label: "Superficie", value: project.area },
                { label: "Ubicación",  value: project.location },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(195,224,197,0.05)", paddingBottom: "0.75rem" }}>
                    <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b938c", flexShrink: 0 }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#dfe3e6", textAlign: "right", marginLeft: "1rem" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
            </div>
            <Link href="/contacto" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "100%", marginTop: "2rem", padding: "0.875rem",
              backgroundColor: "#c4f1d5", color: "#0c3825",
              fontFamily: fontBody, fontSize: "14px",
              textDecoration: "none", transition: "opacity 0.2s",
            }}>
              Iniciar Proyecto Similar
            </Link>
          </div>
        </div>

        {/* ── Gallery (masonry + load more) ── */}
        {galleryImages.length > 0 && (
          <ProjectGallery images={galleryImages} title={project.title} />
        )}

        {/* ── Prev / Next ── */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(195,224,197,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
          {prev ? (
            <Link href={`/proyectos/${prev.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: fontDisplay, fontSize: "1.5rem", color: "#c4f1d5" }}>←</span>
              <div>
                <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b938c", marginBottom: "0.25rem" }}>ANTERIOR</p>
                <p style={{ fontFamily: fontDisplay, fontSize: "1.1rem", fontWeight: 300, color: "#dfe3e6" }}>{prev.title}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/proyectos/${next.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", textAlign: "right" }}>
              <div>
                <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b938c", marginBottom: "0.25rem" }}>SIGUIENTE</p>
                <p style={{ fontFamily: fontDisplay, fontSize: "1.1rem", fontWeight: 300, color: "#dfe3e6" }}>{next.title}</p>
              </div>
              <span style={{ fontFamily: fontDisplay, fontSize: "1.5rem", color: "#c4f1d5" }}>→</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
