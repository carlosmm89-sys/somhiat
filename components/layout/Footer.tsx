"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS } from "@/lib/i18n";

export default function Footer() {
  const { tr, lang, setLang } = useLanguage();
  const year = new Date().getFullYear();
  const font = "var(--font-jetbrains),'JetBrains Mono',monospace";
  const fontBody = "var(--font-inter),'Inter',sans-serif";

  const navLinks = [
    { href: "/",          label: tr.nav.home },
    { href: "/proyectos", label: tr.nav.projects },
    { href: "/nosotros",  label: tr.nav.about },
    { href: "/contacto",  label: tr.nav.contact },
  ];

  return (
    <footer style={{ backgroundColor: "#2a3c45", borderTop: "1px solid rgba(195,224,197,0.08)", padding: "4rem 0 2rem" }}>
      <div className="container">
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem", flexWrap: "wrap", gap: "2rem" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
              <Image src="/logo-somhi.png" alt="SOMHi" width={80} height={26} style={{ height: "24px", width: "auto" }} />
            </Link>
            <p style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#adbdb5", maxWidth: "260px", lineHeight: 1.6 }}>
              {tr.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} aria-label="Footer">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#adbdb5", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href="tel:+34647045359" style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#b8c8d0", textDecoration: "none" }}>+34 647 04 53 59</a>
            <a href="mailto:bvilla@somhiat.com" style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#b8c8d0", textDecoration: "none" }}>bvilla@somhiat.com</a>
            <span style={{ fontFamily: fontBody, fontSize: "0.875rem", color: "#adbdb5" }}>Barcelona, España</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(195,224,197,0.12)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8fa8a0" }}>
            © {year} SOMHI Arquitectura Técnica. {tr.footer.rights}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {LANGS.map(({ code, label }, i) => (
              <span key={code} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <span style={{ fontFamily: font, fontSize: "10px", color: "rgba(195,224,197,0.35)", margin: "0 0.15rem" }}>|</span>}
                <button onClick={() => setLang(code)} style={{
                  fontFamily: font, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
                  color: lang === code ? "#C3E0C5" : "#8fa8a0", background: "none", border: "none", cursor: "pointer",
                  fontWeight: lang === code ? 600 : 400,
                }}>
                  {label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
