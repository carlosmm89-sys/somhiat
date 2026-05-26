"use client";


import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/types";
import { CATEGORY_LABELS } from "@/types";

interface Props { projects: Project[] }

export default function ProjectsBento({ projects }: Props) {
  const { tr } = useLanguage();
  const pr = tr.projects;

  return (
    <section style={{ padding: "6rem 0", backgroundColor: "#30424c" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "0.75rem" }}>
              {pr.eyebrow}
            </p>
            <h2 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#e8ecef", lineHeight: 1.1 }}>
              {pr.title}
            </h2>
          </div>
          <Link href="/proyectos" style={{
            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
            fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#C3E0C5", textDecoration: "none",
            borderBottom: "1px solid rgba(195,224,197,0.3)", paddingBottom: "0.2rem",
          }}>
            {pr.viewAll}
          </Link>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div style={{ padding: "4rem", textAlign: "center", border: "1px dashed rgba(195,224,197,0.12)" }}>
            <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#8fa8a0" }}>
              {pr.comingSoon}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {projects.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/proyectos/${p.slug}`} className="group" style={{ textDecoration: "none" }}>
                <article style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#3a4f5a", cursor: "pointer" }}>
                  {p.cover_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_url} alt={p.title}
                      className="project-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#3a4f5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", color: "#8fa8a0" }}>—</span>
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,17,0.9) 0%, rgba(10,15,17,0.2) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                    <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", display: "block", marginBottom: "0.4rem" }}>
                      {CATEGORY_LABELS[p.category]} {p.location && `— ${p.location}`}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1.25rem", fontWeight: 300, color: "#e8ecef" }}>
                      {p.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
