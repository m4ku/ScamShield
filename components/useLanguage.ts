"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import { HTML_LANG } from "@/lib/i18n";
import { LANGUAGES, type Language } from "@/lib/schema";

const KEY = "scamshield-language";
const EVENT = "scamshield-language-change";

function isLanguage(v: unknown): v is Language {
  return typeof v === "string" && (LANGUAGES as readonly string[]).includes(v);
}

function read(): Language {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // Storage blocked: fall through to the browser language.
  }
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (browser === "fil") return "tl";
  return isLanguage(browser) ? browser : "en";
}

/**
 * The language right now, read from this device. Use it in effects and event handlers that may run
 * before the first render catches up (for example a check started as soon as a shared link opens).
 */
export function currentLanguage(): Language {
  return read();
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The chosen language, remembered on this device only. */
export function useLanguage(): [Language, (l: Language) => void] {
  const language = useSyncExternalStore(subscribe, read, () => "en" as Language);

  const setLanguage = useCallback((l: Language) => {
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      // Not remembered, but still switch for this visit.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
  }, [language]);

  return [language, setLanguage];
}
