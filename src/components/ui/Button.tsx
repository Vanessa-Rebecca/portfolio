"use client";

import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-medium tracking-tight transition-[color,border-color,box-shadow] duration-500 ease-out-expo focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_10px_40px_-8px_var(--glow)] hover:text-on-accent",
  ghost: "border border-line-strong text-fg hover:border-accent hover:text-on-accent",
};

/** The fill that wipes up from the bottom on hover. */
function Fill() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 translate-y-[101%] rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
    />
  );
}

type Common = { variant?: Variant; children: ReactNode; magnetic?: boolean; className?: string };

export function ButtonLink({
  variant = "primary",
  children,
  magnetic = true,
  className = "",
  ...rest
}: Common & ComponentProps<"a">) {
  const el = (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Fill />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({
  variant = "primary",
  children,
  magnetic = true,
  className = "",
  ...rest
}: Common & ComponentProps<"button">) {
  const el = (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Fill />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
