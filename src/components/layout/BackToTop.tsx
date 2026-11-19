"use client";

import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { Magnetic } from "@/components/ui/Magnetic";

const R = 22;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * Floating "back to top" button, available everywhere once the visitor has
 * scrolled past the hero. The ring around it shows reading progress.
 * When hidden it uses `visibility: hidden`, so it also leaves the tab order.
 */
export function BackToTop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - self.progress));
        const show = self.scroll() > window.innerHeight * 0.8;
        if ((wrap.dataset.visible === "true") !== show) wrap.dataset.visible = String(show);
      },
    });
    return () => st.kill();
  });

  return (
    <div
      ref={wrapRef}
      data-visible="false"
      className="pointer-events-none invisible fixed right-4 bottom-4 z-[45] translate-y-4 opacity-0 transition-[opacity,translate,visibility] duration-500 ease-out-expo data-[visible=true]:pointer-events-auto data-[visible=true]:visible data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 sm:right-6 sm:bottom-6"
    >
      <Magnetic strength={0.3}>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          aria-label="Back to top"
          title="Back to top"
          className="group relative grid size-12 place-items-center rounded-full border border-line bg-bg-elev/80 text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent sm:size-14"
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
            <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" />
            <circle
              ref={ringRef}
              cx="24"
              cy="24"
              r={R}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              className="transition-[stroke] duration-300 group-hover:stroke-[var(--on-accent)]"
            />
          </svg>
          <ArrowUp className="relative size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden />
        </button>
      </Magnetic>
    </div>
  );
}
