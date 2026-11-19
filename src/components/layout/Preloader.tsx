"use client";

import { useRef } from "react";
import { profile } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { endIntro, introActive, revealPage } from "@/lib/intro";
import { startScroll } from "@/lib/scroll";

const R = 46;
const CIRCUMFERENCE = 2 * Math.PI * R;
/** Never hold the page longer than this, however slow the network. */
const MAX_WAIT_MS = 4500;

/**
 * Opening screen shown while the site loads.
 * The ring around the monogram fills as the page loads — tied to real signals
 * (fonts + window load), with a minimum
 * duration so it never flickers and a cap so it never blocks.
 * Visibility is controlled by the `intro-active` class on <html> (see layout.tsx),
 * so it never appears without JavaScript, for reduced motion, or twice per session.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !introActive()) return;

      const ring = el.querySelector<SVGCircleElement>("[data-pl-ring]");
      const state = { p: 0 };
      const render = () => {
        if (ring) ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - state.p / 100));
      };

      // Entrance
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from("[data-pl-mono]", { scale: 0.6, autoAlpha: 0, duration: 1.1 })
        .from("[data-pl-name] > span", { yPercent: 110, duration: 1, stagger: 0.08 }, 0.15)
        .from("[data-pl-meta]", { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.06 }, 0.3);

      // Progress: ease toward 90% while the page loads…
      const crawl = gsap.to(state, { p: 90, duration: 1.6, ease: "power2.out", onUpdate: render });

      const loaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });
      const ready = Promise.race([
        Promise.all([loaded, document.fonts?.ready ?? Promise.resolve()]),
        new Promise((r) => setTimeout(r, MAX_WAIT_MS)),
      ]);

      let exit: gsap.core.Timeline | null = null;
      let cancelled = false;

      // …then finish to 100% and lift the curtain.
      Promise.all([ready, crawl.then()]).then(() => {
        if (cancelled) return;
        exit = gsap.timeline();
        exit
          .to(state, { p: 100, duration: 0.45, ease: "power2.inOut", onUpdate: render })
          .to("[data-pl-content]", { yPercent: -12, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
          .to("[data-pl-panel]", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "-=0.25")
          .to("[data-pl-accent]", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "<0.08")
          .call(revealPage, [], "<0.35")
          .call(() => {
            startScroll();
            endIntro();
          });
      });

      return () => {
        cancelled = true;
        exit?.kill();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Accent layer that trails the main panel for a two-tone wipe */}
      <div data-pl-accent className="absolute inset-0 bg-accent" />

      <div data-pl-panel className="absolute inset-0 flex bg-bg">
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

        <div data-pl-content className="container-x relative flex flex-1 flex-col justify-between py-6 sm:py-8">
          {/* Top meta */}
          <div className="flex items-center justify-between gap-4 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase">
            <span data-pl-meta>{profile.role}</span>
            <span data-pl-meta>{profile.location}</span>
          </div>

          {/* Centre: monogram + name */}
          <div className="flex flex-col items-center text-center">
            <div data-pl-mono className="relative grid size-28 place-items-center sm:size-32">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="1" />
                <circle
                  data-pl-ring
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE}
                />
              </svg>
              <span className="font-display text-4xl tracking-[-0.02em] text-gradient italic sm:text-5xl">
                {profile.initials}
              </span>
            </div>

            <p data-pl-name className="mt-8 flex flex-wrap justify-center gap-x-[0.3em] overflow-hidden font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-tight">
              <span className="inline-block">{profile.firstName}</span>
              <span className="inline-block italic">{profile.middleName}</span>
              <span className="inline-block italic text-accent">{profile.lastName}</span>
            </p>
          </div>

          {/* Keeps the name centred between the top row and the bottom edge */}
          <div aria-hidden className="h-4" />
        </div>
      </div>
    </div>
  );
}
