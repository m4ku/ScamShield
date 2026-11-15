"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition, useEffect, useRef, useState } from "react";

import { FEATURES } from "@/lib/content/features";
import { SITE } from "@/lib/content/site";
import { LANGUAGE_LABELS, STRINGS } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/schema";

import { BookIcon, ChevronIcon, GlobeIcon, LifebuoyIcon, SearchIcon, ShieldIcon, TargetIcon } from "./icons";
import { useLanguage } from "./useLanguage";

export const RESET_EVENT = "scamshield-reset";

const NAV = [
  { href: "/", key: "check", Icon: SearchIcon },
  { href: "/learn", key: "learn", Icon: BookIcon },
  { href: "/practice", key: "practice", Icon: TargetIcon },
  { href: "/help", key: "help", Icon: LifebuoyIcon },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [language] = useLanguage();
  const site = SITE[language];
  const t = STRINGS[language];
  const pathname = usePathname();

  function onNav(href: string) {
    // Tapping "Check" while already on it starts a fresh check.
    if (href === "/" && pathname === "/") window.dispatchEvent(new Event(RESET_EVENT));
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b print:hidden border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-18 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
          <Link href="/" onClick={() => onNav("/")} className="group flex min-h-12 items-center gap-2.5 rounded-xl pr-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-transform duration-300 group-hover:-rotate-6">
              <ShieldIcon className="h-6 w-6" />
            </span>
            <span className="font-display text-[23px] font-semibold tracking-tight sm:text-[26px]">ScamShield</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, key }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => onNav(href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-12 items-center rounded-xl px-4 text-lg font-medium transition-colors ${
                    active ? "text-brand-strong" : "text-ink-soft hover:bg-panel hover:text-ink"
                  }`}
                >
                  {site.nav[key]}
                  <span
                    className={`absolute inset-x-4 bottom-1.5 h-[3px] rounded-full bg-brand transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <LanguageMenu label={t.languageLabel} />
        </div>
      </header>

      <ViewTransition>
        <main className="flex-1">{children}</main>
      </ViewTransition>

      <footer className="border-t border-line bg-panel/60 print:hidden">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 text-lg text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5 text-brand" />
            {t.footer}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="min-h-12 content-center font-semibold text-brand-strong underline-offset-4 hover:underline">
              {site.footerAbout}
            </Link>
            <Link href="/trusted" className="min-h-12 content-center font-semibold text-brand-strong underline-offset-4 hover:underline">
              {FEATURES[language].trusted.title}
            </Link>
            <Link href="/workshop" className="min-h-12 content-center font-semibold text-brand-strong underline-offset-4 hover:underline">
              {FEATURES[language].workshop.navLabel}
            </Link>
            <span className="content-center">{site.footerMade}</span>
          </div>
        </div>
        <div className="h-24 md:hidden" />
      </footer>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t print:hidden border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {NAV.map(({ href, key, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => onNav(href)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[68px] flex-col items-center justify-center gap-1 text-[15px] font-semibold transition-colors ${
                    active ? "text-brand-strong" : "text-ink-soft"
                  }`}
                >
                  <span
                    className={`flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                      active ? "scale-100 bg-brand-soft" : "scale-90 bg-transparent"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  {site.nav[key]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function LanguageMenu({ label }: { label: string }) {
  const [language, setLanguage] = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${LANGUAGE_LABELS[language]}`}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 shrink-0 items-center gap-1.5 rounded-xl border-2 border-line bg-surface px-2.5 text-[17px] font-medium transition hover:border-ink-soft sm:gap-2 sm:px-3 sm:text-lg"
      >
        <GlobeIcon className="h-5 w-5 text-brand" />
        <span lang={language}>{LANGUAGE_LABELS[language]}</span>
        <ChevronIcon className={`hidden h-5 w-5 transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="group"
          aria-label={label}
          className="animate-sheet absolute right-0 z-40 mt-2 w-60 origin-top-right rounded-2xl border border-line bg-surface p-2 shadow-lift"
        >
          <p className="px-3 pt-1 pb-2 text-base font-semibold text-muted">{label}</p>
          {LANGUAGES.map((l) => (
            <button
              key={l}
              type="button"
              lang={l}
              aria-pressed={l === language}
              onClick={() => {
                setLanguage(l);
                setOpen(false);
              }}
              className={`flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-left text-xl transition-colors ${
                l === language ? "bg-brand-tint font-semibold text-brand-strong" : "hover:bg-panel"
              }`}
            >
              {LANGUAGE_LABELS[l]}
              {l === language && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
