"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import CategoryFilter from "./CategoryFilter";
import ProjectCard from "./ProjectCard";

type Filter = ProjectCategory | "all";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      <CategoryFilter active={activeFilter} onChange={setActiveFilter} />

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-mono text-label-sm text-on-surface-variant uppercase tracking-widest">
            No hay proyectos en esta categoría
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
