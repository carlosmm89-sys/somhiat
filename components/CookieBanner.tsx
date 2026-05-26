"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
      backgroundColor: "rgba(42, 60, 69, 0.97)",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(195,224,197,0.12)",
      padding: "1.25rem 2rem",
      animation: "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1.5rem", flexWrap: "wrap",
      }}>
        <p style={{
          fontFamily: "var(--font-inter),'Inter',sans-serif",
          fontSize: "0.85rem", color: "#b8c8d0", lineHeight: 1.5,
          flex: 1, minWidth: "280px",
        }}>
          Usamos cookies técnicas para el funcionamiento del sitio.{" "}
          <Link href="/politica-de-cookies" style={{ color: "#C3E0C5", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Más información
          </Link>
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          <button onClick={reject} style={{
            padding: "0.6rem 1.25rem",
            backgroundColor: "transparent",
            border: "1px solid rgba(195,224,197,0.25)",
            color: "#8fb0a8",
            fontFamily: "var(--font-inter),'Inter',sans-serif",
            fontSize: "0.8rem", cursor: "pointer",
            transition: "all 0.2s",
          }}>
            Rechazar
          </button>
          <button onClick={accept} style={{
            padding: "0.6rem 1.25rem",
            backgroundColor: "#C3E0C5",
            border: "1px solid #C3E0C5",
            color: "#1a3d24",
            fontFamily: "var(--font-inter),'Inter',sans-serif",
            fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
            transition: "all 0.2s",
          }}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
