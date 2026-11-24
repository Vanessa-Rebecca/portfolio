import Image from "next/image";
import { profile } from "@/data/profile";
import { HandArrow, HandNote } from "@/components/ui/Scribble";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

/**
 * Layered portrait for the hero. All motion is driven by Hero's timeline:
 *  - [data-hero-frame]  arch frame wiped open with clip-path
 *  - [data-hero-photo]  image settles from a slight zoom
 *  - [data-depth]       wrappers that follow the pointer by different amounts
 *  - [data-hero-float]  decorations that pop in after the frame
 *  - [data-hero-bob]    labels that drift gently
 */

const labels = [
  { text: "<Next.js />", pos: "top-[10%] -right-3 sm:-right-8", depth: 0.6, hide: "" },
  { text: "model.fit(X, y)", pos: "top-[46%] -left-6 sm:-left-14", depth: 0.9, hide: "hidden sm:block" },
  { text: "SELECT * FROM ideas;", pos: "top-[66%] -right-4 sm:-right-12", depth: 0.45, hide: "hidden md:block" },
];

export function HeroPortrait({ roles }: { roles: readonly string[] }) {
  return (
    <div className="relative mx-auto w-[min(78%,19rem)] sm:w-[min(70%,22rem)] lg:w-[min(100%,calc(60svh*0.8),26rem)]">
      {/* Offset outline echoing the frame */}
      <div data-depth="0.25" aria-hidden className="absolute inset-0 -z-10">
        <div data-hero-float className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] border border-accent/40" />
      </div>

      {/* Frame */}
      <div
        data-hero-frame
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line-strong bg-bg-elev shadow-[0_40px_100px_-40px_var(--glow)]"
      >
        <Image
          data-hero-photo
          src={profile.photo.src}
          alt={profile.photo.alt}
          fill
          priority
          sizes="(min-width: 1024px) 26rem, 78vw"
          className="object-cover object-[50%_18%]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      {/* Handwritten hello */}
      <div data-depth="0.7" aria-hidden className="absolute -top-2 -left-4 hidden sm:block lg:-left-24 lg:top-2">
        <div data-hero-float className="flex flex-col items-start">
          <HandNote className="-rotate-6 text-2xl lg:text-[1.7rem]">hi, that&apos;s me!</HandNote>
          <HandArrow draw="hero" shape="curve" className="mt-1 ml-8 h-12 w-20 text-accent" />
        </div>
      </div>

      {/* Floating technical labels */}
      {labels.map((l) => (
        <div key={l.text} data-depth={l.depth} aria-hidden className={`absolute ${l.pos} ${l.hide}`}>
          <span
            data-hero-float
            data-hero-bob
            className="block rounded-full border border-line-strong bg-bg-elev/85 px-3 py-1.5 font-mono text-[0.7rem] whitespace-nowrap text-muted shadow-lg backdrop-blur-md"
          >
            {l.text}
          </span>
        </div>
      ))}

      {/* Rotating badge */}
      <div data-depth="0.35" className="absolute bottom-[10%] -left-6 sm:-left-12">
        <div data-hero-float>
          <RotatingBadge
            id="hero-badge-path"
            text={`SOFTWARE ENGINEER • ${profile.location.toUpperCase()} • `}
            className="size-20 sm:size-28"
          >
            <span className="font-display text-xl text-accent italic sm:text-2xl">✦</span>
          </RotatingBadge>
        </div>
      </div>

      {/* Currently */}
      <div data-depth="0.5" className="absolute -right-2 -bottom-5 sm:-right-6">
        <div
          data-hero-float
          className="rounded-2xl border border-line-strong bg-bg-elev/90 px-4 py-2.5 shadow-xl backdrop-blur-md"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-faint uppercase">Currently</p>
          <p className="mt-0.5 text-sm font-medium sm:text-base" aria-label={roles.join(", ")}>
            <span aria-hidden className="relative inline-block h-[1.3em] overflow-hidden align-bottom">
              <span data-role-track className="flex flex-col">
                {roles.map((r) => (
                  <span data-role key={r} className="block h-[1.3em] leading-[1.3em] whitespace-nowrap">
                    {r}
                  </span>
                ))}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
