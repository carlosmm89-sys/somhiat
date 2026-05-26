"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPageContent() {
  const { tr } = useLanguage();
  const cp = tr.contactPage;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(195,224,197,0.15)", color: "#e8ecef",
    fontSize: "1rem", padding: "0.6rem 0", outline: "none",
    fontFamily: "var(--font-inter),'Inter',sans-serif",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", marginBottom: "0.6rem",
    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
    fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#b0c5b8",
  };

  return (
    <div style={{ backgroundColor: "#354853", minHeight: "100vh", paddingTop: "80px" }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <h1 style={{
            fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif",
            fontSize: "clamp(3rem,7vw,5rem)", fontWeight: 300, color: "#e8ecef",
            lineHeight: 1, letterSpacing: "-0.02em",
          }}>
            {cp.headline1}<br />
            <span style={{ color: "#C3E0C5", fontStyle: "italic" }}>{cp.headline2}</span>
          </h1>
          <div style={{ width: "80px", height: "1px", backgroundColor: "rgba(195,224,197,0.2)", marginTop: "2rem" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "4rem", alignItems: "start" }}>
          {/* Left: Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Direct contact */}
            <div>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
                {cp.directLabel}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <a href="tel:+34647045359" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", textDecoration: "none" }}>
                  <span style={{ color: "#C3E0C5", fontSize: "1.1rem" }}>☏</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1.1rem", color: "#e8ecef" }}>+34 647 04 53 59</p>
                    <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.8rem", color: "#8b9a90", marginTop: "0.2rem" }}>{cp.phoneHours}</p>
                  </div>
                </a>
                <a href="mailto:bvilla@somhiat.com" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", textDecoration: "none" }}>
                  <span style={{ color: "#C3E0C5", fontSize: "1.1rem" }}>@</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-hanken),'Hanken Grotesk',sans-serif", fontSize: "1.1rem", color: "#e8ecef" }}>bvilla@somhiat.com</p>
                    <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.8rem", color: "#8b9a90", marginTop: "0.2rem" }}>{cp.emailHours}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio */}
            <div style={{ borderTop: "1px solid rgba(195,224,197,0.08)", paddingTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1rem" }}>
                {cp.studioLabel}
              </p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <span style={{ color: "#C3E0C5", fontSize: "1.1rem" }}>◎</span>
                <div>
                  <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "1rem", color: "#e8ecef" }}>{cp.studioInfo}</p>
                  <p style={{ fontFamily: "var(--font-inter),'Inter',sans-serif", fontSize: "0.8rem", color: "#8b9a90", marginTop: "0.2rem" }}>{cp.studioNote}</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div style={{ position: "relative", border: "1px solid rgba(195,224,197,0.08)", padding: "4px" }}>
              <Image
                src="/provenza-2.jpg"
                alt="SOMHi Arquitectura — proyecto en Barcelona"
                width={500} height={380}
                style={{ width: "100%", height: "auto", objectFit: "cover", filter: "grayscale(30%)", display: "block" }}
              />
              <div style={{ position: "absolute", bottom: "12px", left: "16px", right: "16px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(195,224,197,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Est. 2020</span>
                <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(195,224,197,0.4)" }}>BCN</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.08)", padding: "3rem", position: "relative", overflow: "hidden" }}>
            <div className="blueprint-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
            <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <label style={labelStyle}>{cp.fieldName}</label>
                  <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{cp.fieldEmail}</label>
                  <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>{cp.fieldSubject}</label>
                <input type="text" id="contact-subject" name="subject" value={form.subject} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{cp.fieldMessage}</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <div style={{ paddingTop: "0.5rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === "loading"}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.875rem 2rem",
                    backgroundColor: "#C3E0C5", color: "#1a3d24",
                    fontFamily: "var(--font-inter),'Inter',sans-serif",
                    fontSize: "14px", cursor: "pointer", border: "none",
                    opacity: status === "loading" ? 0.6 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {status === "loading" ? cp.sending : cp.send}
                </button>
              </div>
              {status === "success" && (
                <div style={{ border: "1px solid rgba(195,224,197,0.2)", backgroundColor: "rgba(195,224,197,0.05)", padding: "1rem 1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C3E0C5" }}>
                    {cp.success}
                  </p>
                </div>
              )}
              {status === "error" && (
                <div style={{ border: "1px solid rgba(255,100,100,0.2)", backgroundColor: "rgba(255,100,100,0.05)", padding: "1rem 1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffb4ab" }}>
                    {cp.error}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
