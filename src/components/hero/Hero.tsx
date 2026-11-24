"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, SplitText, useGSAP, MQ, EASE } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { onIntroReveal } from "@/lib/intro";
import { ButtonLink } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { LocalTime } from "@/components/ui/LocalTime";
import { Squiggle } from "@/components/ui/Scribble";
import { HeroCanvas } from "./HeroCanvas";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const nameSplit = SplitText.create("[data-hero-first]", { type: "chars", mask: "chars" });
        const headSplit = SplitText.create("[data-hero-headline]", { type: "lines", mask: "lines", linesClass: "split-line" });

        // Entrance — choreographed so text leads and the portrait answers
        const tl = gsap.timeline({ defaults: { ease: EASE.out }, delay: 0.1, paused: true });
        tl.set("[data-hero]", { autoAlpha: 1 })
          .from("[data-hero-canvas]", { autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 0)
          .from("[data-hero-aurora]", { scale: 0.6, autoAlpha: 0, duration: 2.4, stagger: 0.2 }, 0)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: EASE.inOut }, 0.2)
          .from("[data-hero-meta]", { y: 16, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.3)
          .from(nameSplit.chars, { yPercent: 115, duration: 1.3, stagger: 0.04 }, 0.15)
          .from("[data-hero-last]", { yPercent: 110, duration: 1.5 }, 0.4)
          .fromTo(
            "[data-hero-frame]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: EASE.inOut, clearProps: "clipPath" },
            0.35,
          )
          .fromTo("[data-hero-photo]", { scale: 1.3 }, { scale: 1.06, duration: 2.2 }, 0.35)
          .from(headSplit.lines, { yPercent: 105, duration: 1.2, stagger: 0.08 }, 0.75)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.95)
          .from("[data-hero-float]", { autoAlpha: 0, y: 24, scale: 0.85, duration: 1, stagger: 0.09, ease: EASE.pop }, 1.15)
          .to("[data-hero-draw] path", { strokeDashoffset: 0, duration: 1, ease: EASE.draw, stagger: 0.25 }, 1.6);

        // Technical labels drift gently once they've landed
        gsap.to("[data-hero-bob]", {
          yPercent: -18,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.7, from: "random" },
          delay: 2.4,
        });

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

        // Scroll: name and portrait move at different speeds, badge turns
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-name]", { yPercent: -30, autoAlpha: 0.15, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-canvas]", { yPercent: 20, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-portrait]", { yPercent: -12, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-photo]", { yPercent: 8, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-badge-spin]", { rotation: 300, ease: "none", transformOrigin: "50% 50%", scrollTrigger: { ...scrub, scrub: 1 } });

        // Rolling role words
        const roles = gsap.utils.toArray<HTMLElement>("[data-role]");
        const roll = gsap.timeline({ repeat: -1, delay: 2.5 });
        roles.forEach((_, i) => {
          if (i === 0) return;
          roll.to("[data-role-track]", { y: `${-1.3 * i}em`, duration: 0.9, ease: EASE.inOut }, "+=1.8");
        });
        roll.to("[data-role-track]", { y: 0, duration: 0.9, ease: EASE.inOut }, "+=1.8");

        const offReveal = onIntroReveal(() => tl.play());

        return () => {
          offReveal();
          nameSplit.revert();
          headSplit.revert();
        };
      });

      // Desktop pointer: layered decorations follow the cursor at different depths
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const section = root.current;
        if (!section) return;
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth) || 0.3,
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: EASE.soft }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: EASE.soft }),
        }));
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => {
            l.x(nx * 40 * l.depth);
            l.y(ny * 30 * l.depth);
          });
        };
        const leave = () => layers.forEach((l) => (l.x(0), l.y(0)));
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerleave", leave);
        return () => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", leave);
        };
      });

      mm.add(MQ.reduced, () => {
        gsap.set("[data-hero]", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

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

      <div className="container-x relative flex flex-1 flex-col pt-24 pb-10 sm:pt-28 lg:pt-28">
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

        <div className="grid flex-1 items-center gap-x-10 gap-y-12 pt-10 lg:grid-cols-12 lg:pt-6">
          {/* Name */}
          <h1
            id="hero-title"
            data-hero
            data-hero-name
            className="flex flex-col leading-[0.84] select-none lg:col-span-7 lg:row-start-1 lg:self-end"
          >
            <span data-hero-first className="block text-[clamp(3.75rem,min(13vw,15svh),10rem)] font-semibold tracking-[-0.055em]">
              {profile.firstName}
            </span>{" "}
            <span className="block overflow-hidden pr-[0.12em] pb-[0.06em] pl-[8%]">
              <span
                data-hero-last
                className="block font-display text-[clamp(2.75rem,min(9.6vw,11.5svh),7.5rem)] tracking-[-0.02em] italic"
              >
                <span className="text-fg/85">{profile.middleName}</span>{" "}
                <span className="text-gradient">{profile.lastName}</span>
              </span>
            </span>
            <span className="sr-only">, {profile.role}</span>
          </h1>

          {/* Portrait composition */}
          <div data-hero data-hero-portrait className="lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:pt-4">
            <HeroPortrait roles={profile.hero.roles} />
          </div>

          {/* Headline, intro, actions */}
          <div className="lg:col-span-7 lg:row-start-2 lg:self-start" data-hero>
            <p
              data-hero-headline
              className="max-w-[24ch] font-display text-[clamp(1.7rem,2.9vw,2.6rem)] leading-[1.08] tracking-[-0.01em] text-balance"
            >
              {profile.hero.headlineLead}{" "}
              <span className="relative inline-block whitespace-nowrap italic">
                {profile.hero.headlineEmphasis}
                <Squiggle draw="hero" className="pointer-events-none absolute -bottom-[0.2em] left-0 h-[0.32em] w-full text-accent" />
              </span>
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
        </div>
      </div>

      {/* Scroll cue */}
      <a
        data-hero
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("about");
        }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] text-muted uppercase transition-colors hover:text-fg lg:flex"
      >
        Scroll
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-line absolute inset-0 bg-accent" />
        </span>
      </a>
    </section>
  );
}
