"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, Mail, X } from "lucide-react";
import { navLinks, profile, type SectionId } from "@/data/profile";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { scrollToTarget, startScroll, stopScroll } from "@/lib/scroll";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Track which section is in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>(`[data-nav="${active}"]`);
      if (!link) return;
      gsap.to(pill, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Blur background once scrolled; hide on scroll down, reveal on scroll up.
  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        header.dataset.scrolled = y > 40 ? "true" : "false";
        const hide = self.direction === 1 && y > window.innerHeight * 0.8;
        gsap.to(header, { yPercent: hide ? -130 : 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
      },
    });
    return () => st.kill();
  });

  // Mobile menu animation
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        if (open) {
          gsap.fromTo(
            menu,
            { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" },
            { clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)", duration: 0.9, ease: "expo.inOut" },
          );
          gsap.from(menu.querySelectorAll("[data-menu-item]"), {
            yPercent: 120,
            opacity: 0,
            stagger: 0.05,
            duration: 0.9,
            delay: 0.25,
          });
        }
      });
      return () => mm.revert();
    },
    { dependencies: [open] },
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    startScroll();
    document.body.style.overflow = "";
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const go = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) closeMenu();
    scrollToTarget(id);
  };

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        className="group/nav fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <nav aria-label="Primary" className="container-x flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={go("home")}
            className="flex items-center gap-3 rounded-full py-1 pr-3"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid size-10 place-items-center rounded-full border border-line-strong bg-bg/60 font-display text-[0.95rem] tracking-[-0.02em] italic backdrop-blur-md">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </a>

          <div className="relative hidden rounded-full border border-line/60 bg-bg/40 p-1 backdrop-blur-xl transition-[background-color,border-color] duration-500 group-data-[scrolled=true]/nav:border-line group-data-[scrolled=true]/nav:bg-bg/75 lg:block">
            <ul ref={listRef} className="relative flex items-center">
              <span
                ref={pillRef}
                aria-hidden
                className="absolute top-0 left-0 h-full rounded-full bg-surface-strong opacity-0"
              />
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    data-nav={l.id}
                    onClick={go(l.id)}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active === l.id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="hidden h-10 items-center gap-1.5 rounded-full border border-line bg-bg/60 px-3.5 text-sm text-muted backdrop-blur-md transition-colors duration-300 hover:border-line-strong hover:text-fg md:inline-flex"
            >
              <Download className="size-4" aria-hidden />
              CV
              <span className="sr-only">— download PDF</span>
            </a>
            <ThemeToggle className="bg-bg/60 backdrop-blur-md" />
            <a
              href="#contact"
              onClick={go("contact")}
              className="hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line bg-bg/60 backdrop-blur-md lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden className="flex w-4 flex-col gap-[5px]">
                <span className="h-px w-full bg-fg" />
                <span className="h-px w-2/3 self-end bg-fg" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-bg-elev lg:hidden"
        >
          <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-accent/25 blur-[120px]" />
          <div className="container-x flex items-center justify-between pt-3 sm:pt-4">
            <span className="grid size-10 place-items-center rounded-full border border-line-strong font-display text-[0.95rem] tracking-[-0.02em] italic">
              {profile.initials}
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="grid size-10 place-items-center rounded-full border border-line"
            >
              <X className="size-5" aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center py-10">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <a
                    data-menu-item
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    aria-current={active === l.id ? "location" : undefined}
                    className="flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.5rem,11vw,4rem)] leading-none"
                  >
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className={active === l.id ? "italic text-accent" : ""}>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-x flex items-center justify-between gap-4 border-t border-line py-6" data-menu-item>
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg"
            >
              <Download className="size-4" aria-hidden />
              Download CV
            </a>
            <div className="flex gap-2">
              <a href={`mailto:${profile.email}`} className="grid size-10 place-items-center rounded-full border border-line" aria-label={`Email ${profile.email}`}>
                <Mail className="size-4" aria-hidden />
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-line" aria-label="GitHub (opens in a new tab)">
                <GithubIcon className="size-4" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-line" aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
