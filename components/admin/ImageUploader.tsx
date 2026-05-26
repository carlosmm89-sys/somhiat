"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";

interface Props {
  initialData?: {
    slug: string;
    cover_url?: string | null;
    gallery?: string[];
  };
  projectSlug?: string;
}

const font  = "'JetBrains Mono', monospace";
const fontB = "'Inter', sans-serif";

export default function ImageUploader({ initialData, projectSlug }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(initialData?.gallery ?? []);
  const [cover, setCover] = useState<string | null>(initialData?.cover_url ?? null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const slug = projectSlug ?? initialData?.slug ?? "proyecto";
  const BUCKET = "project-images";

  async function uploadFiles(files: FileList | File[]) {
    const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!fileArr.length) return;

    setUploading(true);
    setProgress(0);
    setError("");
    const supabase = createClient();
    const newUrls: string[] = [];

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      const ext  = file.name.split(".").pop()?.toLowerCase() ?? "webp";
      const path = `${slug}/${slug}-${Date.now()}-${i + 1}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (upErr) {
        setError(`Error subiendo ${file.name}: ${upErr.message}`);
        continue;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      newUrls.push(data.publicUrl);
      setProgress(Math.round(((i + 1) / fileArr.length) * 100));
    }

    const merged = [...uploadedUrls, ...newUrls];
    setUploadedUrls(merged);
    if (!cover && newUrls.length > 0) setCover(newUrls[0]);
    setUploading(false);
  }

  function removeImage(url: string) {
    setUploadedUrls((prev) => prev.filter((u) => u !== url));
    if (cover === url) setCover(uploadedUrls.find((u) => u !== url) ?? null);
  }

  const otherImages = uploadedUrls.filter((u) => u !== cover);

  return (
    <div>
      {/* Hidden inputs for form submission */}
      <input type="hidden" name="cover_url"  value={cover ?? ""} />
      <input type="hidden" name="gallery"    value={JSON.stringify(uploadedUrls)} />

      {/* ── Imagen Principal (Cover) ── */}
      {cover && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3E0C5", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "#C3E0C5", borderRadius: "50%" }} />
            Imagen principal (portada)
          </p>
          <div style={{ position: "relative", maxWidth: "500px", overflow: "hidden", border: "2px solid #C3E0C5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover} alt="Portada"
              style={{ width: "100%", height: "auto", display: "block", maxHeight: "320px", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", top: "8px", left: "8px",
              backgroundColor: "#C3E0C5", color: "#1a3d24",
              fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "4px 10px", fontWeight: 600,
            }}>
              Portada
            </div>
          </div>
        </div>
      )}

      {/* ── Drop zone ── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); uploadFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "#C3E0C5" : "rgba(195,224,197,0.2)"}`,
          backgroundColor: dragging ? "rgba(195,224,197,0.04)" : "#2c3e47",
          padding: "2rem",
          textAlign: "center", cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ fontFamily: fontB, fontSize: "14px", color: "#8b9a90", marginBottom: "0.5rem" }}>
          {uploading ? `Subiendo... ${progress}%` : "Arrastra imágenes aquí o haz clic para seleccionar"}
        </p>
        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
          JPG, PNG, WEBP · Múltiples archivos
        </p>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
      </div>

      {/* Progress bar */}
      {uploading && (
        <div style={{ height: "3px", backgroundColor: "#3a4f5a", marginBottom: "1.5rem" }}>
          <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#C3E0C5", transition: "width 0.3s" }} />
        </div>
      )}

      {error && <p style={{ fontFamily: fontB, fontSize: "0.8rem", color: "#f87171", marginBottom: "1rem" }}>{error}</p>}

      {/* ── Galería — haz clic para cambiar portada ── */}
      {uploadedUrls.length > 1 && (
        <div>
          <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8", marginBottom: "1rem" }}>
            {otherImages.length} imagen{otherImages.length !== 1 ? "es" : ""} · Haz clic en una para cambiarla como portada
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.5rem" }}>
            {otherImages.map((url) => (
              <div key={url} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url} alt=""
                  onClick={() => setCover(url)}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    border: "2px solid transparent",
                    opacity: 0.65,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; (e.currentTarget as HTMLImageElement).style.borderColor = "rgba(195,224,197,0.5)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.65"; (e.currentTarget as HTMLImageElement).style.borderColor = "transparent"; }}
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(url); }}
                  style={{
                    position: "absolute", top: "3px", right: "3px",
                    backgroundColor: "rgba(53,72,83,0.85)", border: "none",
                    color: "#f87171", cursor: "pointer", fontSize: "0.65rem",
                    width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedUrls.length === 1 && (
        <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fb0a8" }}>
          1 imagen cargada
        </p>
      )}
    </div>
  );
}
