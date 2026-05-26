"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

const DEFAULT_CATS = [
  { id: 1, value: "obra_nueva",     label_es: "Obra Nueva",                 label_ca: "Obra Nova",                 label_en: "New Build",              label_fr: "Construction Neuve" },
  { id: 2, value: "rehabilitacion", label_es: "Rehabilitación de Edificios", label_ca: "Rehabilitació d'Edificis",  label_en: "Building Rehabilitation", label_fr: "Réhabilitation" },
  { id: 3, value: "viviendas",      label_es: "Viviendas",                   label_ca: "Habitatges",                label_en: "Homes",                  label_fr: "Logements" },
];

export default function AdminCategoriasPage() {
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ label_es: "", label_ca: "", label_en: "", label_fr: "" });
  const [saving, setSaving] = useState(false);

  function startEdit(cat: typeof DEFAULT_CATS[0]) {
    setEditing(cat.id);
    setForm({ label_es: cat.label_es, label_ca: cat.label_ca, label_en: cat.label_en, label_fr: cat.label_fr });
  }

  async function saveEdit(id: number) {
    setSaving(true);
    setCats((prev) => prev.map((c) => c.id === id ? { ...c, ...form } : c));
    // TODO: persist to Supabase categories table
    setEditing(null);
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
          Gestión
        </p>
        <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
          Categorías
        </h1>
      </div>

      <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.07)" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 80px", gap: "0.5rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(195,224,197,0.07)" }}>
          {["ES", "CA", "EN", "FR", ""].map((h) => (
            <span key={h} style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8fb0a8" }}>{h}</span>
          ))}
        </div>

        {cats.map((cat) => (
          <div key={cat.id} style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(195,224,197,0.04)" }}>
            {editing === cat.id ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  {(["label_es", "label_ca", "label_en", "label_fr"] as const).map((key) => (
                    <input key={key} value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} style={iStyle} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={() => saveEdit(cat.id)} disabled={saving} style={{ padding: "0.5rem 1rem", backgroundColor: "#C3E0C5", color: "#1a3d24", fontFamily: fontB, fontSize: "13px", border: "none", cursor: "pointer" }}>
                    {saving ? "..." : "Guardar"}
                  </button>
                  <button onClick={() => setEditing(null)} style={{ padding: "0.5rem 1rem", backgroundColor: "transparent", border: "1px solid rgba(195,224,197,0.15)", color: "#8b9a90", fontFamily: fontB, fontSize: "13px", cursor: "pointer" }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 80px", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#e8ecef" }}>{cat.label_es}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_ca}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_en}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_fr}</span>
                <button onClick={() => startEdit(cat)} style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C3E0C5", background: "none", border: "none", cursor: "pointer" }}>
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.05)" }}>
        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
          ◈ Las categorías se sincronizan con Supabase una vez migrados los proyectos a la base de datos
        </p>
      </div>
    </div>
  );
}

const iStyle: React.CSSProperties = {
  width: "100%", padding: "0.6rem", boxSizing: "border-box",
  backgroundColor: "#3a4f5a", border: "1px solid rgba(195,224,197,0.1)",
  color: "#e8ecef", fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", outline: "none",
};
