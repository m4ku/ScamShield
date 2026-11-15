"use client";

import { useState } from "react";

import type { FeatureStrings } from "@/lib/content/features";
import type { Strings } from "@/lib/i18n";
import { MAX_FOLLOWUPS, MAX_QUESTION_CHARS, type CheckResult, type Language } from "@/lib/schema";

import { ArrowIcon, SearchIcon } from "./icons";
import { MicButton } from "./speech";

type Item = { q: string; a: string; steps: string[] };

/**
 * Follow-up questions about a checked message. Plain question-and-answer cards (no chat
 * bubbles, no typing animation). The verdict can't be changed here; answers are checked
 * in code on the server. Nothing is saved: it all disappears with the result.
 */
export function FollowUp({
  t,
  f,
  language,
  result,
}: {
  t: Strings;
  f: FeatureStrings;
  language: Language;
  result: CheckResult;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fu = f.followup;
  const done = items.length >= MAX_FOLLOWUPS;

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || pending || done) return;
    setPending(q);
    setError(null);
    try {
      const res = await fetch("/api/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          question: q.slice(0, MAX_QUESTION_CHARS),
          history: items.map((i) => ({ q: i.q, a: [i.a, ...i.steps].join(" ") })),
          check: {
            verdict: result.verdict,
            message: result.message,
            summary: result.summary,
            signs: result.signs.map((s) => ({ type: s.type, quote: s.quote })),
          },
        }),
      });
      const body = await res.json().catch(() => ({ error: "failed" }));
      if (!res.ok) {
        setError(body.error === "busy" ? t.errors.busy : fu.error);
        return;
      }
      setItems((prev) => [...prev, { q, a: body.answer, steps: body.steps ?? [] }]);
      setQuestion("");
    } catch {
      setError(t.errors.offline);
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="animate-rise rounded-[28px] border border-line bg-surface p-5 shadow-card sm:p-7" style={{ "--d": "740ms" } as React.CSSProperties}>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
          <SearchIcon className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-display text-[28px] leading-tight font-semibold">{fu.title}</h2>
          <p className="mt-2 text-lg leading-relaxed text-ink-soft">{fu.intro}</p>
        </div>
      </div>

      {items.length > 0 && (
        <ol className="mt-6 flex flex-col gap-4">
          {items.map((item, i) => (
            <li key={i} className="animate-rise rounded-2xl border border-line bg-bg/50 p-4 sm:p-5">
              <p className="text-base font-semibold text-muted">{fu.you}</p>
              <p className="mt-1 text-xl font-semibold">{item.q}</p>
              <p className="mt-3 text-xl leading-relaxed">{item.a}</p>
              {item.steps.length > 0 && (
                <>
                  <p className="mt-4 text-base font-bold tracking-wide text-brand-strong uppercase">{fu.stepsLabel}</p>
                  <ol className="mt-2 flex flex-col gap-2">
                    {item.steps.map((s, j) => (
                      <li key={j} className="flex gap-3 text-xl leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                        >
                          {j + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </li>
          ))}
        </ol>
      )}

      {pending && (
        <div role="status" className="mt-4 rounded-2xl border border-dashed border-line-strong p-4">
          <p className="text-xl font-semibold">{pending}</p>
          <p className="mt-2 text-lg text-ink-soft">{fu.thinking}</p>
        </div>
      )}

      {error && (
        <p role="alert" className="animate-shake mt-4 rounded-2xl border-l-8 border-ink bg-panel p-4 text-lg font-semibold">
          {error}
        </p>
      )}

      {done ? (
        <p className="mt-5 rounded-2xl bg-panel p-4 text-lg leading-relaxed">{fu.limit}</p>
      ) : (
        <form onSubmit={ask} className="mt-5 flex flex-col gap-3">
          <label htmlFor="followup" className="sr-only">
            {fu.placeholder}
          </label>
          <textarea
            id="followup"
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            maxLength={MAX_QUESTION_CHARS}
            placeholder={fu.placeholder}
            className="block w-full resize-y rounded-2xl border-2 border-line bg-bg/60 p-4 text-xl leading-relaxed placeholder:text-muted focus:border-brand focus:bg-surface focus:outline-none"
          />
          <div className="flex flex-wrap items-start justify-between gap-3">
            <MicButton language={language} labels={f.speech} onText={(v) => setQuestion((p) => (p ? `${p} ${v}` : v))} />
            <button
              type="submit"
              disabled={!question.trim() || !!pending}
              className="group inline-flex min-h-14 items-center gap-2 rounded-2xl bg-brand px-6 text-xl font-bold text-white shadow-card transition hover:bg-brand-strong active:scale-[0.98] disabled:opacity-50"
            >
              {fu.ask}
              <ArrowIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
