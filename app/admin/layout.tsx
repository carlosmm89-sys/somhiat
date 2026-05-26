"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

const NAV = [
  { href: "/admin/dashboard",   label: "Dashboard",   icon: "◈" },
  { href: "/admin/proyectos",   label: "Proyectos",   icon: "▦" },
  { href: "/admin/categorias",  label: "Categorías",  icon: "◉" },
  { href: "/admin/analytics",   label: "Analíticas",  icon: "◫" },
];

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();

  // Login page uses its own full-screen layout
  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#2c3e47" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: "220px", flexShrink: 0,
        backgroundColor: "#354853",
        borderRight: "1px solid rgba(195,224,197,0.07)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, bottom: 0, left: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: "1.75rem 1.5rem", borderBottom: "1px solid rgba(195,224,197,0.07)" }}>
          <p style={{ fontFamily: font, fontSize: "1rem", fontWeight: 700, color: "#C3E0C5", letterSpacing: "0.08em" }}>
            SOMHi
          </p>
          <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2c3e47", marginTop: "0.25rem" }}>
            Admin
          </p>
        </div>

        {/* Nav */}
        <nav style={{ padding: "1.5rem 0", flex: 1 }}>
          {NAV.map(({ href, label, icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: active ? "rgba(195,224,197,0.07)" : "transparent",
                borderLeft: active ? "2px solid #C3E0C5" : "2px solid transparent",
                color: active ? "#C3E0C5" : "#8b9a90",
                fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "all 0.15s",
              }}>
                <span style={{ fontSize: "0.9rem" }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(195,224,197,0.07)" }}>
          <Link href="/" target="_blank" style={{
            display: "block", fontFamily: font, fontSize: "0.5rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#8fb0a8", textDecoration: "none", marginBottom: "1rem",
          }}>
            ↗ Ver web
          </Link>
          <button onClick={logout} style={{
            width: "100%", padding: "0.6rem",
            backgroundColor: "transparent",
            border: "1px solid rgba(195,224,197,0.1)",
            color: "#8b9a90", fontFamily: font, fontSize: "0.5rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(195,224,197,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#C3E0C5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(195,224,197,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#8b9a90"; }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ marginLeft: "220px", flex: 1, padding: "2.5rem", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
