"use client";

import { useState } from "react";

import { HELP_TOPICS, type HelpTopic, type Strings } from "@/lib/i18n";

import { BackIcon, ChevronIcon, LifebuoyIcon } from "./icons";

type Props = { t: Strings; onBack?: () => void; backLabel?: string };

/** Links we add to well-known official sites and the AARP helpline (never anything from a message). */
function linkify(text: string): React.ReactNode[] {
  const parts = text.split(/(ReportFraud\.ftc\.gov|ReportaFraude\.ftc\.gov|IdentityTheft\.gov|ic3\.gov|877-908-3360)/);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const isPhone = part === "877-908-3360";
    const href = isPhone ? "tel:+18779083360" : `https://${part.toLowerCase()}`;
    return (
      <a
        key={i}
        href={href}
        className="font-semibold text-brand-strong underline decoration-2 underline-offset-4"
        target={isPhone ? undefined : "_blank"}
        rel="noreferrer"
      >
        {part}
      </a>
    );
  });
}

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

export function HelpView({ t, onBack, backLabel }: Props) {
  const [open, setOpen] = useState<Set<HelpTopic>>(new Set());

  function toggle(topic: HelpTopic) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className="animate-rise flex items-start gap-4">
        <span className="animate-pop flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-card">
          <LifebuoyIcon className="h-9 w-9" />
        </span>
        <div>
          <h1 tabIndex={-1} id="help" className="font-display text-[34px] leading-[1.1] font-semibold sm:text-[42px]">
            {t.helpTitle}
          </h1>
          <p className="mt-3 text-xl leading-relaxed text-ink-soft">{t.helpIntro}</p>
        </div>
      </div>

      <section className="animate-rise" style={delay(120)}>
        <h2 className="font-display text-[28px] font-semibold">{t.helpQuestion}</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {HELP_TOPICS.map((topic, i) => {
            const { label, steps } = t.helpTopics[topic];
            const isOpen = open.has(topic);
            return (
              <li
                key={topic}
                className={`animate-rise overflow-hidden rounded-2xl border-2 bg-surface transition-colors duration-300 ${
                  isOpen ? "border-brand shadow-card" : "border-line hover:border-ink-soft"
                }`}
                style={delay(180 + i * 60)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`topic-${topic}`}
                  onClick={() => toggle(topic)}
                  className="flex min-h-16 w-full items-center justify-between gap-3 px-5 py-3 text-left text-xl font-semibold"
                >
                  {label}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-brand text-white" : "bg-panel"
                    }`}
                  >
                    <ChevronIcon className="h-6 w-6" />
                  </span>
                </button>
                <div
                  id={`topic-${topic}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <ol className="flex flex-col gap-3 border-t-2 border-line bg-brand-tint/40 px-5 py-4">
                      {steps.map((step, j) => (
                        <li key={j} className="flex gap-3 text-xl leading-relaxed">
                          <span
                            aria-hidden
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                          >
                            {j + 1}
                          </span>
                          <span>{linkify(step)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="animate-rise rounded-[28px] bg-clay-soft p-6" style={delay(260)}>
        <h2 className="font-display text-[28px] font-semibold">{t.reportHeading}</h2>
        <ul className="mt-4 flex flex-col gap-3 text-xl leading-relaxed">
          {t.reportSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
              <span>{linkify(step)}</span>
            </li>
          ))}
        </ul>
      </section>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-[0.98]"
        >
          <BackIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          {backLabel ?? t.backButton}
        </button>
      )}
    </div>
  );
}
