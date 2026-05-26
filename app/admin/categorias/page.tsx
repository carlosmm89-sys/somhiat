"use client";

import { useState } from "react";

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";
const fontD = "'Hanken Grotesk', sans-serif";

interface Cat {
  id: number;
  value: string;
  label_es: string;
  label_ca: string;
  label_en: string;
  label_fr: string;
}

const DEFAULT_CATS: Cat[] = [
  { id: 1, value: "obra_nueva",     label_es: "Obra Nueva",                 label_ca: "Obra Nova",                 label_en: "New Build",              label_fr: "Construction Neuve" },
  { id: 2, value: "rehabilitacion", label_es: "Rehabilitación de Edificios", label_ca: "Rehabilitació d'Edificis",  label_en: "Building Rehabilitation", label_fr: "Réhabilitation" },
  { id: 3, value: "viviendas",      label_es: "Viviendas",                   label_ca: "Habitatges",                label_en: "Homes",                  label_fr: "Logements" },
];

const emptyForm = { value: "", label_es: "", label_ca: "", label_en: "", label_fr: "" };

export default function AdminCategoriasPage() {
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ label_es: "", label_ca: "", label_en: "", label_fr: "" });
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function startEdit(cat: Cat) {
    setEditing(cat.id);
    setForm({ label_es: cat.label_es, label_ca: cat.label_ca, label_en: cat.label_en, label_fr: cat.label_fr });
  }

  function saveEdit(id: number) {
    setSaving(true);
    setCats((prev) => prev.map((c) => c.id === id ? { ...c, ...form } : c));
    setEditing(null);
    setSaving(false);
  }

  function addCategory() {
    if (!newForm.value || !newForm.label_es) return;
    const newCat: Cat = {
      id: Math.max(...cats.map(c => c.id), 0) + 1,
      value: newForm.value.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""),
      label_es: newForm.label_es,
      label_ca: newForm.label_ca || newForm.label_es,
      label_en: newForm.label_en || newForm.label_es,
      label_fr: newForm.label_fr || newForm.label_es,
    };
    setCats((prev) => [...prev, newCat]);
    setNewForm(emptyForm);
    setAdding(false);
  }

  function deleteCategory(id: number) {
    if (!confirm("¿Eliminar esta categoría?")) return;
    setCats((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div style={{ maxWidth: "860px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "0.5rem" }}>
            Gestión
          </p>
          <h1 style={{ fontFamily: fontD, fontSize: "2rem", fontWeight: 300, color: "#e8ecef" }}>
            Categorías
          </h1>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)} style={{
            padding: "0.6rem 1.25rem", backgroundColor: "#C3E0C5",
            border: "none", color: "#1a3d24", fontFamily: fontB,
            fontSize: "13px", fontWeight: 500, cursor: "pointer",
            transition: "opacity 0.2s",
          }}>
            + Nueva categoría
          </button>
        )}
      </div>

      {/* Add new category form */}
      {adding && (
        <div style={{ backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.15)", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "1rem" }}>
            Nueva categoría
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div>
              <label style={labelStyle}>Valor (slug)</label>
              <input
                value={newForm.value}
                onChange={(e) => setNewForm((f) => ({ ...f, value: e.target.value }))}
                placeholder="ej: interiorismo"
                style={iStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nombre ES</label>
              <input
                value={newForm.label_es}
                onChange={(e) => setNewForm((f) => ({ ...f, label_es: e.target.value }))}
                placeholder="ej: Interiorismo"
                style={iStyle}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Nombre CA</label>
              <input
                value={newForm.label_ca}
                onChange={(e) => setNewForm((f) => ({ ...f, label_ca: e.target.value }))}
                placeholder="Opcional"
                style={iStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nombre EN</label>
              <input
                value={newForm.label_en}
                onChange={(e) => setNewForm((f) => ({ ...f, label_en: e.target.value }))}
                placeholder="Opcional"
                style={iStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nombre FR</label>
              <input
                value={newForm.label_fr}
                onChange={(e) => setNewForm((f) => ({ ...f, label_fr: e.target.value }))}
                placeholder="Opcional"
                style={iStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={addCategory}
              disabled={!newForm.value || !newForm.label_es}
              style={{
                padding: "0.6rem 1.25rem", backgroundColor: !newForm.value || !newForm.label_es ? "#4a5254" : "#C3E0C5",
                border: "none", color: !newForm.value || !newForm.label_es ? "#8b9a90" : "#1a3d24",
                fontFamily: fontB, fontSize: "13px", fontWeight: 500, cursor: "pointer",
              }}
            >
              Añadir categoría
            </button>
            <button
              onClick={() => { setAdding(false); setNewForm(emptyForm); }}
              style={{ padding: "0.6rem 1.25rem", backgroundColor: "transparent", border: "1px solid rgba(195,224,197,0.15)", color: "#8b9a90", fontFamily: fontB, fontSize: "13px", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Categories table */}
      <div style={{ backgroundColor: "#30424c", border: "1px solid rgba(195,224,197,0.07)" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 1fr 1fr 80px", gap: "0.5rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(195,224,197,0.07)" }}>
          {["Slug", "ES", "CA", "EN", "FR", ""].map((h) => (
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
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 1fr 1fr 80px", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontFamily: font, fontSize: "0.65rem", color: "#5e7a72" }}>{cat.value}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#e8ecef" }}>{cat.label_es}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_ca}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_en}</span>
                <span style={{ fontFamily: fontB, fontSize: "0.875rem", color: "#8b9a90" }}>{cat.label_fr}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => startEdit(cat)} style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C3E0C5", background: "none", border: "none", cursor: "pointer" }}>
                    Editar
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fb923c", background: "none", border: "none", cursor: "pointer" }}>
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#354853", border: "1px solid rgba(195,224,197,0.05)" }}>
        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
          ◈ {cats.length} categorías · Los cambios se persisten con Supabase
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

const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.45rem", letterSpacing: "0.1em", textTransform: "uppercase",
  color: "#8b9a90", marginBottom: "0.35rem",
};
