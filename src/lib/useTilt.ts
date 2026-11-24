"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Subtle 3D tilt for every `[data-tilt]` element inside `scope`, following the
 * pointer. Desktop (fine pointer) with motion allowed only — one pair of
 * listeners per element, all cleaned up by gsap.matchMedia.
 *
 * Optional per-element strength: data-tilt="6" (max degrees, default 8).
 * Children with [data-tilt-depth] get a small parallax shift for extra depth.
 */
export function useTilt(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-tilt]", scope.current);
        const cleanups = items.map((el) => {
          const max = Number(el.dataset.tilt) || 8;
          gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
          const depth = gsap.utils.toArray<HTMLElement>("[data-tilt-depth]", el).map((d) => ({
            amount: Number(d.dataset.tiltDepth) || 10,
            x: gsap.quickTo(d, "x", { duration: 0.7, ease: "power3.out" }),
            y: gsap.quickTo(d, "y", { duration: 0.7, ease: "power3.out" }),
          }));

          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ry(nx * max * 2);
            rx(-ny * max * 2);
            depth.forEach((d) => (d.x(nx * d.amount), d.y(ny * d.amount)));
          };
          const leave = () => {
            rx(0);
            ry(0);
            depth.forEach((d) => (d.x(0), d.y(0)));
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });
      return () => mm.revert();
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
