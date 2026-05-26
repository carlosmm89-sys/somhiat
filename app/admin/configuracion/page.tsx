"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";

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
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  // Load from Supabase on mount
  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("site_config").select("key, value");
      if (data && data.length > 0) {
        const loaded = { ...DEFAULT_CONFIG };
        data.forEach((row: { key: string; value: string }) => {
          if (row.key === "faviconUrl") { setFaviconUrl(row.value); return; }
          if (row.key === "logoUrl") { setLogoUrl(row.value); return; }
          if (row.key in loaded) {
            (loaded as Record<string, string>)[row.key] = row.value;
          }
        });
        setConfig(loaded);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function uploadImage(file: File, type: "favicon" | "logo") {
    setUploading(type);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "png";
    const path = `${type}.${ext}`;

    // Upload to Storage (overwrite)
    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(path, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      alert("Error al subir: " + uploadError.message);
      setUploading(null);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("site-assets")
      .getPublicUrl(path);

    const url = publicUrl + "?v=" + Date.now();

    // Save URL in site_config
    await supabase.from("site_config").upsert(
      { key: type === "favicon" ? "faviconUrl" : "logoUrl", value: url, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

    if (type === "favicon") setFaviconUrl(url);
    else setLogoUrl(url);
    setUploading(null);
  }

  function update(key: keyof SiteConfig, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const supabase = createClient();

    // Upsert each key/value pair
    const entries = Object.entries(config).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("site_config")
      .upsert(entries, { onConflict: "key" });

    if (error) {
      console.error("Error saving config:", error);
      alert("Error al guardar: " + error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: font, fontSize: "0.6rem", color: "#4a5254", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Cargando configuración...
        </p>
      </div>
    );
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
        <button onClick={save} disabled={saving} style={{
          padding: "0.6rem 1.5rem",
          backgroundColor: saved ? "#2d5538" : saving ? "#4a5254" : "#C3E0C5",
          border: "none",
          color: saved ? "#C3E0C5" : saving ? "#8b9a90" : "#1a3d24",
          fontFamily: fontB, fontSize: "13px", fontWeight: 500,
          cursor: saving ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}>
          {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar cambios"}
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

      {/* Imágenes */}
      <Section title="Imágenes">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Favicon */}
          <div>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8b9a90", marginBottom: "0.75rem" }}>
              Favicon
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              {faviconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={faviconUrl} alt="Favicon" style={{ width: "48px", height: "48px", borderRadius: "6px", border: "1px solid rgba(195,224,197,0.1)", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "48px", height: "48px", borderRadius: "6px", backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b8078", fontSize: "1.2rem" }}>◈</div>
              )}
              <div>
                <label style={{ display: "inline-block", padding: "0.4rem 0.75rem", backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.15)", color: "#C3E0C5", fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                  {uploading === "favicon" ? "Subiendo..." : "Subir favicon"}
                  <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/x-icon" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "favicon"); }} disabled={uploading === "favicon"} />
                </label>
                <p style={{ fontFamily: font, fontSize: "0.4rem", color: "#5e7a72", marginTop: "0.35rem" }}>PNG, JPG o ICO · 512×512px recomendado</p>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8b9a90", marginBottom: "0.75rem" }}>
              Logo
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" style={{ height: "36px", maxWidth: "120px", objectFit: "contain", border: "1px solid rgba(195,224,197,0.1)", borderRadius: "4px", padding: "4px" }} />
              ) : (
                <div style={{ width: "80px", height: "36px", borderRadius: "4px", backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b8078", fontSize: "0.6rem", fontFamily: font }}>LOGO</div>
              )}
              <div>
                <label style={{ display: "inline-block", padding: "0.4rem 0.75rem", backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.15)", color: "#C3E0C5", fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                  {uploading === "logo" ? "Subiendo..." : "Subir logo"}
                  <input type="file" accept="image/png,image/jpeg,image/svg+xml" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "logo"); }} disabled={uploading === "logo"} />
                </label>
                <p style={{ fontFamily: font, fontSize: "0.4rem", color: "#5e7a72", marginTop: "0.35rem" }}>PNG o SVG · Fondo transparente recomendado</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Section title="Footer">
        <Row label="Crédito desarrollo" value={config.footerCredit} onChange={(v) => update("footerCredit", v)} />
      </Section>

      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.05)" }}>
        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
          ◈ Los cambios se guardan en Supabase y persisten entre sesiones
        </p>
      </div>
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
