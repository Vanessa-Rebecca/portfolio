import type { ComponentProps, ReactNode } from "react";

/**
 * Hand-drawn accents. Paths use pathLength="1" so CSS/GSAP can "draw" them:
 * mark the svg with data-draw (drawn on scroll by RevealController) or
 * data-hero-draw (drawn by the hero timeline). Without motion they simply show.
 */

type DrawMode = "scroll" | "hero" | "none";

const drawAttr = (mode: DrawMode) =>
  mode === "scroll" ? { "data-draw": "" } : mode === "hero" ? { "data-hero-draw": "" } : {};

const ARROWS = {
  /** gentle curve, pointing down-right */
  curve: { viewBox: "0 0 120 80", d: "M6 10 C 40 0, 86 14, 106 62", head: "M92 58 L107 64 L108 48" },
  /** loop-de-loop, pointing right */
  loop: {
    viewBox: "0 0 140 70",
    d: "M4 40 C 30 10, 60 10, 62 34 C 64 56, 40 58, 44 36 C 50 12, 98 16, 130 34",
    head: "M116 24 L131 35 L115 44",
  },
  /** short swoosh, pointing down */
  down: { viewBox: "0 0 60 90", d: "M10 6 C 40 20, 44 50, 30 82", head: "M20 72 L30 84 L40 72" },
} as const;

export type ArrowShape = keyof typeof ARROWS;

export function HandArrow({
  shape = "curve",
  className = "",
  draw = "scroll",
  flip = false,
}: {
  shape?: ArrowShape;
  className?: string;
  draw?: DrawMode;
  flip?: boolean;
}) {
  const a = ARROWS[shape];
  return (
    <svg
      aria-hidden
      viewBox={a.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${flip ? "-scale-x-100" : ""} ${className}`}
      {...drawAttr(draw)}
    >
      <path d={a.d} pathLength={1} />
      <path d={a.head} pathLength={1} />
    </svg>
  );
}

/** A short handwritten note. Purely decorative unless `as` is used for real content. */
export function HandNote({ children, className = "", ...rest }: ComponentProps<"span">) {
  return (
    <span className={`font-hand leading-none text-accent ${className}`} {...rest}>
      {children}
    </span>
  );
}

/** Hand-drawn underline/scribble that sits under a word. */
export function Squiggle({ className = "", draw = "scroll" }: { className?: string; draw?: DrawMode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
      {...drawAttr(draw)}
    >
      <path d="M3 14 C 40 4, 70 18, 104 9 S 168 4, 197 12" pathLength={1} />
    </svg>
  );
}

/** A slightly rotated "taped-on" note card. */
export function Sticker({
  children,
  className = "",
  tilt = -3,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      style={{ ["--tilt" as string]: `${tilt}deg` }}
      className={`group/sticker relative rotate-[var(--tilt)] rounded-2xl border border-line-strong bg-bg-elev p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out-expo hover:rotate-0 hover:-translate-y-1 ${className}`}
    >
      {/* tape */}
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[4deg] rounded-sm bg-accent/25 backdrop-blur-sm"
      />
      {children}
    </div>
  );
}
