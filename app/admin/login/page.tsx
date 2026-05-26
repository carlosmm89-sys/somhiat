"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("bvilla@somhiat.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const font = "'JetBrains Mono', monospace";
  const fontBody = "'Inter', sans-serif";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

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

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", display: "block", marginBottom: "0.5rem" }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%", padding: "0.75rem", boxSizing: "border-box",
                backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
                color: "#e8ecef", fontFamily: fontBody, fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ fontFamily: fontBody, fontSize: "0.8rem", color: "#f87171", marginBottom: "1.5rem" }}>
              {error}
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
