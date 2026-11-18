import Image from "next/image";
import type { ReactNode } from "react";
import type { PreviewVariant, Project } from "@/data/projects";

/**
 * Designed, theme-aware interface previews used until real screenshots are added.
 * They are illustrative: no invented numbers, names or results — only structure
 * that reflects what each project actually does.
 */

const Bar = ({ w = "100%", className = "" }: { w?: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-fg/10 ${className}`} style={{ width: w }} />
);

function Window({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-line-strong bg-bg-elev shadow-2xl shadow-black/30 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-fg/15" />
        {title ? (
          <span className="ml-2 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[0.55rem] text-faint">{title}</span>
        ) : null}
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

function Ems() {
  const leave = new Set([3, 4, 5, 11, 17, 18, 24]);
  return (
    <Window title="ems / leave" className="absolute inset-x-[7%] top-[12%] bottom-[-6%]">
      <div className="grid h-full grid-cols-[22%_1fr]">
        <div className="space-y-2.5 border-r border-line p-3">
          {["Dashboard", "Leave", "Projects", "Tasks", "Time"].map((l, i) => (
            <div key={l} className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${i === 1 ? "bg-accent-soft" : ""}`}>
              <span className={`size-1.5 rounded-full ${i === 1 ? "bg-accent" : "bg-fg/20"}`} />
              <span className={`text-[0.55rem] ${i === 1 ? "text-accent" : "text-faint"}`}>{l}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1.5 rounded-lg border border-line p-2">
                <Bar w="40%" />
                <Bar w="70%" className={i === 0 ? "bg-accent/50" : ""} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-line p-2">
            <div className="mb-2 flex justify-between">
              <Bar w="25%" />
              <span className="rounded-full bg-accent px-1.5 text-[0.45rem] text-on-accent">Request leave</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className={`h-[clamp(8px,1.4vw,18px)] rounded-[3px] ${leave.has(i) ? "bg-accent/70" : i % 7 > 4 ? "bg-fg/[0.03]" : "bg-fg/[0.07]"}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {["Approved", "Pending", "Approved"].map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-line px-2 py-1.5">
                <Bar w="35%" />
                <span className={`rounded-full px-1.5 text-[0.45rem] ${s === "Pending" ? "bg-amber-400/15 text-amber-500" : "bg-emerald-400/15 text-emerald-500"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

function Docs() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-4 px-[8%] pt-[10%]">
      <Window title="generator / srs" className="h-[95%] w-[30%] self-start">
        <div className="space-y-2 p-3">
          {["Project", "Stakeholders", "Requirements", "Constraints"].map((l, i) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className={`grid size-3 place-items-center rounded-full text-[0.4rem] ${i < 3 ? "bg-accent text-on-accent" : "border border-line-strong"}`}>
                {i < 3 ? "✓" : ""}
              </span>
              <span className="text-[0.5rem] text-muted">{l}</span>
            </div>
          ))}
          <span className="mt-3 block rounded-md bg-fg py-1 text-center text-[0.5rem] text-bg">Generate</span>
        </div>
      </Window>
      <div className="relative h-full w-[52%] rounded-t-lg border border-b-0 border-line-strong bg-bg-elev p-[5%] shadow-2xl shadow-black/30">
        <p className="font-display text-[0.95rem] leading-tight">Software Requirements Specification</p>
        <div className="mt-3 space-y-3">
          {["1. Introduction", "2. Overall Description", "3. Functional Requirements"].map((h) => (
            <div key={h} className="space-y-1">
              <p className="text-[0.55rem] font-medium text-accent">{h}</p>
              <Bar />
              <Bar w="92%" />
              <Bar w="70%" />
            </div>
          ))}
        </div>
        <div className="absolute -right-3 bottom-6 rotate-6 rounded-lg border border-line-strong bg-bg-elev p-2 shadow-xl">
          <p className="font-mono text-[0.5rem] text-muted">SDD.pdf</p>
        </div>
      </div>
    </div>
  );
}

function Jobs() {
  const cols = [
    { t: "Applied", n: 3 },
    { t: "Review", n: 2 },
    { t: "Interview", n: 2 },
    { t: "Offer", n: 1 },
  ];
  return (
    <Window title="careers / applications" className="absolute inset-x-[7%] top-[12%] bottom-[-6%]">
      <div className="grid h-full grid-cols-4 gap-2 p-3">
        {cols.map((c, ci) => (
          <div key={c.t} className="space-y-2 rounded-lg bg-surface p-2">
            <p className="flex items-center gap-1 text-[0.55rem] font-medium text-muted">
              <span className={`size-1.5 rounded-full ${ci === 3 ? "bg-emerald-500" : ci === 2 ? "bg-accent" : "bg-fg/30"}`} />
              {c.t}
            </p>
            {Array.from({ length: c.n }, (_, i) => (
              <div key={i} className="space-y-1.5 rounded-md border border-line bg-bg-elev p-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-fg/15" />
                  <Bar w="60%" />
                </div>
                <Bar w="80%" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}

function Ledger() {
  const lines: [string, string][] = [
    ["text-faint", "POST /webhooks/payments"],
    ["text-emerald-500", "✓ signature verified · HMAC-SHA256"],
    ["text-emerald-500", "✓ recorded once · idempotency key"],
    ["text-amber-500", "↺ duplicate delivery → ON CONFLICT DO NOTHING"],
    ["text-faint", "$ reconcile --provider statement.csv"],
    ["text-muted", "  matched · mismatched · missing · orphan"],
    ["text-accent", "+ compensating entry appended"],
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-[1.25fr_1fr] gap-3 px-[6%] pt-[10%]">
      <Window title="ledger-service" className="h-[105%]">
        <div className="space-y-1.5 p-3 font-mono text-[0.55rem] leading-relaxed">
          {lines.map(([c, l], i) => (
            <p key={i} className={c}>
              {l}
            </p>
          ))}
        </div>
      </Window>
      <div className="mt-[12%] h-full rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
        <p className="mb-2 font-mono text-[0.5rem] tracking-widest text-faint uppercase">append-only</p>
        {["credit", "debit", "credit", "adjustment"].map((t, i) => (
          <div key={i} className="flex items-center justify-between border-b border-line py-1.5">
            <span className={`text-[0.55rem] ${t === "adjustment" ? "text-accent" : "text-muted"}`}>{t}</span>
            <Bar w="30%" />
          </div>
        ))}
        <p className="mt-2 font-mono text-[0.5rem] text-faint">🔒 no UPDATE · no DELETE</p>
      </div>
    </div>
  );
}

function Ussd() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[6%] px-[8%] pt-[8%]">
      <div className="relative h-[100%] w-[30%] rounded-t-[1.6rem] border-[3px] border-b-0 border-fg/20 bg-bg-elev p-3 pt-6 shadow-2xl shadow-black/30">
        <div className="absolute top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-fg/15" />
        <div className="rounded-lg border border-line bg-surface p-2 font-mono text-[0.55rem] leading-[1.7] text-muted">
          <p className="text-fg">Report a crime</p>
          <p>1. Report an incident</p>
          <p>2. Track my report</p>
          <p>3. Nearby reports</p>
          <p>0. Main menu</p>
          <p className="mt-1 border-t border-line pt-1 text-accent">&gt; 1_</p>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-3 rounded bg-fg/[0.06]" />
          ))}
        </div>
      </div>
      <div className="relative mb-[6%] aspect-square w-[44%] self-center overflow-hidden rounded-xl border border-line-strong bg-bg-elev bg-grid shadow-2xl shadow-black/30">
        <span className="absolute top-1/2 left-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/60 bg-accent/10" />
        <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/30" />
        {[
          [30, 38],
          [62, 60],
          [44, 66],
          [80, 22],
          [15, 75],
          [58, 35],
        ].map(([x, y], i) => (
          <span key={i} className={`absolute size-1.5 rounded-full ${Math.hypot(x - 50, y - 50) < 27 ? "bg-fg" : "bg-fg/25"}`} style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        <p className="absolute bottom-2 left-2 font-mono text-[0.5rem] text-faint">ORDER BY distance</p>
      </div>
    </div>
  );
}

function MockSite({ url, tint, className }: { url: string; tint: string; className: string }) {
  return (
    <Window title={url} className={className}>
      <div className="h-full p-3">
        <div className="flex items-center justify-between">
          <span className={`h-2 w-10 rounded-full ${tint}`} />
          <span className="flex gap-1.5">
            <Bar w="16px" />
            <Bar w="16px" />
            <Bar w="16px" />
          </span>
        </div>
        <div className={`mt-3 flex h-[45%] flex-col justify-end rounded-lg p-2 ${tint}`}>
          <Bar w="55%" className="bg-white/50" />
          <Bar w="35%" className="mt-1 bg-white/30" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md bg-fg/[0.06]" />
          ))}
        </div>
      </div>
    </Window>
  );
}

function Websites() {
  return (
    <div className="absolute inset-0">
      <MockSite url="jamainus.com" tint="bg-accent/60" className="absolute top-[12%] left-[6%] h-[80%] w-[58%]" />
      <MockSite url="cliniquehov.org" tint="bg-accent-2/60" className="absolute top-[24%] right-[6%] h-[80%] w-[44%]" />
    </div>
  );
}

function Freelancer() {
  return (
    <Window title="freelancer-assistant" className="absolute inset-x-[7%] top-[12%] bottom-[-6%]">
      <div className="flex h-full flex-col p-3">
        <div className="flex gap-1.5">
          {["Proposal", "Cover letter", "Invoice", "Contract"].map((t, i) => (
            <span key={t} className={`rounded-full px-2 py-0.5 text-[0.5rem] ${i === 0 ? "bg-fg text-bg" : "border border-line text-faint"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 grid flex-1 grid-cols-[1fr_1.4fr] gap-3">
          <div className="space-y-2 rounded-lg border border-line p-2">
            <p className="text-[0.5rem] text-faint">Client brief</p>
            <Bar />
            <Bar w="80%" />
            <p className="pt-1 text-[0.5rem] text-faint">Tone</p>
            <div className="flex gap-1">
              <span className="rounded bg-accent-soft px-1.5 text-[0.45rem] text-accent">Professional</span>
              <span className="rounded bg-surface px-1.5 text-[0.45rem] text-faint">Friendly</span>
            </div>
            <span className="mt-2 flex items-center justify-center gap-1 rounded-md bg-accent py-1 text-[0.5rem] text-on-accent">✦ Generate</span>
          </div>
          <div className="space-y-1.5 rounded-lg border border-accent/40 bg-accent-soft p-2">
            <p className="text-[0.5rem] text-accent">✦ Draft</p>
            <Bar />
            <Bar w="94%" />
            <Bar w="88%" />
            <Bar w="60%" />
            <div className="h-1" />
            <Bar w="90%" />
            <Bar w="72%" />
            <span className="inline-block h-2 w-0.5 animate-pulse bg-accent" />
          </div>
        </div>
      </div>
    </Window>
  );
}

function Fraud() {
  return (
    <div className="absolute inset-0 grid grid-cols-[1.3fr_1fr] gap-3 px-[6%] pt-[10%] pb-[6%]">
      <div className="rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
        <p className="font-mono text-[0.5rem] tracking-widest text-faint uppercase">precision ↔ recall</p>
        <svg viewBox="0 0 200 120" className="mt-1 h-[80%] w-full overflow-visible" aria-hidden>
          <path d="M10 110 H190 M10 110 V10" stroke="var(--line-strong)" />
          <path d="M10 18 C 70 20, 120 30, 150 55 S 185 100, 190 108" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d="M10 18 C 70 20, 120 30, 150 55 S 185 100, 190 108 V110 H10 Z" fill="var(--accent)" opacity="0.08" />
          <line x1="138" y1="10" x2="138" y2="110" stroke="var(--accent-2)" strokeDasharray="3 3" />
          <circle cx="138" cy="46" r="4" fill="var(--accent-2)" />
          <text x="142" y="20" fontSize="7" fill="var(--muted)" fontFamily="monospace">threshold</text>
        </svg>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
          <p className="font-mono text-[0.5rem] tracking-widest text-faint uppercase">class balance</p>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full">
            <span className="w-[98%] bg-fg/15" />
            <span className="w-[2%] bg-rose-500" />
          </div>
          <div className="mt-1 flex justify-between text-[0.5rem] text-faint">
            <span>legitimate</span>
            <span className="text-rose-500">fraud</span>
          </div>
        </div>
        <div className="space-y-1.5 rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
          <p className="font-mono text-[0.5rem] tracking-widest text-faint uppercase">models compared</p>
          {["LogReg", "Random Forest", "XGBoost", "PyTorch NN"].map((m, i) => (
            <div key={m} className="flex items-center justify-between">
              <span className="text-[0.55rem] text-muted">{m}</span>
              <span className="font-mono text-[0.5rem] text-faint">{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Heart() {
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_1fr] items-center gap-4 px-[8%]">
      <div className="rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
        <p className="mb-2 font-mono text-[0.5rem] tracking-widest text-faint uppercase">confusion matrix</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ["TN", "bg-fg/[0.06] text-muted"],
            ["FP", "bg-fg/[0.06] text-muted"],
            ["FN", "bg-rose-500/15 text-rose-500 ring-1 ring-rose-500/50"],
            ["TP", "bg-accent/25 text-accent"],
          ].map(([l, c]) => (
            <span key={l} className={`grid aspect-[4/3] place-items-center rounded-lg font-mono text-xs ${c}`}>
              {l}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[0.5rem] text-rose-500">↓ minimise missed patients</p>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-4">
          <p className="font-mono text-[0.5rem] tracking-widest text-accent uppercase">Recall</p>
          <p className="font-display text-5xl leading-none text-fg">0.872</p>
          <p className="mt-1 text-[0.55rem] text-muted">Logistic Regression</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {["GridSearchCV", "One-hot", "Scaling", "Imputation"].map((t) => (
            <span key={t} className="rounded-full border border-line px-1.5 py-0.5 text-[0.5rem] text-faint">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Wilt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[78%] w-[36%] overflow-hidden rounded-[1.4rem] border-[3px] border-fg/20 bg-bg-elev shadow-2xl shadow-black/30">
        <svg viewBox="0 0 100 160" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="160" fill="var(--surface-strong)" />
          <path d="M50 150 C 48 110, 52 80, 50 20" stroke="var(--muted)" strokeWidth="2" fill="none" opacity="0.5" />
          {[
            [50, 40, -35],
            [50, 60, 35],
            [50, 82, -30],
            [50, 104, 32],
            [50, 124, -28],
          ].map(([x, y, r], i) => (
            <ellipse
              key={i}
              cx={x + (r > 0 ? 14 : -14)}
              cy={y}
              rx="16"
              ry="7"
              transform={`rotate(${r} ${x + (r > 0 ? 14 : -14)} ${y})`}
              fill={i === 2 ? "#a16207" : "#16a34a"}
              opacity={i === 2 ? 0.75 : 0.55}
            />
          ))}
        </svg>
        <span className="absolute top-[45%] left-[8%] h-[16%] w-[48%] rounded border-2 border-rose-500">
          <span className="absolute -top-3 left-[-2px] rounded-sm bg-rose-500 px-1 font-mono text-[0.45rem] text-white">wilt</span>
        </span>
        <span className="absolute top-[18%] left-[46%] h-[14%] w-[44%] rounded border-2 border-emerald-500">
          <span className="absolute -top-3 left-[-2px] rounded-sm bg-emerald-500 px-1 font-mono text-[0.45rem] text-white">healthy</span>
        </span>
        <span className="absolute inset-x-3 bottom-3 rounded-lg bg-bg/80 p-1.5 text-center text-[0.5rem] backdrop-blur">YOLOv8 · detect</span>
      </div>
      <div className="absolute top-[22%] right-[10%] w-[24%] space-y-1 rounded-xl border border-line-strong bg-bg-elev p-2.5 shadow-xl">
        <p className="font-mono text-[0.45rem] tracking-widest text-faint uppercase">Roboflow</p>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`aspect-square rounded ${i === 1 || i === 4 ? "bg-rose-500/30 ring-1 ring-rose-500/60" : "bg-emerald-500/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Segments() {
  const clusters = [
    { label: "Book lovers", color: "var(--accent)", cx: 55, cy: 40 },
    { label: "Tech buyers", color: "var(--accent-2)", cx: 140, cy: 55 },
    { label: "Fashion shoppers", color: "#f472b6", cx: 95, cy: 95 },
  ];
  // deterministic scatter
  const pts = clusters.flatMap((c, ci) =>
    Array.from({ length: 16 }, (_, i) => {
      const a = (i * 137.5 + ci * 40) * (Math.PI / 180);
      const r = 6 + ((i * 7) % 17);
      return { x: c.cx + Math.cos(a) * r, y: c.cy + Math.sin(a) * r * 0.75, color: c.color };
    }),
  );
  return (
    <div className="absolute inset-0 px-[7%] pt-[9%] pb-[5%]">
      <div className="h-full rounded-xl border border-line-strong bg-bg-elev p-3 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.5rem] tracking-widest text-faint uppercase">K-Means · PCA</p>
          <div className="flex gap-2">
            {clusters.map((c) => (
              <span key={c.label} className="flex items-center gap-1 text-[0.5rem] text-muted">
                <span className="size-1.5 rounded-full" style={{ background: c.color }} />
                {c.label}
              </span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 200 130" className="mt-1 h-[85%] w-full" aria-hidden>
          <path d="M10 125 H195 M10 125 V5" stroke="var(--line-strong)" />
          <text x="185" y="122" fontSize="6" fill="var(--faint)" fontFamily="monospace">PC1</text>
          <text x="13" y="10" fontSize="6" fill="var(--faint)" fontFamily="monospace">PC2</text>
          {clusters.map((c) => (
            <ellipse key={c.label} cx={c.cx} cy={c.cy} rx="30" ry="22" fill={c.color} opacity="0.08" />
          ))}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill={p.color} opacity="0.85" />
          ))}
        </svg>
      </div>
    </div>
  );
}

const variants: Record<PreviewVariant, () => ReactNode> = {
  ems: Ems,
  docs: Docs,
  jobs: Jobs,
  ledger: Ledger,
  ussd: Ussd,
  websites: Websites,
  freelancer: Freelancer,
  fraud: Fraud,
  heart: Heart,
  wilt: Wilt,
  segments: Segments,
};

/** Atmospheric backdrop + mockup (or a real screenshot when `project.image` is set). */
export function ProjectPreview({ project, className = "", sizes }: { project: Project; className?: string; sizes?: string }) {
  const Variant = variants[project.preview];
  return (
    <div className={`relative isolate overflow-hidden bg-bg-elev ${className}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover"
        />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div
            aria-hidden
            className={`absolute -z-10 size-[70%] rounded-full blur-[80px] ${
              project.category === "ai" ? "top-[-20%] right-[-10%] bg-accent-2/25" : "top-[-25%] left-[-10%] bg-accent/30"
            }`}
          />
          <div aria-hidden className="absolute inset-0 select-none">
            <Variant />
          </div>
          <span className="sr-only">Illustrative preview of {project.title}</span>
        </>
      )}
    </div>
  );
}
