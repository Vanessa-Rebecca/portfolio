"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { navLinks, profile } from "@/data/profile";
import { scrollToTarget } from "@/lib/scroll";

const noop = () => () => {};

const connect = [
  { label: "GitHub", href: profile.socials.github },
  { label: "LinkedIn", href: profile.socials.linkedin },
];

export function Footer({ buildYear }: { buildYear: number }) {
  // Current year in the browser; build year during prerender
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => buildYear);
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-x">
        {/* Identity · Navigate · Connect */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong font-display text-base tracking-[-0.02em] italic">
                {profile.initials}
              </span>
              <div>
                <p className="font-display text-2xl leading-tight">{profile.name}</p>
                <p className="text-sm text-muted">
                  {profile.role} · {profile.location}
                </p>
              </div>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(l.id);
                    }}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {connect.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                  >
                    {c.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                  Email
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </li>
              <li>
                <a href={profile.cvUrl} download={profile.cvFileName} className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                  CV (PDF)
                  <Download className="size-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line py-6 text-center text-xs text-faint">
          <p>
            © <span suppressHydrationWarning>{year}</span> {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
