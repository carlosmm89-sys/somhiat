"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { tr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  // Parallax on scroll
  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const parallaxShift = scrollY * 0.35;
  const overlayOpacity = Math.min(0.25, scrollY * 0.0004);

  return (
    <section
      ref={sectionRef}
      className="hero-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
        backgroundPositionY: `calc(25% + ${parallaxShift}px)`,
      }}
    >
      {/* Scroll-based darkening overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: `rgba(53,72,83,${overlayOpacity})`,
        pointerEvents: "none", transition: "background-color 0.1s",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
        background: "linear-gradient(to bottom, transparent, #354853)",
        pointerEvents: "none",
      }} />

      {/* Animated grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: visible ? 0.04 : 0,
        transition: "opacity 2s ease",
        backgroundImage:
          "linear-gradient(rgba(195,224,197,0.4) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(195,224,197,0.4) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="container" style={{ width: "100%", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "720px" }}>

          {/* Eyebrow — delay 0.2s */}
          <p style={{
            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
            fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#C3E0C5", marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            {tr.hero.eyebrow}
          </p>

          {/* Headline — delay 0.4s, with word-by-word reveal */}
          <h1 style={{
            fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif",
            fontSize: "clamp(2.8rem,6.5vw,5.5rem)", fontWeight: 300,
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "#C3E0C5", marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}>
            {tr.hero.headline1}
            <br />
            <span style={{ color: "#e8ecef" }}>{tr.hero.headline2}</span>
          </h1>

          {/* Subtitle — delay 0.7s */}
          <p style={{
            fontFamily: "var(--font-inter),'Inter',sans-serif",
            fontSize: "1.0625rem", lineHeight: 1.6, color: "#b8c8d0",
            marginBottom: "2.5rem", maxWidth: "480px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s",
          }}>
            {tr.hero.sub}
          </p>

          {/* CTAs — delay 1s */}
          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 1s, transform 0.7s ease 1s",
          }}>
            <Link href="/contacto" className="hero-cta-primary" style={{
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#1a3d24", backgroundColor: "#C3E0C5",
              padding: "0.85rem 1.75rem", textDecoration: "none", display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              {tr.hero.cta1}
            </Link>
            <Link href="/proyectos" className="hero-cta-outline" style={{
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#C3E0C5", border: "1px solid rgba(195,224,197,0.35)",
              padding: "0.85rem 1.75rem", textDecoration: "none", display: "inline-block",
              transition: "transform 0.2s, border-color 0.2s, background-color 0.2s",
            }}>
              {tr.hero.cta2}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — pulsing */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease 1.5s",
      }}>
        <div style={{
          width: "1px", height: "40px",
          background: "linear-gradient(to bottom, rgba(195,224,197,0.6), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
          fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase",
          color: "rgba(195,224,197,0.4)",
        }}>{tr.hero.scroll}</span>
      </div>
    </section>
  );
}
