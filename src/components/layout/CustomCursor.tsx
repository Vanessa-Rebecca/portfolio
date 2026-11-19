"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * A soft ring that trails the (still visible) native cursor on desktop.
 * It grows over links/buttons and shows a label over elements with [data-cursor="Label"].
 * Purely decorative: pointer-events none, hidden for touch and reduced motion.
 * GSAP handles position; CSS transitions handle the theme-aware visual states.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;
    const mm = gsap.matchMedia();

    mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
      gsap.set(ring, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        xTo(e.clientX);
        yTo(e.clientY);
        ring.dataset.visible = "true";

        const target = e.target as Element | null;
        const labelled = target?.closest<HTMLElement>("[data-cursor]");
        const interactive = target?.closest("a, button, [role='tab'], summary, label");
        const state = labelled ? "label" : interactive ? "hover" : "idle";
        if (ring.dataset.state !== state) ring.dataset.state = state;
        if (labelled) label.textContent = labelled.dataset.cursor ?? "";
      };
      const leave = () => (ring.dataset.visible = "false");
      const down = () => (ring.dataset.pressed = "true");
      const up = () => (ring.dataset.pressed = "false");

      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      return () => {
        ring.dataset.visible = "false";
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={ringRef}
      aria-hidden
      data-visible="false"
      data-state="idle"
      data-pressed="false"
      className="group/cursor pointer-events-none fixed top-0 left-0 z-[80] hidden opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div className="grid size-8 place-items-center rounded-full border border-line-strong transition-[width,height,background-color,border-color,scale] duration-500 ease-out-expo group-data-[pressed=true]/cursor:scale-90 group-data-[state=hover]/cursor:size-14 group-data-[state=hover]/cursor:border-accent group-data-[state=hover]/cursor:bg-accent-soft group-data-[state=label]/cursor:size-24 group-data-[state=label]/cursor:border-accent group-data-[state=label]/cursor:bg-accent">
        <span
          ref={labelRef}
          className="scale-50 font-mono text-[0.65rem] font-medium tracking-[0.15em] text-on-accent uppercase opacity-0 transition-[opacity,scale] duration-300 group-data-[state=label]/cursor:scale-100 group-data-[state=label]/cursor:opacity-100"
        />
      </div>
    </div>
  );
}
