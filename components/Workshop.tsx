"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { FEATURES } from "@/lib/content/features";
import { GUIDES, SCAM_SLUGS } from "@/lib/content/learn";
import { PRACTICE } from "@/lib/content/practice";
import { SITE, fill } from "@/lib/content/site";
import { STRINGS } from "@/lib/i18n";

import { ArrowIcon, BackIcon, CheckMarkIcon, MonitorIcon, ShieldIcon, TextIcon, WarningIcon } from "./icons";
import { ScamIcon } from "./ScamIcon";
import { LinkButton, PageHeader, Reveal } from "./ui";
import { useLanguage } from "./useLanguage";

export function WorkshopIntro() {
  const [language] = useLanguage();
  const w = FEATURES[language].workshop;
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow={w.eyebrow} title={w.title} intro={w.intro} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal className="flex flex-col rounded-[28px] bg-brand p-7 text-white shadow-lift">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <MonitorIcon className="h-8 w-8" />
          </span>
          <h2 className="font-display mt-5 text-[30px] font-semibold">{w.presentTitle}</h2>
          <p className="mt-2 flex-1 text-xl leading-relaxed text-white/90">{w.presentBody}</p>
          <Link
            href="/workshop/present"
            className="group mt-6 inline-flex min-h-14 w-fit items-center gap-3 rounded-2xl bg-white px-6 text-xl font-bold text-brand-strong transition hover:-translate-y-0.5"
          >
            {w.presentCta}
            <ArrowIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Reveal delay={120} className="flex flex-col rounded-[28px] bg-clay-soft p-7">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-clay">
            <TextIcon className="h-8 w-8" />
          </span>
          <h2 className="font-display mt-5 text-[30px] font-semibold">{w.handoutTitle}</h2>
          <p className="mt-2 flex-1 text-xl leading-relaxed text-ink-soft">{w.handoutBody}</p>
          <LinkButton href="/workshop/handout" variant="secondary" size="md" className="mt-6 w-fit">
            {w.handoutCta}
          </LinkButton>
        </Reveal>
      </div>
      <Reveal as="section" className="mt-10 rounded-[28px] border border-line bg-surface p-6 shadow-card sm:p-8">
        <h2 className="font-display text-[28px] font-semibold">{w.tipsTitle}</h2>
        <ol className="mt-4 flex flex-col gap-3">
          {w.tips.map((tip, i) => (
            <li key={i} className="flex gap-4 text-xl leading-relaxed">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-strong">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}

/** Full-screen, big-text practice slides for a projector. Keyboard: → / space reveal & next, ← back, Esc exit. */
export function Presenter() {
  const [language] = useLanguage();
  const w = FEATURES[language].workshop;
  const p = SITE[language].practice;
  const items = PRACTICE[language];
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const item = items[index];

  const forward = useCallback(() => {
    if (!revealed) return setRevealed(true);
    if (index + 1 < items.length) {
      setIndex(index + 1);
      setRevealed(false);
    }
  }, [revealed, index, items.length]);

  const back = useCallback(() => {
    if (revealed) return setRevealed(false);
    if (index > 0) {
      setIndex(index - 1);
      setRevealed(true);
    }
  }, [revealed, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        forward();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        back();
      } else if (e.key === "Escape") {
        router.push("/workshop");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [forward, back, router]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
            <ShieldIcon className="h-7 w-7" />
          </span>
          <span className="font-display text-3xl font-semibold">ScamShield</span>
        </span>
        <div className="flex items-center gap-2" aria-hidden>
          {items.map((_, i) => (
            <span key={i} className={`h-3 rounded-full transition-all duration-500 ${i < index ? "w-6 bg-brand" : i === index ? "w-10 bg-brand" : "w-3 bg-line"}`} />
          ))}
        </div>
        <Link href="/workshop" className="min-h-12 content-center rounded-xl border-2 border-line px-5 text-xl font-semibold">
          {w.exit}
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center overflow-auto px-6 sm:px-10">
        <div className="my-auto w-full max-w-5xl py-2">
          <p className="text-[clamp(18px,3vh,24px)] font-semibold text-muted">{fill(p.progress, { n: index + 1, total: items.length })}</p>
          <div
            key={index}
            className={`animate-pop mt-3 rounded-[36px] border-4 bg-surface p-[clamp(20px,4vh,48px)] shadow-lift transition-colors duration-500 ${
              revealed ? (item.scam ? "border-danger" : "border-line-strong") : "border-line"
            }`}
          >
            <p className="text-[clamp(18px,3vh,24px)] font-semibold text-muted">
              {p.fromLabel}: {item.from}
            </p>
            <p className="mt-3 text-[clamp(24px,min(3.6vw,5vh),52px)] leading-snug">{item.text}</p>
          </div>

          {revealed && (
            <div className="animate-rise mt-[clamp(16px,3vh,32px)] grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div
                className={`flex items-center gap-4 rounded-3xl px-7 py-[clamp(12px,2.2vh,20px)] text-[clamp(22px,min(2.6vw,4.2vh),40px)] font-bold ${
                  item.scam ? "bg-danger text-white" : "bg-neutral-verdict text-ink"
                }`}
              >
                {item.scam ? <WarningIcon className="h-11 w-11" /> : <CheckMarkIcon className="h-11 w-11" />}
                {item.scam ? p.answerScam : p.answerReal}
              </div>
              <ul className="flex flex-col gap-[clamp(6px,1.2vh,12px)]">
                {item.clues.map((c, i) => (
                  <li key={i} className="animate-rise flex gap-4 text-[clamp(20px,min(2vw,3.6vh),32px)] leading-snug" style={{ "--d": `${120 + i * 120}ms` } as React.CSSProperties}>
                    <span className={`mt-[0.45em] h-4 w-4 shrink-0 rounded-full ${item.scam ? "bg-danger" : "bg-brand"}`} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <button
          type="button"
          onClick={back}
          disabled={index === 0 && !revealed}
          className="inline-flex min-h-16 items-center gap-2 rounded-2xl border-2 border-ink/70 bg-surface px-6 text-2xl font-semibold disabled:opacity-30"
        >
          <BackIcon className="h-7 w-7" />
          {w.prev}
        </button>
        <p className="hidden text-lg text-muted md:block">{w.keys}</p>
        <button
          type="button"
          onClick={forward}
          disabled={revealed && index + 1 >= items.length}
          className="inline-flex min-h-16 items-center gap-2 rounded-2xl bg-brand px-8 text-2xl font-bold text-white shadow-card disabled:opacity-30"
        >
          {revealed ? w.next : w.reveal}
          {revealed && <ArrowIcon className="h-7 w-7" />}
        </button>
      </div>
    </div>
  );
}

const noop = () => () => {};

/** One printable page: common scams, the golden rule, help lines and a trusted-numbers card. */
export function Handout() {
  const [language] = useLanguage();
  const w = FEATURES[language].workshop;
  const t = STRINGS[language];
  const guides = GUIDES[language];
  const host = useSyncExternalStore(noop, () => window.location.host, () => "checkscamshield.vercel.app");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 print:max-w-none print:p-0">
      <div className="mb-6 flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-14 rounded-2xl bg-brand px-6 text-xl font-bold text-white shadow-card transition hover:bg-brand-strong"
        >
          {w.print}
        </button>
      </div>

      <article className="rounded-[28px] border border-line bg-surface p-6 shadow-card sm:p-10 print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="flex items-center gap-3 border-b-2 border-ink pb-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white print:border print:border-ink print:bg-white print:text-ink">
            <ShieldIcon className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold">ScamShield</p>
            <h1 className="font-display text-[30px] leading-tight font-semibold print:text-[24px]">{w.handoutHeading}</h1>
          </div>
        </header>

        <p className="mt-5 rounded-2xl bg-brand-tint p-4 text-xl font-bold text-brand-strong print:border-2 print:border-ink print:bg-white print:text-base print:text-ink">
          {w.handoutRule}
        </p>

        <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2 print:grid-cols-2 print:gap-y-2">
          {SCAM_SLUGS.map((slug) => (
            <li key={slug} className="flex gap-3">
              <ScamIcon slug={slug} className="mt-1 h-7 w-7 shrink-0 text-brand print:h-5 print:w-5 print:text-ink" />
              <div>
                <p className="text-lg font-bold print:text-[13px]">{guides[slug].title}</p>
                <p className="text-base leading-snug text-ink-soft print:text-[12px] print:text-ink">{guides[slug].signs.slice(0, 2).join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
          <section className="rounded-2xl border-2 border-dashed border-ink p-5 print:p-3">
            <h2 className="text-xl font-bold print:text-[15px]">{w.handoutCardTitle}</h2>
            {w.handoutCardLines.map((line) => (
              <div key={line} className="mt-4 print:mt-3">
                <p className="text-base font-semibold print:text-[12px]">{line}</p>
                <div className="mt-6 border-b-2 border-ink/60 print:mt-4" />
              </div>
            ))}
          </section>
          <section className="rounded-2xl bg-panel p-5 print:border print:border-ink print:bg-white print:p-3">
            <h2 className="text-xl font-bold print:text-[15px]">{t.reportHeading}</h2>
            <ul className="mt-3 flex flex-col gap-2 text-base leading-snug print:text-[12px]">
              {t.reportSteps.slice(1, 4).map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
            <p className="mt-4 text-base font-semibold print:text-[12px]">{w.handoutCheck}</p>
            <p className="text-xl font-bold break-all text-brand-strong print:text-[14px] print:text-ink">{host}</p>
          </section>
        </div>
      </article>
    </div>
  );
}
