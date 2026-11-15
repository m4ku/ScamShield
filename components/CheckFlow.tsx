"use client";

import { useEffect, useRef, useState } from "react";

import { FEATURES } from "@/lib/content/features";
import { SITE } from "@/lib/content/site";
import { STRINGS } from "@/lib/i18n";
import type { CheckErrorCode, CheckResult } from "@/lib/schema";

import { RESET_EVENT } from "./AppShell";
import { CheckForm, type FormInput } from "./CheckForm";
import { CheckingView } from "./CheckingView";
import { FollowUp } from "./FollowUp";
import { HelpView } from "./HelpView";
import { HeroArt } from "./HeroArt";
import { BankIcon, LifebuoyIcon } from "./icons";
import { ResultView } from "./ResultView";
import { Blob, Eyebrow, LinkButton, Reveal } from "./ui";
import { currentLanguage, useLanguage } from "./useLanguage";

type View = "form" | "checking" | "result" | "help";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

/**
 * The home page: check form → reading → result → (optional) help, one job per screen.
 * Results live only in memory; nothing is saved anywhere.
 */
export function CheckFlow() {
  const [language] = useLanguage();
  const t = STRINGS[language];
  const site = SITE[language];
  const f = FEATURES[language];
  const [view, setView] = useState<View>("form");
  const [input, setInput] = useState<FormInput | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [errorCode, setErrorCode] = useState<CheckErrorCode | "offline" | null>(null);
  const [formKey, setFormKey] = useState(0);
  const firstRender = useRef(true);
  const pending = useRef<AbortController | null>(null);

  // Each screen starts at the top, with its heading focused for screen readers.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const id = view === "result" ? "verdict" : view === "help" ? "help" : null;
    if (id) document.getElementById(id)?.focus({ preventScroll: true });
  }, [view]);

  useEffect(() => {
    const reset = () => goHome();
    window.addEventListener(RESET_EVENT, reset);
    return () => window.removeEventListener(RESET_EVENT, reset);
  }, []);

  // Text shared into the installed app (Android "Share to ScamShield") arrives as ?text=…
  // Check it right away, then clear it from the address bar so it isn't kept in history.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const shared = [p.get("title"), p.get("text"), p.get("url")].filter(Boolean).join("\n").trim();
    if (!shared) return;
    window.history.replaceState(null, "", "/");
    void runCheck({ mode: "text", text: shared.slice(0, 5000) });
  }, []);

  async function runCheck(next: FormInput) {
    setErrorCode(null);
    setInput(next);
    setView("checking");
    const controller = new AbortController();
    pending.current = controller;
    // Read the saved language now: a shared link starts a check before the first render has it.
    const lang = currentLanguage();
    const payload =
      next.mode === "image" ? { mode: "image", image: next.image, language: lang } : { mode: next.mode, text: next.text, language: lang };
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const body = await res.json().catch(() => ({ error: "failed" }));
      if (controller.signal.aborted) return;
      if (!res.ok) {
        setErrorCode((body.error as CheckErrorCode) ?? "failed");
        setView("form");
        return;
      }
      setResult(body as CheckResult);
      setView("result");
    } catch {
      if (controller.signal.aborted) return;
      setErrorCode("offline");
      setView("form");
    } finally {
      if (pending.current === controller) pending.current = null;
    }
  }

  /** Stops a check that's taking too long and goes back to the form, with the message still there. */
  function cancelCheck() {
    pending.current?.abort();
    pending.current = null;
    setView("form");
  }

  function goHome() {
    pending.current?.abort();
    pending.current = null;
    setResult(null);
    setInput(null);
    setErrorCode(null);
    setFormKey((k) => k + 1);
    setView("form");
  }

  const errorText =
    errorCode === null
      ? null
      : errorCode === "bad_input"
        ? t.errors.failed
        : errorCode === "offline"
          ? t.errors.offline
          : t.errors[errorCode];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Kept mounted while checking so an error returns the person to what they typed. */}
      <div hidden={view !== "form"}>
        <section className="relative grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
          <Blob className="pointer-events-none absolute -top-24 -left-28 h-72 w-72 text-brand-soft/60" />
          <div className="relative flex flex-col gap-5 sm:gap-6">
            <div className="animate-rise">
              <Eyebrow>{site.home.eyebrow}</Eyebrow>
            </div>
            <h1 className="font-display animate-rise text-[36px] leading-[1.08] font-semibold sm:text-[54px]" style={delay(80)}>
              {site.home.heroBefore}
              <span className="hero-underline text-brand-strong">{site.home.heroEmph}</span>
              {site.home.heroAfter}
            </h1>
            <p className="animate-rise hidden max-w-xl text-xl leading-relaxed text-ink-soft sm:block" style={delay(160)}>
              {t.homeIntro}
            </p>
            <div className="animate-rise" style={delay(240)}>
              <CheckForm key={formKey} t={t} language={language} speech={f.speech} form={f.form} error={errorText} onSubmit={runCheck} />
            </div>
          </div>
          <HeroArt className="animate-fade hidden h-[420px] md:block" />
        </section>

        <HomeSections />
      </div>

      {view === "checking" && input && (
        <CheckingView input={input} steps={site.checkingSteps} cancelLabel={f.form.cancel} onCancel={cancelCheck} />
      )}

      {view === "result" && result && (
        <ResultView
          t={t}
          site={site}
          f={f}
          language={language}
          result={result}
          onAgain={goHome}
          onClicked={() => setView("help")}
          followup={<FollowUp t={t} f={f} language={language} result={result} />}
        />
      )}

      {view === "help" && <HelpView t={t} onBack={() => (result ? setView("result") : goHome())} />}
    </div>
  );
}

/** Two short shortcuts under the form: help if you already acted, and your trusted numbers. */
function HomeSections() {
  const [language] = useLanguage();
  const site = SITE[language];
  const trusted = FEATURES[language].trusted;

  return (
    <section className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2">
      <Reveal className="flex flex-col gap-4 rounded-[28px] bg-clay-soft p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-clay text-ink">
            <LifebuoyIcon className="h-7 w-7" />
          </span>
          <h2 className="font-display text-[26px] leading-tight font-semibold">{site.home.helpTitle}</h2>
        </div>
        <p className="flex-1 text-xl leading-relaxed text-ink-soft">{site.home.helpBody}</p>
        <LinkButton href="/help" variant="secondary" size="md" className="w-fit">
          {site.home.helpCta}
        </LinkButton>
      </Reveal>
      <Reveal delay={120} className="flex flex-col gap-4 rounded-[28px] border border-line bg-surface p-6 shadow-card sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
            <BankIcon className="h-7 w-7" />
          </span>
          <h2 className="font-display text-[26px] leading-tight font-semibold">{trusted.homeTitle}</h2>
        </div>
        <p className="flex-1 text-xl leading-relaxed text-ink-soft">{trusted.homeBody}</p>
        <LinkButton href="/trusted" variant="quiet" size="md" className="w-fit">
          {trusted.add}
        </LinkButton>
      </Reveal>
    </section>
  );
}
