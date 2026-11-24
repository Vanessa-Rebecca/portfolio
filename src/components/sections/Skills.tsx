"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon, SkillGlyph } from "@/components/ui/Icons";
import { marqueeIcons, skillCategories, type Skill } from "@/data/skills";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { useTilt } from "@/lib/useTilt";
import { HandArrow, HandNote } from "@/components/ui/Scribble";

/** Brand colours that are too dark to read on the dark theme fall back to the accent. */
function brandColor(skill: Skill) {
  return "brand" in skill.icon ? hexColor(skill.icon.brand.hex) : "var(--accent)";
}

function hexColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.28 ? "var(--accent)" : `#${hex}`;
}

function Marquee() {
  const items = [...marqueeIcons, ...marqueeIcons];
  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center gap-14 pr-14">
        {items.map((s, i) => (
          <span
            key={`${s.name}-${i}`}
            style={{ ["--brand" as string]: hexColor(s.icon.hex) }}
            className="flex items-center gap-3 whitespace-nowrap text-faint transition-colors duration-300 hover:text-[var(--brand)]"
          >
            <BrandIcon icon={s.icon} className="size-6" />
            <span className="font-display text-2xl italic">{s.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const baseId = useId();
  const category = skillCategories[active];
  useTilt(root, [active]);

  /** Small reward for pressing a tile: the logo does a quick flip. */
  const reactTo = (tile: HTMLElement) => {
    if (!window.matchMedia(MQ.motion).matches) return;
    const glyph = tile.querySelector("[data-skill-glyph]");
    if (glyph) gsap.fromTo(glyph, { rotationY: 0 }, { rotationY: 360, duration: 0.9, ease: "power3.out" });
  };

  // Animate tiles whenever the category changes (skipped on first paint — RevealController handles entry).
  const first = useRef(true);
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-skill-tile]", { y: 24, autoAlpha: 0, scale: 0.96, stagger: 0.035, duration: 0.8 });
        gsap.from("[data-skill-blurb]", { y: 12, autoAlpha: 0, duration: 0.7 });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [active] },
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = skillCategories.length - 1;
    const map: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = map[e.key];
    setActive(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  };

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          title={
            <>
              The toolkit I <em className="text-accent">build</em> with.
            </>
          }
          intro="No percentage bars — just the tools I use and where I've used them. Hover a tool to see it light up."
        />
      </div>

      <div className="mt-16 lg:mt-20">
        <Marquee />
      </div>

      <div className="container-x mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        {/* Category tabs */}
        <div className="min-w-0 lg:col-span-4">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:border-t lg:border-line"
          >
            {skillCategories.map((c, i) => {
              const selected = i === active;
              return (
                <button
                  key={c.id}
                  id={`${baseId}-tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className={`group relative flex shrink-0 items-center justify-between gap-6 rounded-full border px-4 py-2.5 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5 ${
                    selected
                      ? "border-accent bg-accent-soft text-fg lg:bg-transparent"
                      : "border-line text-muted hover:text-fg"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`hidden font-mono text-xs lg:inline ${selected ? "text-accent" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium whitespace-nowrap lg:font-display lg:text-[2rem] lg:leading-none lg:font-normal">
                      {c.title}
                    </span>
                  </span>
                  <span
                    className={`font-mono text-xs transition-colors ${selected ? "text-accent" : "text-faint"}`}
                    aria-label={`${c.skills.length} skills`}
                  >
                    {c.skills.length}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute bottom-[-1px] left-0 hidden h-px bg-accent transition-[width] duration-700 ease-out-expo lg:block ${
                      selected ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${category.id}`}
          className="lg:col-span-8"
        >
          <div className="mb-6 flex items-end justify-between gap-6">
            <p data-skill-blurb className="max-w-xl text-lg text-muted">
              {category.blurb}
            </p>
            <div aria-hidden className="relative hidden shrink-0 pr-2 pb-6 md:block">
              <HandNote className="-rotate-6 text-xl text-faint">go on, poke one</HandNote>
              <HandArrow shape="curve" flip className="absolute -bottom-3 left-2 h-8 w-12 rotate-12 text-faint" />
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {category.skills.map((s) => (
              <li
                key={`${category.id}-${s.name}`}
                data-skill-tile
                data-tilt="7"
                onPointerDown={(e) => reactTo(e.currentTarget)}
                style={{ ["--brand" as string]: brandColor(s) }}
                className="group relative isolate flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-[border-color,scale] duration-300 ease-out-expo select-none hover:border-[color-mix(in_oklab,var(--brand)_55%,transparent)] active:scale-[0.97] sm:min-h-40 sm:p-5"
              >
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 -z-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: "var(--brand)" }}
                />
                <span data-tilt-depth="10" data-skill-glyph className="inline-block w-fit">
                  <SkillGlyph
                    icon={s.icon}
                    className="size-7 text-muted transition-[color,scale] duration-500 ease-out-expo group-hover:scale-110 group-hover:text-[var(--brand)]"
                  />
                </span>
                <div className="mt-6">
                  <p className="font-medium tracking-tight">{s.name}</p>
                  <p className="mt-1 text-xs leading-snug text-faint transition-colors duration-300 group-hover:text-muted">
                    {s.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
