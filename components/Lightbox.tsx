"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => setIndex(i => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
  const next = useCallback(() => setIndex(i => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        backgroundColor: "rgba(10, 15, 17, 0.95)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.3s ease",
        cursor: "zoom-out",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          background: "none", border: "none", cursor: "pointer",
          color: "#e8ecef", fontSize: "1.5rem", zIndex: 10001,
          width: "44px", height: "44px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
        fontSize: "0.7rem", letterSpacing: "0.1em", color: "#8fb0a8",
      }}>
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{
            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
            color: "#e8ecef", fontSize: "1.5rem",
            width: "48px", height: "48px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={`Foto ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "85vh",
          objectFit: "contain",
          cursor: "default",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{
            position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
            color: "#e8ecef", fontSize: "1.5rem",
            width: "48px", height: "48px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          aria-label="Siguiente"
        >
          ›
        </button>
      )}
    </div>
  );
}
