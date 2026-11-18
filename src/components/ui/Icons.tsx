import type { SimpleIcon } from "simple-icons";
import { siGithub } from "simple-icons";
import {
  Boxes,
  Brain,
  ClipboardList,
  Database,
  FlaskConical,
  Gauge,
  Layers,
  Network,
  Users,
  Workflow,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import type { ConceptIcon as ConceptIconName, SkillIcon } from "@/data/skills";

type IconProps = { className?: string; title?: string };

/** Renders a Simple Icons brand logo using the current text colour. */
export function BrandIcon({ icon, className, title }: IconProps & { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return <BrandIcon icon={siGithub} {...props} />;
}

/** LinkedIn isn't distributed by Simple Icons, so the mark is drawn here. */
export function LinkedinIcon({ className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const conceptMap: Record<ConceptIconName, LucideIcon> = {
  api: Webhook,
  database: Database,
  brain: Brain,
  gauge: Gauge,
  layers: Layers,
  boxes: Boxes,
  workflow: Workflow,
  test: FlaskConical,
  clipboard: ClipboardList,
  users: Users,
  tree: Network,
};

export function SkillGlyph({ icon, className }: { icon: SkillIcon; className?: string }) {
  if ("brand" in icon) return <BrandIcon icon={icon.brand} className={className} />;
  const Icon = conceptMap[icon.concept];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
