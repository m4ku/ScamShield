"use client";

import { SITE } from "@/lib/content/site";
import { STRINGS } from "@/lib/i18n";

import { HelpView } from "./HelpView";
import { BookIcon, LifebuoyIcon, LockIcon, PeopleIcon, SearchIcon } from "./icons";
import { LinkButton, PageHeader, Reveal } from "./ui";
import { useLanguage } from "./useLanguage";

export function HelpPage() {
  const [language] = useLanguage();
  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-14">
      <HelpView t={STRINGS[language]} />
    </div>
  );
}

const ABOUT_ICONS = [SearchIcon, BookIcon, LockIcon, PeopleIcon];

export function AboutPage() {
  const [language] = useLanguage();
  const site = SITE[language];
  const a = site.about;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
      <div className="mt-12 flex flex-col gap-5">
        {a.sections.map((s, i) => {
          const Icon = ABOUT_ICONS[i % ABOUT_ICONS.length];
          return (
            <Reveal as="section" key={i} delay={i * 80} className="rounded-[24px] border border-line bg-surface p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="font-display text-[26px] font-semibold">{s.title}</h2>
              </div>
              {s.body.map((p, j) => (
                <p key={j} className="mt-4 text-xl leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-10">
        <LinkButton href="/">{STRINGS[language].checkButton}</LinkButton>
      </Reveal>
    </div>
  );
}

/** Shown for mistyped or old links, in the reader's language, with a way back to what they came for. */
export function NotFoundPage() {
  const [language] = useLanguage();
  const site = SITE[language];
  const t = STRINGS[language];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
        <SearchIcon className="h-9 w-9" />
      </span>
      <h1 className="font-display animate-rise mt-6 text-[36px] leading-[1.1] font-semibold sm:text-[46px]">{site.notFound.title}</h1>
      <p className="animate-rise mt-4 text-xl leading-relaxed text-ink-soft">{site.notFound.body}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" className="flex-1">
          {t.checkButton}
        </LinkButton>
        <LinkButton href="/learn" variant="secondary" className="flex-1" arrow={false}>
          <BookIcon className="h-6 w-6" />
          {site.nav.learn}
        </LinkButton>
      </div>
      <LinkButton href="/help" variant="quiet" size="md" className="mt-4">
        <LifebuoyIcon className="h-6 w-6" />
        {site.home.helpTitle}
      </LinkButton>
    </div>
  );
}
