"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MQ } from "@/lib/gsap";

/**
 * One controller for the whole page's scroll reveals, so sections stay declarative:
 *
 *  - [data-reveal]          fades + rises in when it enters the viewport (batched, staggered)
 *  - [data-reveal="scale"]  a softer scale-in for media
 *  - [data-split]           heading split into masked lines that slide up
 *  - [data-words]           paragraph whose words brighten as you scroll through it
 *
 * Nothing is hidden unless motion is allowed, so reduced-motion users get static content.
 */
export function RevealController() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Generic reveals
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const scaled = items.filter((el) => el.dataset.reveal === "scale");
      if (items.length) gsap.set(items, { autoAlpha: 0, y: 40 });
      if (scaled.length) gsap.set(scaled, { y: 0, scale: 0.94 });

      if (items.length) ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform",
          }),
      });

      // Masked line reveals for headings
      const splits: SplitText[] = [];
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }),
        });
        splits.push(split);
      });

      // Scroll-scrubbed word highlighting for statements
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.18 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
              },
            ),
        });
        splits.push(split);
      });

      // Hand-drawn arrows and squiggles draw themselves as they enter
      gsap.utils.toArray<SVGElement>("[data-draw]").forEach((svg) => {
        gsap.to(svg.querySelectorAll("path"), {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
          stagger: 0.25,
          scrollTrigger: { trigger: svg, start: "top 88%", once: true },
        });
      });

      // Fonts can change line breaks; refresh trigger positions once they're ready.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => splits.forEach((s) => s.revert());
    });

    return () => mm.revert();
  });

  return null;
}
