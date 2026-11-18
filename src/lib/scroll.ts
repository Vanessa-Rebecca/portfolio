"use client";

import type Lenis from "lenis";

/**
 * Lenis lives outside React state: components read it when they need it
 * instead of re-rendering whenever it is created.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scrolls to a section id (without "#") or to a pixel offset. */
export function scrollToTarget(target: string | number) {
  const lenis = instance;
  if (typeof target === "number") {
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(target);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: target === "home" ? 0 : -8 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  // Keep the URL shareable without triggering a native jump.
  history.replaceState(null, "", target === "home" ? location.pathname : `#${target}`);
}

export const stopScroll = () => instance?.stop();
export const startScroll = () => instance?.start();
