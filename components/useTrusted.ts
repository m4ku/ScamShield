"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Trusted = { bankName: string; bankPhone: string; familyName: string; familyPhone: string };

const KEY = "scamshield-trusted";
const EVENT = "scamshield-trusted-change";
const EMPTY: Trusted = { bankName: "", bankPhone: "", familyName: "", familyPhone: "" };

let cache: { raw: string | null; value: Trusted } = { raw: null, value: EMPTY };

function read(): Trusted {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // Storage blocked: behave as if nothing is saved.
  }
  if (raw === cache.raw) return cache.value; // stable snapshot for useSyncExternalStore
  let value = EMPTY;
  try {
    value = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Trusted>) } : EMPTY;
  } catch {
    value = EMPTY;
  }
  cache = { raw, value };
  return value;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Phone numbers digits-only (keeping a leading +), for tel: and sms: links. */
export function dialable(phone: string): string {
  const trimmed = phone.trim();
  return (trimmed.startsWith("+") ? "+" : "") + trimmed.replace(/\D/g, "");
}

/** The person's own trusted numbers, kept only in this browser. Never sent to the server. */
export function useTrusted(): [Trusted, (t: Trusted | null) => void] {
  const trusted = useSyncExternalStore(subscribe, read, () => EMPTY);
  const save = useCallback((t: Trusted | null) => {
    try {
      if (t) window.localStorage.setItem(KEY, JSON.stringify(t));
      else window.localStorage.removeItem(KEY);
    } catch {
      // Not saved; nothing else to do.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [trusted, save];
}
