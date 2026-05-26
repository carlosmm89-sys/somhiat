"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS } from "@/lib/i18n";

const navLinks = (tr: ReturnType<typeof useLanguage>["tr"]) => [
  { href: "/",          label: tr.nav.home },
  { href: "/proyectos", label: tr.nav.projects },
  { href: "/nosotros",  label: tr.nav.about },
  { href: "/contacto",  label: tr.nav.contact },
];

export default function Navbar() {
  const { tr, lang, setLang } = useLanguage();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navLinks(tr);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      backgroundColor: scrolled ? "rgba(53,72,83,0.95)" : "rgba(53,72,83,0.6)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid rgba(195,224,197,0.08)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo-somhi.png" alt="SOMHi" width={130} height={42} style={{ height: "34px", width: "auto" }} priority />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} aria-label="Navegación principal">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link" style={{
              fontFamily: "var(--font-inter),'Inter',sans-serif",
              fontSize: "14px", letterSpacing: "0.03em",
              color: "#b8c8d0", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C3E0C5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#b8c8d0"; }}
            >{l.label}</Link>
          ))}
        </nav>

        {/* Right: lang switcher + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {/* Language switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {LANGS.map(({ code, label }, i) => (
              <span key={code} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && (
                  <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "10px", color: "rgba(195,224,197,0.15)", margin: "0 0.15rem" }}>|</span>
                )}
                <button
                  onClick={() => setLang(code)}
                  style={{
                    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                    fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
                    color: lang === code ? "#C3E0C5" : "#8fb0a8",
                    background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0.15rem",
                    fontWeight: lang === code ? 600 : 400,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { if (lang !== code) (e.currentTarget as HTMLButtonElement).style.color = "#C3E0C5"; }}
                  onMouseLeave={(e) => { if (lang !== code) (e.currentTarget as HTMLButtonElement).style.color = "#8fb0a8"; }}
                  aria-label={`Switch language to ${label}`}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link href="/contacto" style={{
            fontFamily: "var(--font-inter),'Inter',sans-serif",
            fontSize: "13px", letterSpacing: "0.03em",
            color: "#1a3d24", backgroundColor: "#C3E0C5",
            padding: "0.65rem 1.4rem", textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            {tr.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
