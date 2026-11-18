"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Thin accent bar across the top that tracks reading progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
    );
  });
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-accent to-accent-2"
    />
  );
}
