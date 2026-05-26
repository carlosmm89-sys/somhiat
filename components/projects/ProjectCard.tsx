import Link from "next/link";
import type { Project } from "@/types";
import { CATEGORY_LABELS } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group bg-[#3a4f5a] border border-primary/20 hover:border-primary transition-all duration-300 block overflow-hidden"
    >
      {/* Image */}
      <div style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", position: "relative", backgroundColor: "#3a4f5a" }}>
        {project.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_url}
            alt={project.title}
            className="project-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.6rem", color: "#8b9a90", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sin imagen</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="p-6 border-t border-primary/20">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-headline text-headline-lg text-primary group-hover:text-primary-fixed transition-colors">
            {project.title}
          </h2>
          {project.year && (
            <span className="font-mono text-label-sm text-on-surface-variant mt-1 flex-shrink-0 ml-4">
              {project.year}
            </span>
          )}
        </div>
        <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-widest">
            {CATEGORY_LABELS[project.category]}
          </span>
          {project.location && (
            <p className="font-mono text-on-surface-variant/50 mt-1" style={{ fontSize: "0.65rem", letterSpacing: "0.03em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project.location}
            </p>
          )}

        {project.description && (
          <p className="mt-3 font-body text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </Link>
  );
}
