import type { ScamSlug } from "@/lib/content/learn";

import { BadgeIcon, BankIcon, BriefcaseIcon, GiftIcon, HeartIcon, MonitorIcon, PackageIcon, PeopleIcon } from "./icons";

const ICONS: Record<ScamSlug, typeof PackageIcon> = {
  delivery: PackageIcon,
  bank: BankIcon,
  government: BadgeIcon,
  family: PeopleIcon,
  "tech-support": MonitorIcon,
  prize: GiftIcon,
  romance: HeartIcon,
  job: BriefcaseIcon,
};

/** Alternating soft tints so the grid feels lively without extra colors. */
export const TINTS = ["bg-brand-soft text-brand-strong", "bg-clay text-ink", "bg-brand-tint text-brand-strong", "bg-clay-soft text-ink"];

export function ScamIcon({ slug, className }: { slug: ScamSlug; className?: string }) {
  const Icon = ICONS[slug];
  return <Icon className={className} />;
}
