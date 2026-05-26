"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function AboutPreview() {
  const { tr } = useLanguage();
  const ab = tr.about;

  return (
    <section style={{ padding: "7rem 0", backgroundColor: "#354853" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* Left: photo */}
          <ScrollReveal direction="left" delay={0.1}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#3a4f5a" }}>
              <Image
                src="/benito-villa.jpg"
                alt={`${ab.name} — ${ab.role}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", filter: "grayscale(30%)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(53,72,83,0.4), transparent)" }} />
            </div>
            {/* Floating label */}
            <div style={{
              position: "absolute", bottom: "2rem", left: "-1.5rem",
              backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.12)",
              padding: "1rem 1.25rem",
            }}>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", marginBottom: "0.3rem" }}>
                {ab.eyebrow1}
              </p>
              <p style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1.1rem", fontWeight: 300, color: "#e8ecef" }}>
                {ab.name}
              </p>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C3E0C5" }}>
                {ab.role}
              </p>
            </div>
          </div>
          </ScrollReveal>

          {/* Right: content */}
          <ScrollReveal direction="right" delay={0.2}>
          <div>
            <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
              {ab.eyebrow2}
            </p>
            <h2 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, lineHeight: 1.1, color: "#e8ecef", marginBottom: "2rem" }}>
              {ab.name}<br /><span style={{ fontStyle: "italic", color: "#C3E0C5" }}>{ab.role}</span>
            </h2>

            <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.9375rem", lineHeight: 1.75, color: "#8b9a90", marginBottom: "1.5rem" }}>
              {ab.bio1}
            </p>
            <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.9375rem", lineHeight: 1.75, color: "#8b9a90", marginBottom: "2.5rem" }}>
              {ab.bio2}
            </p>

            {/* Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {ab.skills.map((skill, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "4px", height: "4px", backgroundColor: "#C3E0C5", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.875rem", color: "#b8c8d0" }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/nosotros" style={{
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#C3E0C5", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              borderBottom: "1px solid rgba(195,224,197,0.3)", paddingBottom: "0.2rem",
            }}>
              {ab.cta}
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
