"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("bvilla@somhiat.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const font = "'JetBrains Mono', monospace";
  const fontBody = "'Inter', sans-serif";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Introduce tu email primero.");
      return;
    }
    setError("");
    setInfo("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (error) {
      setError("Error al enviar el email de recuperación.");
    } else {
      setInfo("Se ha enviado un email de recuperación. Revisa tu bandeja.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#2c3e47",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: font, fontSize: "1.4rem", fontWeight: 700, color: "#C3E0C5", letterSpacing: "0.08em" }}>
            SOMHi
          </p>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8fb0a8", marginTop: "0.5rem" }}>
            Panel de administración
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{
          backgroundColor: "#30424c",
          border: "1px solid rgba(195,224,197,0.1)",
          padding: "2.5rem",
        }}>
          <h1 style={{ fontFamily: font, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "2rem" }}>
            Acceso
          </h1>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", display: "block", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "0.75rem", boxSizing: "border-box",
                backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
                color: "#e8ecef", fontFamily: fontBody, fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", display: "block", marginBottom: "0.5rem" }}>
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "0.75rem", paddingRight: "3rem", boxSizing: "border-box",
                  backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
                  color: "#e8ecef", fontFamily: fontBody, fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: showPassword ? "#C3E0C5" : "#6b8a80",
                  fontSize: "1.1rem", lineHeight: 1, padding: "0.25rem",
                  transition: "color 0.2s",
                }}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ marginBottom: "2rem", textAlign: "right" }}>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.08em",
                color: "#8fb0a8",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#C3E0C5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#8fb0a8"; }}
            >
              ¿Olvidé mi contraseña?
            </button>
          </div>

          {error && (
            <p style={{ fontFamily: fontBody, fontSize: "0.8rem", color: "#f87171", marginBottom: "1.5rem" }}>
              {error}
            </p>
          )}

          {info && (
            <p style={{ fontFamily: fontBody, fontSize: "0.8rem", color: "#C3E0C5", marginBottom: "1.5rem" }}>
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "0.875rem",
              backgroundColor: loading ? "#2d5538" : "#C3E0C5",
              color: "#1a3d24",
              fontFamily: fontBody, fontSize: "14px", fontWeight: 600,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Accediendo..." : "Entrar"}
          </button>
        </form>

        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2c3e47", textAlign: "center", marginTop: "2rem" }}>
          SOMHi Arquitectura Técnica · Área privada
        </p>
      </div>
    </div>
  );
}
