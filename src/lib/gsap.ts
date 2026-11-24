"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** Shared motion vocabulary so every section moves with the same rhythm. */
export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  pop: "back.out(1.7)",
  draw: "power2.inOut",
} as const;

export const DUR = { fast: 0.5, base: 1, slow: 1.4, reveal: 1.6 } as const;

/** Media queries used with gsap.matchMedia() so every animation respects user preferences. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
