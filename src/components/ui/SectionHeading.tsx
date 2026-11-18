import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
};

/** Numbered editorial section header: "02 — Experience" + large display title. */
export function SectionHeading({ index, label, title, intro, id, className = "" }: Props) {
  return (
    <header className={`grid gap-8 lg:grid-cols-12 lg:gap-10 ${className}`}>
      <div className="lg:col-span-3" data-reveal>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {label}
        </p>
      </div>
      <div className="lg:col-span-9">
        <h2
          id={id}
          data-split
          className="font-display text-[clamp(2.6rem,6.5vw,5.75rem)] leading-[0.95] tracking-[-0.02em] text-balance"
        >
          {title}
        </h2>
        {intro ? (
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
