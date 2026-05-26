"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

const NAV: { href: string; label: string; icon: string; children?: { href: string; label: string }[] }[] = [
  { href: "/admin/dashboard",      label: "Dashboard",      icon: "◈" },
  { href: "/admin/proyectos",      label: "Proyectos",      icon: "▦", children: [
    { href: "/admin/categorias", label: "Categorías" },
  ]},
  { href: "/admin/analytics",      label: "Analíticas",     icon: "◫" },
  { href: "/admin/configuracion",  label: "Configuración",  icon: "⚙" },
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-somhi.png" alt="SOMHi" style={{ height: "28px" }} />
        </div>

        {/* Nav */}
        <nav style={{ padding: "1.5rem 0", flex: 1 }}>
          {NAV.map(({ href, label, icon, children: subs }) => {
            const active = pathname.startsWith(href) || (subs?.some(s => pathname.startsWith(s.href)) ?? false);
            return (
              <div key={href}>
                <Link href={href} style={{
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
                {subs && active && subs.map((sub) => {
                  const subActive = pathname.startsWith(sub.href);
                  return (
                    <Link key={sub.href} href={sub.href} style={{
                      display: "block",
                      padding: "0.5rem 1.5rem 0.5rem 3.25rem",
                      color: subActive ? "#C3E0C5" : "#6b8078",
                      fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.08em",
                      textTransform: "uppercase", textDecoration: "none",
                      backgroundColor: subActive ? "rgba(195,224,197,0.04)" : "transparent",
                      transition: "all 0.15s",
                    }}>
                      › {sub.label}
                    </Link>
                  );
                })}
              </div>
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
