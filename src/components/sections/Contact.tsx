"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { LocalTime } from "@/components/ui/LocalTime";

const channels = [
  {
    label: "LinkedIn",
    value: "vanessa-rebecca-konso",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "Vanessa-Rebecca",
    href: profile.socials.github,
    icon: GithubIcon,
    external: true,
  },
];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.from("[data-contact-big]", {
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.4,
          scrollTrigger: { trigger: "[data-contact-big]", start: "top 85%", once: true },
        });
      });

      // The glow drifts toward the cursor while it's inside the section
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const section = root.current;
        const orb = orbRef.current;
        if (!section || !orb) return;
        const xTo = gsap.quickTo(orb, "x", { duration: 1.6, ease: "power3.out" });
        const yTo = gsap.quickTo(orb, "y", { duration: 1.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.35);
          yTo((e.clientY - r.top - r.height / 2) * 0.35);
        };
        section.addEventListener("pointermove", move);
        return () => section.removeEventListener("pointermove", move);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line py-28 sm:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_65%)] opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="container-x">
        <p data-reveal className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">06</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          Contact
        </p>

        <h2 id="contact-title" className="mt-8 max-w-5xl">
          <span
            data-split
            className="block font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em] text-balance"
          >
            Have an interesting idea or opportunity?
          </span>
          <span
            data-contact-big
            className="mt-2 block font-display text-[clamp(4rem,14vw,12.5rem)] leading-[0.9] tracking-[-0.03em] text-gradient italic"
          >
            Let&apos;s talk.
          </span>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p data-reveal className="max-w-xl text-lg leading-relaxed text-muted text-pretty">
              I&apos;m open to new opportunities and collaborations — software engineering roles and projects,
              especially anything that mixes solid engineering with thoughtful design or a bit of machine
              learning. The quickest way to reach me is email.
            </p>

            {/* Email */}
            <div data-reveal className="mt-10">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Email</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group relative text-[clamp(1.25rem,3vw,2.25rem)] font-medium tracking-tight break-all"
                >
                  {profile.email}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
                  />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </div>

            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`}>
                <Mail className="size-4" aria-hidden />
                Send an email
              </ButtonLink>
              <ButtonLink variant="ghost" href={profile.cvUrl} download={profile.cvFileName}>
                <Download className="size-4" aria-hidden />
                Download CV
                <span className="sr-only">(PDF)</span>
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-line border-y border-line">
              {channels.map(({ label, value, href, icon: Icon }) => (
                <li key={label} data-reveal>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 py-5 transition-colors"
                  >
                    <span className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">{label}</span>
                      <span className="block text-lg">{value}</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                      aria-hidden
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {profile.showPhone ? (
                <li data-reveal>
                  <a href={`tel:${profile.phones[0].replace(/\s/g, "")}`} className="group flex items-center gap-5 py-5">
                    <span className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                      <Phone className="size-5" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Phone</span>
                      <span className="block text-lg">{profile.phones.join(" · ")}</span>
                    </span>
                  </a>
                </li>
              ) : null}
              <li data-reveal className="flex items-center gap-5 py-5">
                <span className="grid size-12 place-items-center rounded-full border border-line">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase">Based in</span>
                  <span className="block text-lg">{profile.location}</span>
                </span>
                <LocalTime className="font-mono text-sm text-muted" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
