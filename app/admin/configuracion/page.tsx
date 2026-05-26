"use client";

import { useState } from "react";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

interface SiteConfig {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  address: string;
  socialLinkedin: string;
  socialInstagram: string;
  footerCredit: string;
  metaTitle: string;
  metaDescription: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  siteName: "SOMHi Arquitectura Técnica",
  siteUrl: "https://somhiat.com",
  contactEmail: "bvilla@somhiat.com",
  contactPhone: "+34 600 000 000",
  whatsapp: "+34600000000",
  address: "Barcelona, España",
  socialLinkedin: "",
  socialInstagram: "",
  footerCredit: "Tonwy.com",
  metaTitle: "SOMHi Arquitectura Técnica — Precisión y Alma",
  metaDescription: "SOMHi Arquitectura Técnica. Dirección de obra, gestión de proyectos y control de calidad en Barcelona.",
};

export default function ConfigPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);

  function update(key: keyof SiteConfig, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function save() {
    // TODO: persist to Supabase settings table
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
            Ajustes
          </p>
          <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
            Configuración
          </h1>
        </div>
        <button onClick={save} style={{
          padding: "0.6rem 1.5rem", backgroundColor: saved ? "#2d5538" : "#C3E0C5",
          border: "none", color: saved ? "#C3E0C5" : "#1a3d24",
          fontFamily: fontB, fontSize: "13px", fontWeight: 500, cursor: "pointer",
          transition: "all 0.2s",
        }}>
          {saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </div>

      {/* General */}
      <Section title="General">
        <Row label="Nombre del sitio" value={config.siteName} onChange={(v) => update("siteName", v)} />
        <Row label="URL del sitio" value={config.siteUrl} onChange={(v) => update("siteUrl", v)} />
      </Section>

      {/* Contacto */}
      <Section title="Contacto">
        <Row label="Email de contacto" value={config.contactEmail} onChange={(v) => update("contactEmail", v)} />
        <Row label="Teléfono" value={config.contactPhone} onChange={(v) => update("contactPhone", v)} />
        <Row label="WhatsApp (con prefijo)" value={config.whatsapp} onChange={(v) => update("whatsapp", v)} />
        <Row label="Dirección" value={config.address} onChange={(v) => update("address", v)} />
      </Section>

      {/* Redes sociales */}
      <Section title="Redes Sociales">
        <Row label="LinkedIn URL" value={config.socialLinkedin} onChange={(v) => update("socialLinkedin", v)} placeholder="https://linkedin.com/in/..." />
        <Row label="Instagram URL" value={config.socialInstagram} onChange={(v) => update("socialInstagram", v)} placeholder="https://instagram.com/..." />
      </Section>

      {/* SEO */}
      <Section title="SEO">
        <Row label="Meta título" value={config.metaTitle} onChange={(v) => update("metaTitle", v)} />
        <Row label="Meta descripción" value={config.metaDescription} onChange={(v) => update("metaDescription", v)} multiline />
      </Section>

      {/* Footer */}
      <Section title="Footer">
        <Row label="Crédito desarrollo" value={config.footerCredit} onChange={(v) => update("footerCredit", v)} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.07)", padding: "1.5rem", marginBottom: "1.5rem" }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.25rem" }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.65rem", boxSizing: "border-box",
    backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
    color: "#e8ecef", fontFamily: "'Inter',sans-serif", fontSize: "0.85rem",
    outline: "none", resize: multiline ? "vertical" : "none",
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "1rem", alignItems: "center" }}>
      <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8b9a90" }}>
        {label}
      </label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} placeholder={placeholder} />
      )}
    </div>
  );
}
