"use client";

import { useRef } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { aiTraining, pipeline } from "@/data/training";
import { mlStudies, projects } from "@/data/projects";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { openProject } from "@/lib/projectDialog";

const caseStudies = projects.filter((p) => p.category === "ai" && p.caseStudy);

export function AIML() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the pipeline and scroll it sideways, lighting up each stage.
      mm.add(MQ.desktop, () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;
        const distance = () => track.scrollWidth - pin.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.fromTo(
          "[data-pipe-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: pin, start: "center center", end: () => `+=${distance()}`, scrub: 0.8 } },
        );

        gsap.utils.toArray<HTMLElement>("[data-pipe-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            containerAnimation: tween,
            start: "left 70%",
            end: "right 30%",
            toggleClass: { targets: step, className: "is-active" },
          });
        });
      });

      // Everywhere with motion: case studies cascade in
      mm.add(MQ.motion, () => {
        gsap.from("[data-case]", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          scrollTrigger: { trigger: "[data-cases]", start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="ai-ml" aria-labelledby="ai-title" className="relative isolate overflow-clip py-28 sm:py-36">
      {/* Atmosphere: a darker, technical band */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
        <div className="absolute top-[10%] left-[-10%] size-[36rem] rounded-full bg-accent-2/10 blur-[150px]" />
        <div className="absolute right-[-10%] bottom-[10%] size-[32rem] rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <div className="container-x">
        <SectionHeading
          id="ai-title"
          index="05"
          label="AI / ML"
          title={
            <>
              Teaching software to <em className="text-accent-2">see patterns</em>.
            </>
          }
          intro="I'm a software engineer with formal AI and machine learning training — not a research scientist. I use ML where it solves a real problem, and I care as much about clean data and honest evaluation as about the model."
        />

        {/* Training */}
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20">
          {aiTraining.map((t) => (
            <li
              key={t.issuer}
              data-reveal
              className="relative overflow-hidden rounded-3xl border border-line bg-bg-elev/70 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <Award className="size-6 text-accent-2" strokeWidth={1.5} aria-hidden />
                <span className="font-mono text-xs text-faint">{t.date}</span>
              </div>
              <p className="mt-6 font-display text-3xl leading-tight">{t.issuer}</p>
              <p className="mt-1 text-sm text-muted">{t.title}</p>
              {t.note ? <p className="mt-4 text-sm leading-relaxed text-muted">{t.note}</p> : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Pipeline */}
      <div className="mt-24 lg:mt-32">
        <div ref={pinRef} className="pin:flex pin:h-[100svh] pin:flex-col pin:justify-center">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p data-reveal className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
                  How I work through an ML problem
                </p>
                <h3 data-split className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none">
                  From raw data to something <em className="text-accent-2">people can use</em>.
                </h3>
              </div>
              <p data-reveal className="hidden font-mono text-xs text-faint pin:block">
                {pipeline.length} stages · keep scrolling →
              </p>
            </div>
            <div aria-hidden className="relative mt-10 mb-10 hidden h-px bg-line pin:block">
              <div data-pipe-progress className="absolute inset-0 origin-left bg-gradient-to-r from-accent-2 to-accent" />
            </div>
          </div>

          <div className="pin:overflow-visible">
            <ol
              ref={trackRef}
              className="container-x mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pin:mt-0 pin:flex pin:w-max pin:max-w-none pin:gap-6 pin:pr-[30vw]"
            >
              {pipeline.map((p, i) => (
                <li
                  key={p.step}
                  data-pipe-step
                  className="group/step relative flex flex-col rounded-3xl border border-line bg-bg-elev/80 p-6 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-700 sm:p-8 pin:w-[26rem] pin:shrink-0 pin:opacity-60 pin:[&.is-active]:border-accent-2/60 pin:[&.is-active]:opacity-100 pin:[&.is-active]:shadow-[0_30px_80px_-40px_var(--accent-2)] pin:transition-[border-color,opacity,box-shadow]"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-6xl leading-none text-faint transition-colors duration-700 group-[.is-active]/step:text-accent-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{p.step}</span>
                  </div>
                  <p className="mt-10 text-2xl font-medium tracking-tight">{p.title}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.techniques.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Case studies */}
      <div className="container-x mt-24 lg:mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 data-split className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none">
            Case studies
          </h3>
          <p data-reveal className="max-w-md text-muted">
            The challenge in each project, and the lesson I took from it.
          </p>
        </div>

        <ul data-cases className="mt-10 grid gap-5 md:grid-cols-2">
          {caseStudies.map((p, i) => (
            <li key={p.slug} data-case>
              <button
                type="button"
                onClick={() => openProject(p.slug)}
                data-cursor="Open"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg-elev/80 p-6 text-left backdrop-blur-sm transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent-2/50 sm:p-8"
              >
                <span
                  aria-hidden
                  className="absolute -right-4 -bottom-10 font-display text-[10rem] leading-none text-fg/[0.04] transition-colors duration-700 group-hover:text-accent-2/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.7rem] tracking-[0.16em] text-faint uppercase">{p.kind}</span>
                <span className="mt-3 flex items-start justify-between gap-4">
                  <span className="text-2xl font-medium tracking-tight">{p.title}</span>
                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-2"
                    aria-hidden
                  />
                </span>

                <span className="relative mt-6 grid gap-5">
                  <span>
                    <span className="block font-mono text-[0.65rem] tracking-[0.2em] text-accent-2 uppercase">Challenge</span>
                    <span className="mt-1.5 block leading-relaxed text-muted">{p.caseStudy?.challenge}</span>
                  </span>
                  <span>
                    <span className="block font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">What I learned</span>
                    <span className="mt-1.5 block leading-relaxed text-fg/90">{p.caseStudy?.learned}</span>
                  </span>
                </span>

                {p.metric ? (
                  <span className="relative mt-6 inline-flex w-fit items-baseline gap-2 rounded-xl border border-accent/30 bg-accent-soft px-3 py-1.5">
                    <span className="font-display text-xl text-accent">{p.metric.value}</span>
                    <span className="text-xs text-muted">{p.metric.label}</span>
                  </span>
                ) : null}

                <span className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
                  {p.stack.slice(0, 4).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </span>
                <span className="sr-only">Open the full case study</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Also explored */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Also explored</p>
            <p className="mt-3 text-muted">Shorter studies from my training programmes.</p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {mlStudies.map((s) => (
              <li key={s.title} className="bg-bg-elev p-6 transition-colors duration-300 hover:bg-surface-strong">
                <p className="font-medium">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
                <p className="mt-4 font-mono text-xs text-faint">{s.stack}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
