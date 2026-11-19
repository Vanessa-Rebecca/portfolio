import type { ReactNode } from "react";

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide whitespace-nowrap ${
        tone === "accent"
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-line bg-surface text-muted"
      }`}
    >
      {children}
    </span>
  );
}
