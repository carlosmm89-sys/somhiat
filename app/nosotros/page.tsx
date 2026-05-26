"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NosotrosPage() {
  const { tr } = useLanguage();
  const ab = tr.aboutPage;

  return (
    <div style={{ backgroundColor: "#354853", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Section 1: Mission */}
      <section style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(195,224,197,0.08)" }}>
        <div className="container">
          <div className="grid-2col" style={{ gap: "5rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
                {ab.eyebrow}
              </p>
              <h1 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#e8ecef", lineHeight: 1.05, marginBottom: "2rem" }}>
                {ab.headline1}<br />
                <span style={{ color: "#C3E0C5", fontStyle: "italic" }}>{ab.headline2}</span>
              </h1>
              <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#8b9a90", maxWidth: "520px" }}>
                {ab.mission}
              </p>
            </div>

            {/* Photo */}
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", border: "1px solid rgba(195,224,197,0.1)" }}>
              <Image
                src="/benito-villa.jpg"
                alt="Benito Villa — SOMHi Arquitectura Técnica"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", filter: "grayscale(20%)", objectPosition: "top" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(53,72,83,0.4), transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Benito Villa */}
      <section style={{ padding: "5rem 0", backgroundColor: "#30424c", borderBottom: "1px solid rgba(195,224,197,0.08)" }}>
        <div className="container">
          <div className="grid-2col" style={{ gap: "5rem", alignItems: "center" }}>
            {/* Photo */}
            <div style={{ position: "relative", border: "1px solid rgba(195,224,197,0.1)", padding: "4px", overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                <Image
                  src="/benito-villa.jpg"
                  alt={`${ab.bioTitle} — ${ab.bioRole}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", filter: "grayscale(20%)", objectPosition: "top" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", backgroundColor: "rgba(53,72,83,0.75)", backdropFilter: "blur(4px)" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5" }}>
                    {ab.bioRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
                {ab.bioLabel}
              </p>
              <h2 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#e8ecef", lineHeight: 1.1, marginBottom: "2rem" }}>
                {ab.bioTitle}
              </h2>
              <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#8b9a90", marginBottom: "1.5rem" }}>
                {ab.bio1}
              </p>
              <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#8b9a90", marginBottom: "2rem" }}>
                {ab.bio2}
              </p>
              <div style={{ borderTop: "1px solid rgba(195,224,197,0.08)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {tr.about.skills.map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "4px", height: "4px", backgroundColor: "#C3E0C5", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#b8c8d0" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Values */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1rem" }}>
              {ab.valuesLabel}
            </p>
          </div>
          <div className="grid-3col" style={{ gap: "1.5rem" }}>
            {ab.values.map((val) => (
              <div key={val.title} style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.08)", padding: "2.5rem", transition: "border-color 0.3s" }}>
                <div style={{ width: "48px", height: "48px", border: "1px solid rgba(195,224,197,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <span style={{ color: "#C3E0C5", fontSize: "1.25rem" }}>{val.icon}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1.25rem", fontWeight: 400, color: "#e8ecef", marginBottom: "1rem" }}>
                  {val.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "#8b9a90" }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
