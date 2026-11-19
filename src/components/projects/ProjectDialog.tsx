"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { onOpenProject } from "@/lib/projectDialog";
import { startScroll, stopScroll } from "@/lib/scroll";
import { gsap, MQ } from "@/lib/gsap";
import { Tag } from "@/components/ui/Tag";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectLinks } from "./ProjectLinks";

/**
 * Case-study drawer built on the native <dialog>: focus trapping, Escape and
 * inert background come from the platform; GSAP adds the slide.
 */
export function ProjectDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const project = index === null ? null : projects[index];
  /** Which animation to play once React has rendered the new project. */
  const pending = useRef<"open" | 1 | -1 | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const kind = pending.current;
    pending.current = null;
    if (!panel || kind === null || !window.matchMedia(MQ.motion).matches) return;
    const items = panel.querySelectorAll("[data-dialog-in]");
    if (kind === "open") {
      gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: "expo.out" });
      gsap.from(items, { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.9, delay: 0.15 });
    } else {
      gsap.from(items, { x: 40 * kind, autoAlpha: 0, stagger: 0.04, duration: 0.7 });
    }
  }, [index]);

  useEffect(
    () =>
      onOpenProject((slug) => {
        const i = projects.findIndex((p) => p.slug === slug);
        if (i < 0) return;
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) return;
        returnFocus.current = document.activeElement as HTMLElement | null;
        pending.current = "open";
        setIndex(i);
        dialog.showModal();
        stopScroll();
      }),
    [],
  );

  const finishClose = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const close = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || !window.matchMedia(MQ.motion).matches) return finishClose();
    gsap.to(panel, { xPercent: 100, duration: 0.6, ease: "expo.in", onComplete: finishClose });
  }, [finishClose]);

  // Native close (Escape or .close()) → restore scroll + focus
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      startScroll();
      setIndex(null);
      returnFocus.current?.focus?.();
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [close]);

  const go = (dir: 1 | -1) => {
    if (index === null) return;
    pending.current = dir;
    setIndex((index + dir + projects.length) % projects.length);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-none overflow-visible bg-transparent p-0 text-fg backdrop:bg-transparent sm:max-w-3xl"
    >
      <div ref={panelRef} className="flex h-full flex-col border-l border-line bg-bg-elev shadow-[-40px_0_120px_-40px_rgba(0,0,0,0.6)]">
        {project ? (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-8">
              <p className="font-mono text-xs text-faint">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent" aria-label="Previous project">
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
                <button type="button" onClick={() => go(1)} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent" aria-label="Next project">
                  <ArrowRight className="size-4" aria-hidden />
                </button>
                <button type="button" onClick={close} className="ml-2 grid size-10 place-items-center rounded-full bg-fg text-bg transition-colors hover:bg-accent hover:text-on-accent" aria-label="Close case study" autoFocus>
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
              <div data-dialog-in className="p-5 sm:p-8">
                <ProjectPreview project={project} className="aspect-[16/10] rounded-2xl border border-line" sizes="(min-width: 640px) 768px, 100vw" />
              </div>

              <div className="space-y-12 px-5 pb-16 sm:px-8">
                <header data-dialog-in>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-[0.7rem] tracking-[0.16em] text-faint uppercase">{project.kind}</p>
                    {project.status ? <Tag tone="accent">{project.status}</Tag> : null}
                  </div>
                  <h2 id="dialog-title" className="mt-3 font-display text-[clamp(2.4rem,6vw,3.75rem)] leading-[0.95] tracking-[-0.01em] text-balance">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{project.summary}</p>
                  <div className="mt-6">
                    <ProjectLinks project={project} size="md" />
                  </div>
                </header>

                {project.metric ? (
                  <div data-dialog-in className="flex items-baseline gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-5">
                    <span className="font-display text-5xl text-accent">{project.metric.value}</span>
                    <span className="text-muted">{project.metric.label}</span>
                  </div>
                ) : null}

                <DialogBlock title="The problem">
                  <p className="text-lg leading-relaxed text-fg/90 text-pretty">{project.problem}</p>
                </DialogBlock>

                <DialogBlock title="What I did">
                  <ul className="divide-y divide-line border-y border-line">
                    {project.contribution.map((c, i) => (
                      <li key={c} className="flex gap-5 py-3.5">
                        <span className="pt-0.5 font-mono text-[0.7rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </DialogBlock>

                <DialogBlock title="Key features">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">
                        {f}
                      </li>
                    ))}
                  </ul>
                </DialogBlock>

                {project.caseStudy ? (
                  <DialogBlock title="What I learned">
                    <p className="font-display text-2xl leading-snug italic text-pretty">{project.caseStudy.learned}</p>
                  </DialogBlock>
                ) : null}

                <DialogBlock title="Built with">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </DialogBlock>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  );
}

function DialogBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-dialog-in>
      <h3 className="mb-4 font-mono text-xs tracking-[0.2em] text-faint uppercase">{title}</h3>
      {children}
    </section>
  );
}
