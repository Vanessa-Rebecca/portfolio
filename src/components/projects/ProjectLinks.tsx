import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "@/components/ui/Icons";

/** Real links only. When none exist, an honest availability note is shown instead. */
export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const { github, live } = project.links;
  const pad = size === "md" ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs";

  if (!github && live.length === 0) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong text-muted ${pad}`}>
        <Lock className="size-3.5" aria-hidden />
        {project.availability ?? "Private project"}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line-strong transition-colors duration-300 hover:border-accent hover:bg-accent-soft ${pad}`}
        >
          <GithubIcon className="size-3.5" />
          Code
          <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      ) : null}
      {live.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 inline-flex items-center gap-1.5 rounded-full bg-fg text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent ${pad}`}
        >
          {l.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
