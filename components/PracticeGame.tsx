"use client";

import { useState } from "react";

import { PRACTICE } from "@/lib/content/practice";
import { SITE, fill } from "@/lib/content/site";
import { STRINGS } from "@/lib/i18n";

import { ArrowIcon, CheckMarkIcon, CrossIcon, RefreshIcon, SearchIcon, ShareIcon, TargetIcon } from "./icons";
import { LinkButton, PageHeader } from "./ui";
import { useLanguage } from "./useLanguage";

type Phase = "intro" | "question" | "answered" | "done";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

/** "Spot the scam": 8 messages, decide scam or real, then see the clues. Score stays on screen only. */
export function PracticeGame() {
  const [language] = useLanguage();
  const site = SITE[language];
  const t = STRINGS[language];
  const items = PRACTICE[language];
  const p = site.practice;

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const item = items[index];
  const score = answers.filter(Boolean).length;
  const lastCorrect = answers[index];

  function start() {
    setIndex(0);
    setAnswers([]);
    setShareNote(null);
    setPhase("question");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function answer(saysScam: boolean) {
    setAnswers((a) => {
      const next = [...a];
      next[index] = saysScam === item.scam;
      return next;
    });
    setPhase("answered");
  }

  function next() {
    if (index + 1 >= items.length) {
      setPhase("done");
    } else {
      setIndex(index + 1);
      setPhase("question");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  async function share() {
    const text = `${p.title}\n${fill(p.scoreTitle, { n: score, total: items.length })}\n${window.location.origin}/practice`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareNote(t.shared);
    } catch {
      // Share sheet closed.
    }
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <PageHeader eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
        <div className="animate-rise mt-10 flex gap-3" style={delay(220)} aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className="animate-pop h-14 flex-1 rounded-2xl border border-line bg-surface shadow-card"
              style={delay(260 + i * 60)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={start}
          className="animate-rise group mt-10 flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lift active:scale-[0.98] sm:w-auto"
          style={delay(320)}
        >
          <TargetIcon className="h-7 w-7" />
          {p.start}
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const high = score >= items.length - 2;
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <div className="animate-pop mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-brand-soft">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-brand text-white shadow-lift">
            <span className="font-display text-5xl leading-none font-semibold">{score}</span>
            <span className="text-lg opacity-90">/ {items.length}</span>
          </div>
        </div>
        <h1 tabIndex={-1} className="font-display animate-rise mt-8 text-[36px] leading-tight font-semibold sm:text-[44px]" style={delay(120)}>
          {fill(p.scoreTitle, { n: score, total: items.length })}
        </h1>
        <p className="animate-rise mx-auto mt-4 max-w-lg text-xl leading-relaxed text-ink-soft" style={delay(200)}>
          {high ? p.scoreHigh : p.scoreLow}
        </p>
        <div className="animate-rise mt-6 flex flex-wrap justify-center gap-2" style={delay(260)} aria-hidden>
          {answers.map((ok, i) => (
            <span
              key={i}
              className={`animate-pop flex h-10 w-10 items-center justify-center rounded-full ${ok ? "bg-brand text-white" : "bg-panel text-ink-soft"}`}
              style={delay(320 + i * 70)}
            >
              {ok ? <CheckMarkIcon className="h-6 w-6" /> : <CrossIcon className="h-5 w-5" />}
            </span>
          ))}
        </div>
        <div className="animate-rise mt-10 flex flex-col gap-3" style={delay(380)}>
          <button
            type="button"
            onClick={share}
            className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-[0.98]"
          >
            <ShareIcon className="h-6 w-6" />
            {t.shareButton}
          </button>
          {shareNote && (
            <p role="status" className="animate-fade text-lg">
              {shareNote}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={start}
              className="group flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-ink/80 bg-surface px-5 text-xl font-semibold transition hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98]"
            >
              <RefreshIcon className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-180" />
              {p.again}
            </button>
            <LinkButton href="/" variant="secondary" size="md" arrow={false}>
              <SearchIcon className="h-6 w-6" />
              {p.checkReal}
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  const answered = phase === "answered";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold text-ink-soft">{fill(p.progress, { n: index + 1, total: items.length })}</p>
        <div className="flex gap-1.5" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i < index || (i === index && answered) ? "w-6 bg-brand" : i === index ? "w-6 bg-brand-soft" : "w-2.5 bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Message card */}
      <div
        key={index}
        className={`animate-pop mt-6 rounded-[28px] border-2 bg-surface p-6 shadow-lift transition-colors duration-500 sm:p-7 ${
          answered ? (item.scam ? "border-danger" : "border-line-strong") : "border-line"
        }`}
      >
        <p className="text-base font-semibold text-muted">
          {p.fromLabel}: {item.from}
        </p>
        <p className="mt-3 text-[22px] leading-relaxed">{item.text}</p>
      </div>

      {!answered ? (
        <div key={`q${index}`} className="animate-rise mt-6 grid gap-3 sm:grid-cols-2" style={delay(120)}>
          <button
            type="button"
            onClick={() => answer(true)}
            className="flex min-h-16 items-center justify-center rounded-2xl border-2 border-ink/80 bg-surface px-5 text-[21px] font-bold transition hover:-translate-y-0.5 hover:border-danger hover:text-danger-strong hover:shadow-card active:scale-[0.98]"
          >
            {p.scamButton}
          </button>
          <button
            type="button"
            onClick={() => answer(false)}
            className="flex min-h-16 items-center justify-center rounded-2xl border-2 border-ink/80 bg-surface px-5 text-[21px] font-bold transition hover:-translate-y-0.5 hover:border-brand hover:text-brand-strong hover:shadow-card active:scale-[0.98]"
          >
            {p.realButton}
          </button>
        </div>
      ) : (
        <div key={`a${index}`} className="mt-6 flex flex-col gap-5" role="status" aria-live="polite">
          <div className={`animate-pop flex items-center gap-4 rounded-2xl p-5 ${lastCorrect ? "bg-brand-tint" : "bg-panel"}`}>
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                lastCorrect ? "bg-brand text-white" : "bg-ink text-white"
              }`}
            >
              {lastCorrect ? <CheckMarkIcon className="h-7 w-7" /> : <CrossIcon className="h-6 w-6" />}
            </span>
            <p className="text-xl">
              <span className="font-bold">{lastCorrect ? p.correct : p.wrong}</span>{" "}
              <span
                className={`font-semibold ${item.scam ? "text-danger-strong" : "text-ink"}`}
              >
                {item.scam ? p.answerScam : p.answerReal}
              </span>
            </p>
          </div>

          <section className="animate-rise rounded-2xl bg-surface p-5 shadow-card" style={delay(120)}>
            <h2 className="font-display text-[24px] font-semibold">{p.cluesLabel}</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {item.clues.map((c, i) => (
                <li key={i} className="animate-rise flex gap-3 text-xl leading-relaxed" style={delay(200 + i * 90)}>
                  <span
                    aria-hidden
                    className={`mt-3 h-2.5 w-2.5 shrink-0 rounded-full ${item.scam ? "bg-danger" : "bg-brand"}`}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            onClick={next}
            className="animate-rise group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-[0.98]"
            style={delay(380)}
          >
            {index + 1 >= items.length ? p.finish : p.next}
            <ArrowIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}
