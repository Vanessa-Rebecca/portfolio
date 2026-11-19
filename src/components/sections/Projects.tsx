"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { galleryProjects, otherWork } from "@/data/projects";
import { profile } from "@/data/profile";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { openProject } from "@/lib/projectDialog";
import { GithubIcon } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Tag";

export function Projects() {
  const root = useRef<HTMLElement>(null);

  // Cards rise in, staggered, as each row scrolls into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        ScrollTrigger.batch("[data-gallery-card]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.from(batch, { y: 50, autoAlpha: 0, duration: 1.1, stagger: 0.1 }),
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
          intro="Company systems I've helped build, services I designed end-to-end, and a machine learning capstone. Open any project for the full case study."
        />

        {/* Gallery */}
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {galleryProjects.map((p) => (
            <li key={p.slug} data-gallery-card>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>

        {/* Also built */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Also built</p>
            <p className="mt-3 text-muted">Client work, personal projects and earlier work.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {otherWork.map((w) => (
              <li key={w.title} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="sm:flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {w.title}
                    {w.status ? <Tag tone="accent">{w.status}</Tag> : null}
                  </p>
                  <p className="mt-1 text-sm text-muted">{w.detail}</p>
                  <p className="mt-1.5 font-mono text-xs text-faint">{w.stack}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {w.links?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-fg px-3 py-1.5 text-xs text-bg transition-colors hover:bg-accent hover:text-on-accent"
                    >
                      {l.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                  {w.href ? (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-accent hover:bg-accent-soft"
                    >
                      <GithubIcon className="size-3.5" />
                      Code
                      <span className="sr-only">for {w.title} on GitHub (opens in a new tab)</span>
                    </a>
                  ) : null}
                  {w.slug ? (
                    <button
                      type="button"
                      onClick={() => openProject(w.slug!)}
                      className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
                    >
                      Case study
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">: {w.title}</span>
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
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
