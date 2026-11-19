"use client";

import { useSyncExternalStore } from "react";
import { navLinks, profile } from "@/data/profile";
import { scrollToTarget } from "@/lib/scroll";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const noop = () => () => {};

export function Footer({ buildYear }: { buildYear: number }) {
  // Current year in the browser; build year during prerender
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => buildYear);

  return (
    <footer className="relative border-t border-line pt-16 pb-8">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl">{profile.name}</p>
            <p className="mt-1 text-muted">{profile.role} · {profile.location}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
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
              <li>
                <a href={profile.cvUrl} download={profile.cvFileName} className="text-muted transition-colors hover:text-fg">
                  Download CV
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-start gap-2 md:col-span-3 md:justify-end">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{year}</span> {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, GSAP and Lenis.</p>
        </div>
      </div>
    </footer>
  );
}
