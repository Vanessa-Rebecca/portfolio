"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { openProject } from "@/lib/projectDialog";
import { Tag } from "@/components/ui/Tag";
import { ProjectLinks } from "./ProjectLinks";

const MAX_TAGS = 4;

/**
 * Text-led project card, matching the AI/ML case-study cards. The whole card
 * opens the case study via a stretched button; real links sit above it (z-10).
 * The designed preview lives in the case-study dialog.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `project-${project.slug}`;
  const extra = project.stack.length - MAX_TAGS;

  return (
    <article
      aria-labelledby={titleId}
      data-cursor="Open"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/50 sm:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-10 font-display text-[10rem] leading-none text-fg/[0.04] transition-colors duration-700 group-hover:text-accent/10"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[0.7rem] tracking-[0.16em] text-faint uppercase">{project.kind}</p>
        {project.featured ? <Tag tone="accent">Featured</Tag> : null}
      </div>

      <h3 id={titleId} className="mt-3 flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => openProject(project.slug)}
          className="text-left text-2xl font-medium tracking-tight after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-[1.75rem] after:focus-visible:outline-2 after:focus-visible:outline-offset-2 after:focus-visible:outline-accent"
        >
          {project.title}
          <span className="sr-only"> — open case study</span>
        </button>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          aria-hidden
        />
      </h3>

      <div className="relative mt-6 grid gap-5">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent-2 uppercase">The problem</p>
          <p className="mt-1.5 leading-relaxed text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">What I built</p>
          <ul className="mt-1.5 space-y-1.5">
            {project.contribution.slice(0, 2).map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-fg/90">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_TAGS).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {extra > 0 ? <Tag>+{extra}</Tag> : null}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ProjectLinks project={project} />
          <span className="text-sm text-muted transition-colors group-hover:text-fg">Case study →</span>
        </div>
      </div>
    </article>
  );
}
