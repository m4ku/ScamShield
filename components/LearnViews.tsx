"use client";

import Link from "next/link";

import { GUIDES, SCAM_SLUGS, type ScamSlug } from "@/lib/content/learn";
import { FEATURES } from "@/lib/content/features";
import { SITE } from "@/lib/content/site";

import { ArrowIcon, BackIcon, CheckMarkIcon, TargetIcon, WarningIcon } from "./icons";
import { ScamIcon, TINTS } from "./ScamIcon";
import { ReadAloudButton } from "./speech";
import { LinkButton, PageHeader, Reveal } from "./ui";
import { useLanguage } from "./useLanguage";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

export function LearnIndex() {
  const [language] = useLanguage();
  const site = SITE[language];
  const guides = GUIDES[language];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow={site.learn.eyebrow} title={site.learn.title} intro={site.learn.intro} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {SCAM_SLUGS.map((slug, i) => (
          <li key={slug} className="animate-rise" style={delay(160 + i * 60)}>
            <Link
              href={`/learn/${slug}`}
              className="group flex h-full items-start gap-4 rounded-[24px] border border-line bg-surface p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6"
            >
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${TINTS[i % TINTS.length]}`}
              >
                <ScamIcon slug={slug} className="h-9 w-9" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="text-[22px] leading-snug font-bold">{guides[slug].title}</span>
                <span className="text-lg leading-relaxed text-ink-soft">{guides[slug].short}</span>
              </span>
              <ArrowIcon className="mt-1 h-6 w-6 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <Reveal className="mt-12 flex justify-center">
        <LinkButton href="/practice" variant="quiet" size="md">
          <TargetIcon className="h-6 w-6" />
          {site.learn.practiceCta}
        </LinkButton>
      </Reveal>
    </div>
  );
}

export function LearnDetail({ slug }: { slug: ScamSlug }) {
  const [language] = useLanguage();
  const site = SITE[language];
  const guide = GUIDES[language][slug];
  const index = SCAM_SLUGS.indexOf(slug);
  const nextSlug = SCAM_SLUGS[(index + 1) % SCAM_SLUGS.length];
  const nextGuide = GUIDES[language][nextSlug];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/learn"
        className="animate-fade group inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-brand-strong"
      >
        <BackIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        {site.learn.allTypes}
      </Link>

      <div className="mt-4 flex items-start gap-5">
        <span
          className={`animate-pop flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] ${TINTS[index % TINTS.length]}`}
        >
          <ScamIcon slug={slug} className="h-11 w-11" />
        </span>
        <div>
          <h1 tabIndex={-1} className="font-display animate-rise text-[36px] leading-[1.1] font-semibold sm:text-[46px]">
            {guide.title}
          </h1>
          <p className="animate-rise mt-3 text-xl leading-relaxed text-ink-soft" style={delay(80)}>
            {guide.short}
          </p>
          <ReadAloudButton
            language={language}
            labels={FEATURES[language].speech}
            className="mt-4 border-2 border-line"
            text={[guide.title, guide.short, site.learn.howLabel, guide.how, site.learn.signsLabel, ...guide.signs, site.learn.todoLabel, ...guide.todo].join(". ")}
          />
        </div>
      </div>

      {/* Example */}
      <section className="animate-rise mt-10" style={delay(160)}>
        <h2 className="text-lg font-bold tracking-wide text-muted uppercase">{site.learn.exampleLabel}</h2>
        <div className="mt-3 rotate-[-0.6deg] rounded-[24px] border border-line bg-surface p-5 shadow-lift transition-transform duration-500 hover:rotate-0 sm:p-6">
          <p className="text-base font-semibold text-muted">{guide.example.from}</p>
          <p className="mt-2 text-xl leading-relaxed">{guide.example.text}</p>
        </div>
      </section>

      <Reveal as="section" className="mt-12">
        <h2 className="font-display text-[30px] font-semibold">{site.learn.howLabel}</h2>
        <p className="mt-3 text-xl leading-relaxed">{guide.how}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal as="section" className="rounded-[24px] bg-clay-soft p-6">
          <h2 className="font-display text-[26px] font-semibold">{site.learn.signsLabel}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {guide.signs.map((s, i) => (
              <li key={i} className="flex gap-3 text-xl leading-relaxed">
                <WarningIcon className="mt-1 h-6 w-6 shrink-0 text-caution-strong" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="section" delay={120} className="rounded-[24px] bg-brand-tint p-6">
          <h2 className="font-display text-[26px] font-semibold">{site.learn.todoLabel}</h2>
          <ol className="mt-4 flex flex-col gap-3">
            {guide.todo.map((s, i) => (
              <li key={i} className="flex gap-3 text-xl leading-relaxed">
                <CheckMarkIcon className="mt-1 h-6 w-6 shrink-0 text-brand" />
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" size="md" className="flex-1">
          {site.learn.checkCta}
        </LinkButton>
        <LinkButton href="/practice" variant="secondary" size="md" className="flex-1" arrow={false}>
          <TargetIcon className="h-6 w-6" />
          {site.learn.practiceCta}
        </LinkButton>
      </Reveal>

      <Reveal className="mt-12">
        <Link
          href={`/learn/${nextSlug}`}
          className="group flex items-center justify-between gap-4 rounded-[24px] border border-line bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <span className="flex items-center gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${TINTS[(index + 1) % TINTS.length]}`}
            >
              <ScamIcon slug={nextSlug} className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-base font-semibold text-muted">{site.learn.next}</span>
              <span className="block text-xl font-bold">{nextGuide.title}</span>
            </span>
          </span>
          <ArrowIcon className="h-7 w-7 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  );
}
