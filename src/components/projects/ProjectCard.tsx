"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { openProject } from "@/lib/projectDialog";
import { Tag } from "@/components/ui/Tag";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectLinks } from "./ProjectLinks";

const MAX_TAGS = 3;

/**
 * Compact gallery card. The whole card opens the case study via a stretched
 * button; real links sit above it (z-10) so they stay independently clickable.
 */
export function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}`;
  const extra = project.stack.length - MAX_TAGS;

  return (
    <article
      aria-labelledby={titleId}
      data-cursor="View"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_60px_-36px_var(--glow)]"
    >
      <div className="relative overflow-hidden">
        <ProjectPreview
          project={project}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.featured ? <Tag tone="accent">Featured</Tag> : null}
          {project.category === "ai" ? <Tag tone="accent">AI / ML</Tag> : null}
          {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
        </div>
        <span
          aria-hidden
          className="absolute right-3 bottom-3 grid size-9 translate-y-2 place-items-center rounded-full bg-fg text-bg opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="truncate font-mono text-[0.65rem] tracking-[0.16em] text-faint uppercase">{project.kind}</p>
        <h3 id={titleId} className="mt-2 text-lg leading-snug font-medium tracking-tight text-balance">
          <button
            type="button"
            onClick={() => openProject(project.slug)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-3xl after:focus-visible:outline-2 after:focus-visible:outline-offset-2 after:focus-visible:outline-accent"
          >
            {project.title}
            <span className="sr-only"> — open case study</span>
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_TAGS).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {extra > 0 ? <Tag>+{extra}</Tag> : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <ProjectLinks project={project} />
          <span className="text-xs text-muted transition-colors group-hover:text-fg">Case study →</span>
        </div>
      </div>
    </article>
  );
}
