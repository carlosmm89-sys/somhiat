"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

interface PageView {
  id: number;
  path: string;
  referrer: string | null;
  created_at: string;
}

interface DayStat { date: string; count: number }
interface PageStat { path: string; count: number }

export default function AnalyticsPage() {
  const [views, setViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<7 | 30 | 90>(30);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const supabase = createClient();
      const since = new Date();
      since.setDate(since.getDate() - period);

      const { data } = await supabase
        .from("page_views")
        .select("*")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: false });

      setViews(data ?? []);
      setLoading(false);
    }
    load();
  }, [period]);

  // Aggregate by day
  const dayStats: DayStat[] = [];
  const dayMap = new Map<string, number>();
  views.forEach((v) => {
    const d = v.created_at.slice(0, 10);
    dayMap.set(d, (dayMap.get(d) || 0) + 1);
  });
  // Fill missing days
  for (let i = period - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dayStats.push({ date: key, count: dayMap.get(key) || 0 });
  }
  const maxDay = Math.max(...dayStats.map((d) => d.count), 1);

  // Aggregate by page
  const pageMap = new Map<string, number>();
  views.forEach((v) => {
    pageMap.set(v.path, (pageMap.get(v.path) || 0) + 1);
  });
  const pageStats: PageStat[] = Array.from(pageMap.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const maxPage = Math.max(...pageStats.map((p) => p.count), 1);

  // Today / week stats
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = dayMap.get(today) || 0;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekCount = views.filter((v) => new Date(v.created_at) >= weekAgo).length;

  // Unique referrers
  const refMap = new Map<string, number>();
  views.forEach((v) => {
    if (v.referrer) {
      try {
        const host = new URL(v.referrer).hostname;
        refMap.set(host, (refMap.get(host) || 0) + 1);
      } catch {}
    }
  });
  const refStats = Array.from(refMap.entries())
    .map(([host, count]) => ({ host, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a5254", marginBottom: "0.5rem" }}>
            Analíticas
          </p>
          <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#dfe3e6" }}>
            Visitas
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {([7, 30, 90] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: "0.5rem 1rem", fontFamily: font, fontSize: "0.55rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              backgroundColor: period === p ? "rgba(195,224,197,0.1)" : "transparent",
              border: period === p ? "1px solid rgba(195,224,197,0.2)" : "1px solid rgba(195,224,197,0.08)",
              color: period === p ? "#C3E0C5" : "#8b9a90",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {p}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ fontFamily: font, fontSize: "0.6rem", color: "#4a5254", textAlign: "center", padding: "4rem 0" }}>
          Cargando...
        </p>
      ) : (
        <>
          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
            {[
              { label: "Hoy", value: todayCount, color: "#C3E0C5" },
              { label: "Última semana", value: weekCount, color: "#7ec8e3" },
              { label: `Últimos ${period}d`, value: views.length, color: "#e8c87e" },
              { label: "Páginas únicas", value: pageStats.length, color: "#c5a3e8" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.08)",
                padding: "1.5rem", textAlign: "center",
              }}>
                <p style={{ fontFamily: fontD, fontSize: "2.5rem", fontWeight: 300, color, lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8b9a90", marginTop: "0.75rem" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Daily chart */}
          <div style={{ backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.08)", padding: "1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.25rem" }}>
              Visitas por día
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: period > 30 ? "1px" : "3px", height: "160px" }}>
              {dayStats.map((d) => (
                <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <div
                    title={`${d.date}: ${d.count} visitas`}
                    style={{
                      width: "100%",
                      height: `${Math.max((d.count / maxDay) * 100, 2)}%`,
                      backgroundColor: d.date === today ? "#C3E0C5" : "rgba(195,224,197,0.3)",
                      borderRadius: "2px 2px 0 0",
                      transition: "height 0.3s",
                      minHeight: "2px",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.4rem", color: "#5e7a72" }}>{dayStats[0]?.date}</span>
              <span style={{ fontFamily: font, fontSize: "0.4rem", color: "#5e7a72" }}>{dayStats[dayStats.length - 1]?.date}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Top pages */}
            <div style={{ backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.08)", padding: "1.5rem" }}>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.25rem" }}>
                Páginas más visitadas
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {pageStats.map((p) => (
                  <div key={p.path}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <span style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#dfe3e6" }}>{p.path}</span>
                      <span style={{ fontFamily: font, fontSize: "0.6rem", color: "#8b9a90" }}>{p.count}</span>
                    </div>
                    <div style={{ height: "4px", backgroundColor: "rgba(195,224,197,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(p.count / maxPage) * 100}%`, backgroundColor: "#C3E0C5", borderRadius: "2px", transition: "width 0.3s" }} />
                    </div>
                  </div>
                ))}
                {pageStats.length === 0 && (
                  <p style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#5e7a72" }}>Sin datos aún</p>
                )}
              </div>
            </div>

            {/* Referrers */}
            <div style={{ backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.08)", padding: "1.5rem" }}>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.25rem" }}>
                Origen del tráfico
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {refStats.map((r) => (
                  <div key={r.host} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#dfe3e6" }}>{r.host}</span>
                    <span style={{ fontFamily: font, fontSize: "0.6rem", color: "#8b9a90", backgroundColor: "rgba(195,224,197,0.08)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{r.count}</span>
                  </div>
                ))}
                {refStats.length === 0 && (
                  <p style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#5e7a72" }}>Sin datos de referrer aún</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent views */}
          <div style={{ backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.08)", padding: "1.5rem", marginTop: "1.5rem" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1.25rem" }}>
              Últimas visitas
            </p>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {views.slice(0, 30).map((v) => (
                <div key={v.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.5rem 0", borderBottom: "1px solid rgba(195,224,197,0.04)",
                }}>
                  <span style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#dfe3e6" }}>{v.path}</span>
                  <span style={{ fontFamily: font, fontSize: "0.5rem", color: "#5e7a72" }}>
                    {new Date(v.created_at).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
              {views.length === 0 && (
                <p style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#5e7a72" }}>No hay visitas registradas aún</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
