import type { Metadata } from "next";
import { getProjects } from "@/lib/queries";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos de SOMHi Arquitectura Técnica. Obra nueva, rehabilitación de edificios y viviendas en Barcelona y Cataluña.",
};

export const revalidate = 3600; // ISR cada hora

export default async function ProyectosPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        {/* Page header */}
        <section className="mb-16">
          <span className="font-mono text-label-sm text-primary uppercase tracking-widest mb-4 block">
            Portafolio
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light text-primary mb-4 leading-tight">
            Nuestros Proyectos
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Un escaparate de nuestra precisión arquitectónica e integridad
            estructural. Desde la dirección de ejecución hasta el control de
            calidad en cada fase constructiva.
          </p>
        </section>

        {/* Grid with filters */}
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
