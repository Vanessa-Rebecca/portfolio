"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { openProject } from "@/lib/projectDialog";
import { Tag } from "@/components/ui/Tag";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectLinks } from "./ProjectLinks";

/**
 * Whole card opens the case study via a stretched button; the real links sit
 * above it (z-10) so they stay independently clickable.
 */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const titleId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={titleId}
      data-cursor="View"
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_30px_80px_-40px_var(--glow)] ${
        featured ? "lg:grid lg:grid-cols-12" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "lg:col-span-7" : ""}`}>
        <ProjectPreview
          project={project}
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className={`aspect-[16/10] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035] ${
            featured ? "lg:aspect-auto lg:h-full lg:min-h-[30rem]" : ""
          }`}
        />
        <div className="pointer-events-none absolute top-4 left-4 flex flex-wrap gap-2">
          {featured ? <Tag tone="accent">Featured</Tag> : null}
          {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
        </div>
        <span
          aria-hidden
          className="absolute right-4 bottom-4 grid size-11 translate-y-3 place-items-center rounded-full bg-fg text-bg opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? "lg:col-span-5 lg:justify-center lg:p-10" : ""}`}>
        <p className="font-mono text-[0.7rem] tracking-[0.16em] text-faint uppercase">{project.kind}</p>
        <h3
          id={titleId}
          className={`mt-3 tracking-tight text-balance ${featured ? "font-display text-[clamp(2.2rem,3.6vw,3.25rem)] leading-[0.95]" : "text-2xl font-medium"}`}
        >
          <button
            type="button"
            onClick={() => openProject(project.slug)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-[1.75rem] after:focus-visible:outline-2 after:focus-visible:outline-offset-2 after:focus-visible:outline-accent"
          >
            {project.title}
            <span className="sr-only"> — open case study</span>
          </button>
        </h3>
        <p className="mt-3 leading-relaxed text-muted text-pretty">{project.summary}</p>

        {featured ? (
          <ul className="mt-6 space-y-2 text-sm text-fg/85">
            {project.contribution.slice(0, 3).map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        ) : null}

        {project.metric ? (
          <p className="mt-5 inline-flex w-fit items-baseline gap-2 rounded-xl border border-accent/30 bg-accent-soft px-3 py-2">
            <span className="font-display text-2xl text-accent">{project.metric.value}</span>
            <span className="text-xs text-muted">{project.metric.label}</span>
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 6 : 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {project.stack.length > (featured ? 6 : 4) ? <Tag>+{project.stack.length - (featured ? 6 : 4)}</Tag> : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
          <ProjectLinks project={project} />
          <span className="text-sm text-muted transition-colors group-hover:text-fg">Case study →</span>
        </div>
      </div>
    </article>
  );
}
