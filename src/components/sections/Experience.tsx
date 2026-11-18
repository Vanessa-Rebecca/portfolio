"use client";

import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { openProject } from "@/lib/projectDialog";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Progress rail fills as you read through the roles
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-roles]", start: "top 70%", end: "bottom 70%", scrub: 0.5 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-role-item]").forEach((role) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: role, start: "top 78%", once: true } });
          tl.from(role.querySelector("[data-role-rule]"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.inOut",
          })
            .from(role.querySelector("[data-role-dot]"), { scale: 0, duration: 0.8, ease: "back.out(3)" }, 0.2)
            .from(role.querySelectorAll("[data-role-in]"), { y: 30, autoAlpha: 0, stagger: 0.07, duration: 1 }, 0.3)
            .from(role.querySelectorAll("[data-highlight]"), { x: -20, autoAlpha: 0, stagger: 0.06, duration: 0.9 }, 0.5);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title={
            <>
              Building software that people <em className="text-accent">rely on</em>.
            </>
          }
          intro="Two years on real products: shipping features into live systems, supporting the people who use them, and learning from senior engineers along the way."
        />

        <div data-roles className="relative mt-20 lg:mt-28">
          {/* Progress rail */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[5px] w-px bg-line lg:left-[calc(33.333%-1px)]">
            <div data-rail-fill className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent to-accent-2" />
          </div>

          <ol className="space-y-20 lg:space-y-28">
            {experience.map((job) => (
              <li key={job.company} data-role-item className="relative grid gap-8 pl-8 lg:grid-cols-3 lg:gap-0 lg:pl-0">
                <span
                  data-role-dot
                  aria-hidden
                  className="absolute top-1.5 left-0 size-[11px] rounded-full bg-accent shadow-[0_0_0_6px_var(--accent-soft)] lg:left-[calc(33.333%-6px)]"
                />

                {/* Left: sticky company block */}
                <div className="lg:pr-14">
                  <div className="lg:sticky lg:top-32">
                    <p data-role-in className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                      {job.period}
                    </p>
                    <h3 data-role-in className="mt-4 font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.01em]">
                      {job.company}
                    </h3>
                    <p data-role-in className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="size-3.5" aria-hidden />
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* Right: details */}
                <div className="lg:col-span-2 lg:pl-14">
                  <div data-role-rule aria-hidden className="mb-8 hidden h-px w-full bg-line-strong lg:block" />
                  <p data-role-in className="text-2xl font-medium tracking-tight sm:text-3xl">
                    {job.role}
                  </p>
                  <p data-role-in className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
                    {job.summary}
                  </p>

                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {job.highlights.map((h, i) => (
                      <li
                        key={h}
                        data-highlight
                        className="group flex gap-5 py-4 transition-colors duration-300 hover:bg-surface sm:gap-6"
                      >
                        <span className="pt-1 font-mono text-[0.7rem] text-faint transition-colors duration-300 group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed text-fg/90">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div data-role-in className="mt-8 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>

                  {job.projects?.length ? (
                    <div data-role-in className="mt-8">
                      <p className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Products I&apos;ve worked on</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {job.projects.map((slug) => {
                          const p = getProject(slug);
                          if (!p) return null;
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => openProject(slug)}
                              className="group inline-flex items-center gap-2 rounded-full border border-line-strong py-2 pr-3 pl-4 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent-soft"
                            >
                              {p.title}
                              <ArrowUpRight
                                className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                aria-hidden
                              />
                              <span className="sr-only">— open project details</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
