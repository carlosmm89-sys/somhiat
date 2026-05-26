"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const INITIAL_COUNT = 12;
const BATCH_COUNT = 12;

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const loadMore = () => setVisible((v) => Math.min(v + BATCH_COUNT, images.length));
  const hasMore = visible < images.length;

  const labels = {
    es: { gallery: "Galería",  viewMore: "Ver más fotos",    count: (v: number, t: number) => `${v} de ${t} imágenes` },
    ca: { gallery: "Galeria",  viewMore: "Veure més fotos",  count: (v: number, t: number) => `${v} de ${t} imatges` },
    en: { gallery: "Gallery",  viewMore: "Load more photos", count: (v: number, t: number) => `${v} of ${t} images` },
    fr: { gallery: "Galerie",  viewMore: "Voir plus",        count: (v: number, t: number) => `${v} sur ${t} images` },
  };
  const lbl = labels[lang] ?? labels.es;
  const shown = images.slice(0, visible);

  // ── Lightbox keyboard nav ──────────────────────────────────────────
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(() => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextImg = useCallback(() => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  const font = "var(--font-jetbrains),'JetBrains Mono',monospace";
  const fontBody = "var(--font-inter),'Inter',sans-serif";

  return (
    <>
      {/* ── Gallery section ── */}
      <div style={{ marginTop: "4rem" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(195,224,197,0.08)",
          paddingTop: "2rem", marginBottom: "2rem",
        }}>
          <h2 style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5" }}>
            {lbl.gallery}
          </h2>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
            {lbl.count(Math.min(visible, images.length), images.length)}
          </span>
        </div>

        {/* Masonry */}
        <div style={{ columnCount: 3, columnGap: "0.625rem" }}>
          {shown.map((url, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              style={{
                breakInside: "avoid",
                marginBottom: "0.625rem",
                overflow: "hidden",
                backgroundColor: "#3a4f5a",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`${title} — ${i + 1}`}
                style={{
                  width: "100%", height: "auto", display: "block",
                  objectFit: "cover",
                  transition: "transform 0.4s ease, filter 0.3s ease",
                  filter: "grayscale(15%)",
                }}
                loading={i < 6 ? "eager" : "lazy"}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.transform = "scale(1.04)";
                  el.style.filter = "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.transform = "scale(1)";
                  el.style.filter = "grayscale(15%)";
                }}
              />
              {/* Zoom icon overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(53,72,83,0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s",
                pointerEvents: "none",
              }}
                className="gallery-overlay"
              />
            </div>
          ))}
        </div>

        {/* Ver más */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button
              onClick={loadMore}
              style={{
                fontFamily: fontBody, fontSize: "14px",
                color: "#C3E0C5", backgroundColor: "transparent",
                border: "1px solid rgba(195,224,197,0.25)",
                padding: "0.875rem 2.5rem", cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(195,224,197,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(195,224,197,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(195,224,197,0.25)";
              }}
            >
              <span>{lbl.viewMore}</span>
              <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>({images.length - visible} más)</span>
              <span>↓</span>
            </button>
          </div>
        )}

        {!hasMore && images.length > INITIAL_COUNT && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
              — {images.length} {lang === "en" ? "images" : lang === "fr" ? "images" : lang === "ca" ? "imatges" : "imágenes"} —
            </span>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: "rgba(44,62,71,0.97)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute", top: "1.5rem", right: "1.5rem",
              background: "none", border: "none", cursor: "pointer",
              color: "#C3E0C5", fontSize: "1.5rem", zIndex: 10,
              fontFamily: font, letterSpacing: "0.05em",
              opacity: 0.7, transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")}
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Counter */}
          <div style={{
            position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
            fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "rgba(195,224,197,0.4)",
          }}>
            {lightbox + 1} / {images.length}
          </div>

          {/* Prev arrow */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              style={{
                position: "absolute", left: "1.5rem",
                background: "none", border: "none", cursor: "pointer",
                color: "#C3E0C5", fontSize: "2rem", zIndex: 10,
                opacity: 0.6, transition: "opacity 0.2s",
                fontFamily: "serif",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
              aria-label="Anterior"
            >
              ←
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw", maxHeight: "88vh",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightbox]}
              alt={`${title} — ${lightbox + 1}`}
              style={{
                maxWidth: "90vw", maxHeight: "88vh",
                objectFit: "contain",
                boxShadow: "0 0 80px rgba(0,0,0,0.8)",
                animation: "zoomIn 0.2s ease",
              }}
            />
          </div>

          {/* Next arrow */}
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              style={{
                position: "absolute", right: "1.5rem",
                background: "none", border: "none", cursor: "pointer",
                color: "#C3E0C5", fontSize: "2rem", zIndex: 10,
                opacity: 0.6, transition: "opacity 0.2s",
                fontFamily: "serif",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
              aria-label="Siguiente"
            >
              →
            </button>
          )}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>
    </>
  );
}
