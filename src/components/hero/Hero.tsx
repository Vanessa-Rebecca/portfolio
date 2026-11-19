"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { ButtonLink } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { LocalTime } from "@/components/ui/LocalTime";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const nameSplit = SplitText.create("[data-hero-first]", { type: "chars", mask: "chars" });
        const headSplit = SplitText.create("[data-hero-headline]", { type: "lines", mask: "lines", linesClass: "split-line" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        tl.set("[data-hero]", { autoAlpha: 1 })
          .from("[data-hero-canvas]", { autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 0)
          .from("[data-hero-aurora]", { scale: 0.6, autoAlpha: 0, duration: 2.4, stagger: 0.2 }, 0)
          .from(nameSplit.chars, { yPercent: 115, duration: 1.4, stagger: 0.045 }, 0.1)
          .from("[data-hero-last]", { yPercent: 110, duration: 1.6 }, 0.35)
          .from("[data-hero-meta]", { y: 16, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.5)
          .from(headSplit.lines, { yPercent: 105, duration: 1.2, stagger: 0.08 }, 0.7)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.9)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.inOut" }, 0.4);

        // Slow drifting aurora
        gsap.to("[data-hero-aurora]", {
          x: "random(-60, 60)",
          y: "random(-40, 40)",
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          stagger: 1.5,
        });

        // Parallax out as the hero scrolls away
        gsap.to("[data-hero-name]", {
          yPercent: -30,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-canvas]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Rolling role words
        const roles = gsap.utils.toArray<HTMLElement>("[data-role]");
        const roll = gsap.timeline({ repeat: -1, delay: 2 });
        roles.forEach((_, i) => {
          if (i === 0) return;
          roll.to("[data-role-track]", { y: `${-1.3 * i}em`, duration: 0.9, ease: "expo.inOut" }, "+=1.8");
        });
        roll.to("[data-role-track]", { y: 0, duration: 0.9, ease: "expo.inOut" }, "+=1.8");

        return () => {
          nameSplit.revert();
          headSplit.revert();
        };
      });

      mm.add(MQ.reduced, () => {
        gsap.set("[data-hero]", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const roles = profile.hero.roles;

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-hero-aurora
          className="absolute top-[8%] left-[55%] size-[38rem] rounded-full bg-accent/25 blur-[140px] dark:bg-accent/20"
        />
        <div
          data-hero-aurora
          className="absolute top-[45%] left-[-10%] size-[30rem] rounded-full bg-accent-2/15 blur-[140px] dark:bg-accent-2/10"
        />
        <div
          data-hero-canvas
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_60%_45%,black_30%,transparent_78%)]"
        >
          <HeroCanvas />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x relative flex flex-1 flex-col pt-24 pb-8 sm:pt-28 lg:pt-32">
        {/* Meta row */}
        <div data-hero className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase sm:text-xs">
          <p data-hero-meta className="flex items-center gap-3">
            <span className="text-accent">●</span> {profile.role} — {profile.location}
          </p>
          <p data-hero-meta className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 normal-case tracking-normal backdrop-blur-sm">
              <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" aria-hidden />
              {profile.availability}
            </span>
            <LocalTime className="hidden sm:inline" />
          </p>
        </div>

        <div data-hero-rule data-hero className="mt-6 h-px w-full bg-line" aria-hidden />

        {/* Name */}
        <h1
          id="hero-title"
          data-hero
          data-hero-name
          className="mt-8 flex flex-col leading-[0.82] select-none sm:mt-10"
        >
          <span data-hero-first className="block text-[clamp(4rem,min(16vw,20svh),14rem)] font-semibold tracking-[-0.055em]">
            {profile.firstName}
          </span>
          <span className="block self-end overflow-hidden pr-[0.12em] pb-[0.06em]">
            <span
              data-hero-last
              className="block font-display text-[clamp(3rem,min(11.5vw,17svh),11rem)] tracking-[-0.02em] italic"
            >
              <span className="text-fg/85">{profile.middleName}</span>{" "}
              <span className="text-gradient">{profile.lastName}</span>
            </span>
          </span>
          <span className="sr-only">, {profile.role}</span>
        </h1>

        {/* Bottom row */}
        <div className="mt-auto grid gap-10 pt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7" data-hero>
            <p
              data-hero-headline
              className="max-w-[22ch] font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.01em] text-balance"
            >
              {profile.hero.headline}
            </p>
            <p data-hero-fade className="mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {profile.hero.intro}
            </p>

            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("work");
                }}
              >
                Explore my work
                <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
              </ButtonLink>
              <ButtonLink
                variant="ghost"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("contact");
                }}
              >
                Let&apos;s connect
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
              </ButtonLink>
              <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="grid size-12 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-fg"
              >
                <GithubIcon className="size-[18px]" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="grid size-12 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-fg"
              >
                <LinkedinIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          <div data-hero className="flex items-end justify-between gap-6 lg:col-span-5 lg:flex-col lg:items-end">
            <div data-hero-fade className="text-right">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Currently</p>
              <p className="mt-2 text-lg sm:text-xl" aria-label={roles.join(", ")}>
                <span aria-hidden className="relative inline-block h-[1.3em] overflow-hidden align-bottom">
                  <span data-role-track className="flex flex-col">
                    {roles.map((r) => (
                      <span data-role key={r} className="block h-[1.3em] leading-[1.3em] whitespace-nowrap">
                        {r}
                      </span>
                    ))}
                  </span>
                </span>
              </p>
            </div>

            <a
              data-hero-fade
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("about");
              }}
              className="group flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg"
            >
              Scroll
              <span aria-hidden className="relative h-12 w-px overflow-hidden bg-line">
                <span className="scroll-line absolute inset-0 bg-accent" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
