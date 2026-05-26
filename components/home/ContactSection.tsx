"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { tr } = useLanguage();
  const ct = tr.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(195,224,197,0.2)", color: "#e8ecef",
    fontSize: "0.9375rem", padding: "0.5rem 0", outline: "none",
    fontFamily: "var(--font-inter),'Inter',sans-serif",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
    fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
    color: "#b0c5b8", display: "block", marginBottom: "0.6rem",
  };

  return (
    <section style={{ padding: "6rem 0", backgroundColor: "#2a3c45", borderTop: "1px solid rgba(195,224,197,0.08)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif",
              fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.05,
              color: "#e8ecef", marginBottom: "2rem",
            }}>
              {ct.headline1}<br /><span style={{ color: "#C3E0C5", fontStyle: "italic" }}>{ct.headline2}</span>
            </h2>
            <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.9375rem", lineHeight: 1.7, color: "#8b9a90", marginBottom: "3rem", maxWidth: "380px" }}>
              {ct.sub}
            </p>

            <div style={{ borderLeft: "2px solid rgba(195,224,197,0.2)", paddingLeft: "1.5rem" }}>
              {[
                { label: ct.labelAbout, value: "Benito Villa" },
                { label: ct.labelPhone, href: "tel:+34647045359", value: "+34 647 04 53 59" },
                { label: ct.labelEmail, href: "mailto:bvilla@somhiat.com", value: "bvilla@somhiat.com" },
                { label: ct.labelAddress, value: ct.address },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b9a90", display: "block", marginBottom: "0.2rem" }}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1rem", color: "#C3E0C5", textDecoration: "none" }}>{item.value}</a>
                  ) : (
                    <p style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1rem", color: "#e8ecef" }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.08)", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
            <div className="blueprint-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
            <form onSubmit={onSubmit} style={{ position: "relative", zIndex: 1 }}>
              <div style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{ct.fieldName}</label>
                <input type="text" name="name" value={form.name} onChange={onChange} required style={inputStyle} />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <label style={labelStyle}>{ct.fieldEmail}</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required style={inputStyle} />
              </div>
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={labelStyle}>{ct.fieldDetails}</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={4} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button type="submit" disabled={status === "loading"} style={{
                width: "100%", backgroundColor: "rgba(195,224,197,0.08)",
                border: "1px solid rgba(195,224,197,0.25)", color: "#C3E0C5", padding: "0.875rem",
                fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.2s ease",
              }}>
                {status === "loading" ? ct.sending : ct.send}
              </button>
              {status === "success" && <p style={{ marginTop: "1rem", fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C3E0C5", textAlign: "center" }}>{ct.success}</p>}
              {status === "error"   && <p style={{ marginTop: "1rem", fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffb4ab", textAlign: "center" }}>{ct.error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
