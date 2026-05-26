import type { MetadataRoute } from "next";
import { STATIC_PROJECTS } from "@/lib/static-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://somhiat.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/proyectos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/aviso-legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/politica-de-privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/politica-de-cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Dynamic: individual project pages
  const projectPages: MetadataRoute.Sitemap = STATIC_PROJECTS.map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
