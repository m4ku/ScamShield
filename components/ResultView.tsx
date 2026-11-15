"use client";

import Link from "next/link";
import { useState } from "react";

import { fill, type SiteStrings } from "@/lib/content/site";
import type { FeatureStrings } from "@/lib/content/features";
import type { Strings } from "@/lib/i18n";
import type { CheckResult, Language, Sign, Verdict } from "@/lib/schema";

import { BankIcon, InfoIcon, LifebuoyIcon, PeopleIcon, PhoneIcon, RefreshIcon, ShareIcon, StopIcon, WarningIcon } from "./icons";
import { ReadAloudButton } from "./speech";
import { dialable, useTrusted } from "./useTrusted";

type Props = {
  t: Strings;
  site: SiteStrings;
  f: FeatureStrings;
  language: Language;
  result: CheckResult;
  followup?: React.ReactNode;
  onAgain: () => void;
  onClicked: () => void;
};

const BANNER: Record<Verdict, { box: string; iconWrap: string; Icon: typeof StopIcon }> = {
  likely_scam: { box: "bg-danger text-white", iconWrap: "bg-white/15 text-white", Icon: StopIcon },
  careful: { box: "bg-caution text-ink", iconWrap: "bg-white/45 text-ink", Icon: WarningIcon },
  no_signs: { box: "bg-neutral-verdict text-ink", iconWrap: "bg-white/70 text-ink", Icon: InfoIcon },
};

const MARK: Record<Verdict, string> = {
  likely_scam: "decoration-danger [background-image:linear-gradient(var(--color-danger-soft),var(--color-danger-soft))]",
  careful: "decoration-caution-strong [background-image:linear-gradient(var(--color-caution-soft),var(--color-caution-soft))]",
  no_signs: "[background-image:linear-gradient(var(--color-panel),var(--color-panel))]",
};

const STRIPE: Record<Verdict, string> = {
  likely_scam: "before:bg-danger",
  careful: "before:bg-caution",
  no_signs: "before:bg-line-strong",
};

const SCALE: Verdict[] = ["no_signs", "careful", "likely_scam"];
const SCALE_COLOR: Record<Verdict, string> = {
  no_signs: "bg-line-strong",
  careful: "bg-caution",
  likely_scam: "bg-danger",
};

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

export function ResultView({ t, site, f, language, result, onAgain, onClicked, followup }: Props) {
  const [shareNote, setShareNote] = useState<string | null>(null);
  const [mine] = useTrusted();
  const bankPhone = dialable(mine.bankPhone);
  const familyPhone = dialable(mine.familyPhone);
  const { box, iconWrap, Icon } = BANNER[result.verdict];
  const verdictText = t.verdicts[result.verdict];
  const level = SCALE.indexOf(result.verdict);

  // Steps for this verdict, with the "use a number you already trust" step always included.
  const steps = [...t.steps[result.verdict]];
  steps.splice(result.verdict === "no_signs" ? 0 : 1, 0, t.trustedStep);

  const spoken = [`${verdictText.title}.`, verdictText.sub, result.summary, `${t.stepsHeading}:`, ...steps].join(" ");
  const familyText = `${fill(f.trusted.textBody, { verdict: verdictText.title })}\n\n${result.message.slice(0, 400)}`;

  async function share() {
    const lines = [
      t.shareIntro,
      `${verdictText.title}. ${verdictText.sub}`,
      result.summary,
      result.signs.length ? `${t.shareSigns} ${result.signs.map((s) => t.signs[s.type].label).join(", ")}` : "",
      `${t.shareCheckedWith} ${window.location.origin}`,
    ].filter(Boolean);
    const text = lines.join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareNote(t.shared);
    } catch {
      // The person closed the share sheet; nothing to do.
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      {/* Verdict first */}
      <section aria-live="polite" className={`animate-pop overflow-hidden rounded-[28px] p-6 shadow-lift sm:p-8 ${box}`}>
        <div className="flex items-start gap-4 sm:gap-5">
          <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${iconWrap}`}>
            <Icon className="icon-draw h-10 w-10" />
          </span>
          <div className="min-w-0">
            <h1 tabIndex={-1} id="verdict" className="font-display text-[34px] leading-[1.1] font-semibold sm:text-[42px]">
              {verdictText.title}
            </h1>
            <p className="mt-2 text-xl font-semibold opacity-95">{verdictText.sub}</p>
            <ReadAloudButton text={spoken} language={language} labels={f.speech} className="mt-4" />
          </div>
        </div>
      </section>

      {/* Where this lands on the scale */}
      <div className="animate-rise -mt-2 px-1" style={delay(250)} aria-hidden>
        <div className="grid grid-cols-3 gap-2">
          {SCALE.map((v, i) => (
            <div key={v} className="flex flex-col gap-2">
              <span
                className={`animate-pop h-3 origin-left rounded-full ${i <= level ? SCALE_COLOR[result.verdict] : "bg-line"} ${
                  i === level ? "ring-4 ring-ink/10" : ""
                }`}
                style={delay(350 + i * 140)}
              />
              <span className={`text-base ${i === level ? "font-bold text-ink" : "text-muted"}`}>{site.scale[v]}</span>
            </div>
          ))}
        </div>
      </div>

      {result.summary && (
        <p className="animate-rise rounded-2xl bg-surface p-5 text-xl leading-relaxed shadow-card" style={delay(320)}>
          <span className="font-semibold">{t.summaryLabel}</span> {result.summary}
        </p>
      )}

      <section className="animate-rise" style={delay(400)}>
        <h2 className="font-display text-[28px] font-semibold">{t.stepsHeading}</h2>
        <ol className="mt-4 flex flex-col gap-3">
          {steps.map((step, i) => {
            const trusted = step === t.trustedStep;
            return (
              <li
                key={i}
                className={`animate-rise flex gap-4 rounded-2xl p-4 text-xl leading-relaxed ${
                  trusted ? "bg-brand-tint font-semibold text-brand-strong" : "bg-surface shadow-card"
                }`}
                style={delay(480 + i * 90)}
              >
                <span
                  aria-hidden
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    trusted ? "bg-brand text-white" : "bg-panel text-ink"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex flex-col gap-3 pt-1">
                  {step}
                  {trusted && bankPhone.length > 2 && (
                    <a
                      href={`tel:${bankPhone}`}
                      className="inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-brand px-4 text-lg font-bold text-white transition hover:bg-brand-strong active:scale-[0.98]"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      {fill(f.trusted.callBank, { name: mine.bankName.trim() || f.trusted.bankName })}
                    </a>
                  )}
                  {trusted && bankPhone.length <= 2 && (
                    <Link href="/trusted" className="inline-flex min-h-12 w-fit items-center gap-2 text-lg underline underline-offset-4">
                      <BankIcon className="h-5 w-5" />
                      {f.trusted.add}
                    </Link>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={onClicked}
          className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink/80 bg-surface px-5 text-xl font-semibold transition hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98]"
        >
          <LifebuoyIcon className="h-6 w-6" />
          {t.clickedButton}
        </button>
      </section>

      <section className="animate-rise" style={delay(560)}>
        <h2 className="font-display text-[28px] font-semibold">{t.messageHeading}</h2>
        <HighlightedMessage message={result.message} signs={result.signs} markClass={MARK[result.verdict]} />
      </section>

      <section className="animate-rise" style={delay(640)}>
        <h2 className="font-display text-[28px] font-semibold">{t.signsHeading}</h2>
        {result.signs.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-surface p-5 text-xl leading-relaxed text-ink-soft shadow-card">{t.noSignsNote}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {result.signs.map((sign, i) => (
              <SignCard key={i} n={i + 1} sign={sign} t={t} stripe={STRIPE[result.verdict]} d={720 + i * 110} />
            ))}
          </ul>
        )}
      </section>

      {followup}

      <div className="animate-rise flex flex-col gap-3" style={delay(780)}>
        <button
          type="button"
          onClick={onAgain}
          className="group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lift active:scale-[0.98]"
        >
          <RefreshIcon className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-180" />
          {t.againButton}
        </button>
        {familyPhone.length > 2 && (
          <a
            href={`sms:${familyPhone}?&body=${encodeURIComponent(familyText)}`}
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-brand bg-brand-tint px-5 text-xl font-bold text-brand-strong transition hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98]"
          >
            <PeopleIcon className="h-6 w-6" />
            {fill(f.trusted.textFamily, { name: mine.familyName.trim() || f.trusted.familyName })}
          </a>
        )}
        <button
          type="button"
          onClick={share}
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-ink/80 bg-surface px-5 text-xl font-semibold transition hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98]"
        >
          <ShareIcon className="h-6 w-6" />
          {t.shareButton}
        </button>
        {shareNote && (
          <p role="status" className="animate-fade text-center text-lg">
            {shareNote}
          </p>
        )}
      </div>
    </div>
  );
}

function SignCard({ n, sign, t, stripe, d }: { n: number; sign: Sign; t: Strings; stripe: string; d: number }) {
  const info = t.signs[sign.type];
  return (
    <li
      className={`animate-rise relative overflow-hidden rounded-2xl bg-surface p-5 pl-6 shadow-card before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${stripe}`}
      style={delay(d)}
    >
      <div className="flex items-start gap-3">
        <NumberBadge n={n} />
        <div className="min-w-0">
          <h3 className="text-xl font-bold">{info.label}</h3>
          <p className="mt-1 text-lg break-words text-ink-soft italic">&ldquo;{sign.quote}&rdquo;</p>
          {sign.explanation && <p className="mt-2 text-lg leading-relaxed">{sign.explanation}</p>}
          <p className="mt-3 rounded-xl bg-panel px-3 py-2 text-lg leading-relaxed font-semibold">{info.tip}</p>
        </div>
      </div>
    </li>
  );
}

function NumberBadge({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full bg-ink px-2 text-base font-bold text-white"
    >
      {n}
    </span>
  );
}

/** The message shown back, with each warning sign's words highlighted (sweeping in) and numbered like the cards. */
function HighlightedMessage({ message, signs, markClass }: { message: string; signs: Sign[]; markClass: string }) {
  const ranges = signs
    .map((s, i) => ({ start: s.start, end: s.end, n: i + 1 }))
    .filter((r): r is { start: number; end: number; n: number } => r.start !== null && r.end !== null)
    .sort((a, b) => a.start - b.start);

  const pieces: React.ReactNode[] = [];
  let pos = 0;
  let order = 0;
  for (const r of ranges) {
    if (r.start < pos) continue; // overlaps an earlier highlight
    if (r.start > pos) pieces.push(message.slice(pos, r.start));
    pieces.push(
      <mark
        key={r.n}
        className={`mark-sweep rounded bg-transparent px-0.5 text-ink underline decoration-2 underline-offset-4 ${markClass}`}
        style={delay(900 + order * 220)}
      >
        <sup className="mr-0.5 font-bold no-underline">{r.n}</sup>
        {message.slice(r.start, r.end)}
      </mark>,
    );
    order++;
    pos = r.end;
  }
  pieces.push(message.slice(pos));

  return (
    <div className="mt-4 rounded-2xl border border-line bg-surface p-5 text-xl leading-loose break-words whitespace-pre-wrap shadow-card">
      {pieces}
    </div>
  );
}
