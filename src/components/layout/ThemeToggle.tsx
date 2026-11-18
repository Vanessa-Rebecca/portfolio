"use client";

import { useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

/** Theme switch with a circular reveal (View Transitions API) that grows from the button. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const ref = useRef<HTMLButtonElement>(null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const apply = () => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  const toggle = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }
    const r = ref.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : innerWidth / 2;
    const y = r ? r.top + r.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.7, 0, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`relative grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg ${className}`}
    >
      <Sun className="size-[18px] scale-0 rotate-90 transition-transform duration-500 ease-out-expo dark:scale-100 dark:rotate-0" aria-hidden />
      <Moon className="absolute size-[18px] scale-100 rotate-0 transition-transform duration-500 ease-out-expo dark:scale-0 dark:-rotate-90" aria-hidden />
    </button>
  );
}
