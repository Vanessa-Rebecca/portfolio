"use client";

import { useRef, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/data/profile";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const noop = () => () => {};

export function Footer({ buildYear }: { buildYear: number }) {
  const root = useRef<HTMLElement>(null);
  // Current year in the browser; build year during prerender
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => buildYear);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-wordmark] span", {
          yPercent: 100,
          duration: 1.4,
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-wordmark]", start: "top 95%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line pt-16 pb-8">
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
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToTarget(0)}
                className="group grid size-11 place-items-center rounded-full bg-fg text-bg transition-colors hover:bg-accent hover:text-on-accent"
              >
                <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
                <span className="sr-only">Back to top</span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Wordmark */}
        <p
          data-wordmark
          aria-hidden
          className="mt-16 overflow-hidden font-display text-[clamp(2.75rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
        >
          <span className="block">
            {profile.firstName} {profile.middleName}
          </span>
          <span className="block text-right italic">{profile.lastName}</span>
        </p>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{year}</span> {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, GSAP and Lenis.</p>
        </div>
      </div>
    </footer>
  );
}
