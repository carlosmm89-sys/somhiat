import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ProjectsBento from "@/components/home/ProjectsBento";
import ContactSection from "@/components/home/ContactSection";
import { getFeaturedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "SOMHi Arquitectura Técnica — Precisión y Alma",
  description:
    "Arquitecto técnico en Barcelona. Dirección de ejecución de obra, coordinación de seguridad y salud, y control de calidad en construcción. Benito Villa.",
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects().catch(() => []);

  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ProjectsBento projects={featuredProjects} />
      <ContactSection />
    </>
  );
}
