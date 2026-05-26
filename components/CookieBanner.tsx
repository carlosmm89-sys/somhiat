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
      position: "fixed", bottom: "1.5rem", left: "1.5rem", zIndex: 9999,
      backgroundColor: "rgba(42, 60, 69, 0.97)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(195,224,197,0.12)",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      maxWidth: "380px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      animation: "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    }}>
      <p style={{
        fontFamily: "var(--font-inter),'Inter',sans-serif",
        fontSize: "0.8rem", color: "#b8c8d0", lineHeight: 1.6,
        marginBottom: "1rem",
      }}>
        🍪 Usamos cookies técnicas para el funcionamiento del sitio.{" "}
        <Link href="/politica-de-cookies" style={{ color: "#C3E0C5", textDecoration: "underline", textUnderlineOffset: "2px" }}>
          Más información
        </Link>
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button onClick={reject} style={{
          flex: 1, padding: "0.55rem 1rem",
          backgroundColor: "transparent",
          border: "1px solid rgba(195,224,197,0.25)",
          borderRadius: "6px",
          color: "#8fb0a8",
          fontFamily: "var(--font-inter),'Inter',sans-serif",
          fontSize: "0.75rem", cursor: "pointer",
          transition: "all 0.2s",
        }}>
          Rechazar
        </button>
        <button onClick={accept} style={{
          flex: 1, padding: "0.55rem 1rem",
          backgroundColor: "#C3E0C5",
          border: "1px solid #C3E0C5",
          borderRadius: "6px",
          color: "#1a3d24",
          fontFamily: "var(--font-inter),'Inter',sans-serif",
          fontSize: "0.75rem", fontWeight: 500, cursor: "pointer",
          transition: "all 0.2s",
        }}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
