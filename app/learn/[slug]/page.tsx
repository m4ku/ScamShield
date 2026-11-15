import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LearnDetail } from "@/components/LearnViews";
import { GUIDES, SCAM_SLUGS, type ScamSlug } from "@/lib/content/learn";

export function generateStaticParams() {
  return SCAM_SLUGS.map((slug) => ({ slug }));
}

function isSlug(s: string): s is ScamSlug {
  return (SCAM_SLUGS as readonly string[]).includes(s);
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  return { title: GUIDES.en[slug].title, description: GUIDES.en[slug].short };
}

export default function Page({ params }: PageProps<"/learn/[slug]">) {
  // Reading params inside Suspense keeps navigation instant (Cache Components).
  return (
    <Suspense fallback={null}>
      <Guide params={params} />
    </Suspense>
  );
}

async function Guide({ params }: { params: PageProps<"/learn/[slug]">["params"] }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  return <LearnDetail slug={slug} />;
}
