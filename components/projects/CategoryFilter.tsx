"use client";

import { useState } from "react";
import type { ProjectCategory } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

type Filter = ProjectCategory | "all";

interface CategoryFilterProps {
  active: Filter;
  onChange: (cat: Filter) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const { tr } = useLanguage();
  const f = tr.projectsPage.filters;

  const filters: { value: Filter; label: string }[] = [
    { value: "all",           label: f.all },
    { value: "obra-nueva",    label: f.obra_nueva },
    { value: "rehabilitacion",label: f.rehabilitacion },
    { value: "viviendas",     label: f.viviendas },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", borderBottom: "1px solid rgba(195,224,197,0.1)", paddingBottom: "0", marginBottom: "3rem" }}>
      {filters.map(({ value, label }) => (
        <button
          key={value}
          id={`filter-${value}`}
          onClick={() => onChange(value)}
          style={{
            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
            fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.6rem 1.25rem",
            backgroundColor: active === value ? "rgba(195,224,197,0.1)" : "transparent",
            color: active === value ? "#C3E0C5" : "#8b9a90",
            border: active === value ? "1px solid rgba(195,224,197,0.2)" : "1px solid transparent",
            borderBottom: active === value ? "1px solid #30424c" : "1px solid transparent",
            cursor: "pointer", transition: "all 0.2s",
            position: "relative", marginBottom: "-1px",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
