import type { ReactNode } from "react";

const R = 38;
const CIRC = 2 * Math.PI * R;

/**
 * Circular text badge. Rotation is driven from outside (e.g. scroll-linked via
 * the [data-badge-spin] hook) so it never spins on its own.
 */
export function RotatingBadge({
  text,
  id,
  children,
  className = "",
}: {
  text: string;
  /** Unique id for the text path. */
  id: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden className={`relative grid place-items-center rounded-full border border-line-strong bg-bg-elev/85 backdrop-blur-md ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-muted" data-badge-spin>
        <defs>
          <path id={id} d={`M50,50 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`} />
        </defs>
        <text fontSize="8.4" fontFamily="var(--font-mono)" fill="currentColor" letterSpacing="1">
          <textPath href={`#${id}`} textLength={CIRC - 2} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative">{children}</span>
    </div>
  );
}
