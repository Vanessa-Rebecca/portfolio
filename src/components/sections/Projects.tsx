"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { otherWork, projects, type ProjectCategory } from "@/data/projects";
import { profile } from "@/data/profile";
import { Flip, gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/Icons";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "product", label: "Product & Web" },
  { id: "ai", label: "AI & ML" },
];

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.category === f).length);

  const choose = (f: Filter) => {
    if (f === filter) return;
    if (gridRef.current && window.matchMedia(MQ.motion).matches) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip-card]"));
    }
    setFilter(f);
  };

  // Animate between layouts after React applies the new filter
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !gridRef.current) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.8,
      ease: "expo.inOut",
      scale: true,
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  // Cards rise in on first scroll into view, with a little parallax on the previews
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        ScrollTrigger.batch("[data-flip-card]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.from(batch, { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.1 }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="04"
          label="Selected work"
          title={
            <>
              Products, systems and <em className="text-accent">experiments</em>.
            </>
          }
          intro="Company systems I've helped build, services I designed end-to-end, and machine learning projects from my AI training. Open any project for the full case study."
        />

        {/* Filters */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 lg:mt-20">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const on = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(f.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    on ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg"
                  }`}
                >
                  {f.label}
                  <span className={`font-mono text-[0.7rem] ${on ? "text-bg/60" : "text-faint"}`}>{count(f.id)}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            Showing {count(filter)} project{count(filter) === 1 ? "" : "s"}
          </p>
        </div>

        {/* Gallery */}
        <ul ref={gridRef} className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {projects.map((p) => {
            const visible = filter === "all" || p.category === filter;
            return (
              <li
                key={p.slug}
                data-flip-id={p.slug}
                data-flip-card
                className={`${visible ? "" : "hidden"} ${p.featured ? "md:col-span-2" : ""}`}
              >
                <ProjectCard project={p} featured={p.featured} />
              </li>
            );
          })}
        </ul>

        {/* More work */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Also built</p>
            <p className="mt-3 text-muted">Smaller projects and earlier work.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {otherWork.map((w) => {
              const inner = (
                <>
                  <span className="font-medium">{w.title}</span>
                  <span className="text-sm text-muted sm:flex-1">{w.detail}</span>
                  <span className="font-mono text-xs text-faint">{w.stack}</span>
                </>
              );
              return (
                <li key={w.title}>
                  {w.href ? (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-center sm:gap-6"
                    >
                      {inner}
                      <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
                      <span className="sr-only">(opens on GitHub in a new tab)</span>
                    </a>
                  ) : (
                    <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-6">
                      {inner}
                      <span className="size-4" aria-hidden />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex justify-center" data-reveal>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent-soft"
          >
            <GithubIcon className="size-4" />
            More on GitHub
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
