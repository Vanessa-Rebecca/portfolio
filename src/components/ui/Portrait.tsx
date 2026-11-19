"use client";

import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Portrait with a clip-path reveal when it enters the viewport and a gentle
 * scroll parallax inside its frame. Static for reduced motion.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-portrait-frame]",
          { clipPath: "inset(100% 0% 0% 0% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          "[data-portrait-img]",
          { scale: 1.25 },
          { scale: 1.08, duration: 2, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%", once: true } },
        );
        gsap.fromTo(
          "[data-portrait-img]",
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <figure ref={root} className={`group relative ${className}`}>
      <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-accent-2/20 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      <div
        data-portrait-frame
        className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line-strong bg-bg-elev"
      >
        <Image
          data-portrait-img
          src={profile.photo.src}
          alt={profile.photo.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover object-[50%_20%] transition-[filter] duration-700 will-change-transform"
          priority={false}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs text-white backdrop-blur-md">
          <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" aria-hidden />
          {profile.availability}
        </span>
      </div>
    </figure>
  );
}
