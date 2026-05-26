import Link from "next/link";

export default function NotFound() {
  const font = "'JetBrains Mono', monospace";
  const fontH = "'Hanken Grotesk', sans-serif";
  const fontB = "'Inter', sans-serif";

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#354853",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", textAlign: "center",
    }}>
      <div style={{ maxWidth: "480px" }}>
        <p style={{ fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.5rem" }}>
          Error 404
        </p>
        <h1 style={{ fontFamily: fontH, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 300, color: "#e8ecef", lineHeight: 1, marginBottom: "1.5rem" }}>
          Página<br /><span style={{ color: "#C3E0C5", fontStyle: "italic" }}>no encontrada</span>
        </h1>
        <p style={{ fontFamily: fontB, fontSize: "1rem", color: "#8b9a90", lineHeight: 1.6, marginBottom: "3rem" }}>
          La página que buscas no existe o ha sido movida.
        </p>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          padding: "0.875rem 2rem",
          backgroundColor: "#C3E0C5", color: "#1a3d24",
          fontFamily: fontB, fontSize: "14px", fontWeight: 500,
          textDecoration: "none", transition: "opacity 0.2s",
        }}>
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
