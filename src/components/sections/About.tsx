"use client";

import { useRef } from "react";
import { BrainCircuit, GraduationCap, Laptop } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandArrow, HandNote, Sticker } from "@/components/ui/Scribble";
import { profile } from "@/data/profile";
import { milestones } from "@/data/experience";
import { education, aiTraining } from "@/data/training";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const facts = [
  {
    icon: GraduationCap,
    label: "Education",
    title: education.degree,
    lines: [education.school, `${education.period} · ${education.graduated}`, education.honours],
  },
  {
    icon: Laptop,
    label: "Now",
    title: "Software Engineer",
    lines: ["AIBOS Uganda", "Since 2024", "Enterprise web systems"],
  },
  {
    icon: BrainCircuit,
    label: "AI / ML",
    title: aiTraining[0].title,
    lines: [aiTraining[0].issuer, "10X full-tuition scholarship", aiTraining[0].date],
  },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-milestone-line]", {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: { trigger: "[data-milestones]", start: "top 85%", end: "top 45%", scrub: 0.6 },
        });
        gsap.from("[data-milestone]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.12,
          duration: 1,
          scrollTrigger: { trigger: "[data-milestones]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              A software engineer who cares how things <em className="text-accent">feel</em>.
            </>
          }
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <p
            data-words
            className="text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.25] tracking-[-0.015em] text-balance lg:col-span-9 lg:col-start-4"
          >
            I studied Software Engineering at Makerere University, and for the past two years I&apos;ve been
            building the systems a business runs on — HR platforms, recruitment tools and documentation
            generators that real teams use every day.
          </p>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-3 lg:max-w-none">
            <div className="lg:sticky lg:top-28" data-reveal>
              <Sticker tilt={-3}>
                <HandNote className="text-[1.65rem]">Currently learning</HandNote>
                <ul className="mt-4 space-y-3 text-sm leading-snug text-fg/90">
                  {profile.currentlyLearning.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Sticker>
              <div aria-hidden className="mt-6 ml-6 hidden items-start gap-2 lg:flex">
                <HandArrow shape="loop" className="h-10 w-24 text-faint" />
                <HandNote className="mt-4 text-xl text-faint">always learning</HandNote>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted text-pretty lg:col-span-5">
            <p data-reveal>
              Most of my work happens where requirements meet code. I like sitting with the people who&apos;ll
              use a system, understanding what slows them down, and turning that into features that are
              simple to use and dependable to run — from UI/UX and frontend through APIs and PostgreSQL.
            </p>
            <p data-reveal>
              In 2026 I added formal training in artificial intelligence and machine learning through
              Refactory Academy, on a 10X full-tuition scholarship, and the Tech SkillUp Program at Lift
              Horizon Foundation. I&apos;ve since built models for fraud detection, health screening, customer
              segmentation and plant-disease detection.
            </p>
            <p data-reveal>
              I&apos;m not trying to be everything. I&apos;m a software engineer who keeps learning — and who
              wants to build software that is useful, well made and a little bit smarter.
            </p>

            <figure data-reveal className="mt-10 border-l-2 border-accent pl-6">
              <blockquote className="font-display text-3xl leading-tight text-fg italic">
                &ldquo;Good design is non-negotiable.&rdquo;
              </blockquote>
              <figcaption className="mt-2 font-mono text-xs tracking-[0.15em] text-faint uppercase">
                From my GitHub profile
              </figcaption>
            </figure>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {facts.map(({ icon: Icon, label, title, lines }) => (
              <li
                key={label}
                data-reveal
                className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-strong"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/20"
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">{label}</span>
                  <Icon className="size-5 text-accent" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="relative mt-6 text-lg leading-snug font-medium">{title}</p>
                <ul className="relative mt-2 space-y-0.5 text-sm text-muted">
                  {lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Milestones */}
        <div data-milestones className="relative mt-24 lg:mt-32">
          <p className="mb-8 font-mono text-xs tracking-[0.2em] text-muted uppercase" data-reveal>
            The path so far
          </p>
          <div className="relative">
            <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-line md:block">
              <div data-milestone-line className="h-full w-full bg-gradient-to-r from-accent to-accent-2" />
            </div>
            <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:hidden" />
            <ol className="grid gap-8 md:grid-cols-5 md:gap-6">
              {milestones.map((m) => (
                <li key={m.year} data-milestone className="relative flex gap-4 md:block">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1 block size-[15px] shrink-0 rounded-full border-2 border-accent bg-bg md:mt-0"
                  />
                  <div className="md:mt-6">
                    <p className="font-display text-4xl text-accent italic">{m.year}</p>
                    <p className="mt-2 font-medium">{m.title}</p>
                    <p className="mt-1 text-sm text-muted">{m.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
