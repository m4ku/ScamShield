"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { Language } from "@/lib/schema";

/** Speech locale per app language (Tagalog voices are usually listed as Filipino). */
const SPEECH_LANG: Record<Language, string[]> = {
  en: ["en-US", "en"],
  es: ["es-US", "es-MX", "es"],
  zh: ["zh-CN", "zh"],
  vi: ["vi-VN", "vi"],
  tl: ["fil-PH", "fil", "tl"],
  hi: ["hi-IN", "hi"],
  fr: ["fr-FR", "fr-CA", "fr"],
};

function subscribeVoices(cb: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", cb);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", cb);
}

function findVoice(language: Language): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  for (const code of SPEECH_LANG[language]) {
    const v = voices.find((x) => x.lang.toLowerCase().replace("_", "-").startsWith(code.toLowerCase()));
    if (v) return v;
  }
  return null;
}

function useVoice(language: Language) {
  // The voice name is a stable string snapshot; the voice object is looked up when speaking.
  const name = useSyncExternalStore(
    subscribeVoices,
    () => findVoice(language)?.voiceURI ?? "",
    () => "",
  );
  return name;
}

/** Reads the given text aloud in the chosen language. Hidden when no voice exists for it. */
export function ReadAloudButton({
  text,
  language,
  labels,
  className = "",
}: {
  text: string;
  language: Language;
  labels: { readAloud: string; stop: string };
  className?: string;
}) {
  const voiceId = useVoice(language);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!voiceId) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const voice = findVoice(language);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    }
    u.rate = 0.92;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-lg font-semibold transition ${
        speaking ? "bg-ink text-white" : "bg-white text-ink shadow-card hover:bg-white/90"
      } ${className}`}
    >
      <SpeakerIcon className="h-6 w-6" waves={!speaking} />
      {speaking ? labels.stop : labels.readAloud}
    </button>
  );
}

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function getRecognition(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const noop = () => () => {};

/** Lets people speak instead of typing. Hidden where the browser has no speech recognition. */
export function MicButton({
  language,
  onText,
  labels,
}: {
  language: Language;
  onText: (text: string) => void;
  labels: { speak: string; listening: string; privacy: string };
}) {
  const supported = useSyncExternalStore(noop, () => getRecognition() !== null, () => false);
  const [listening, setListening] = useState(false);
  const rec = useRef<Recognition | null>(null);

  useEffect(() => () => rec.current?.stop(), []);

  if (!supported) return null;

  function toggle() {
    if (listening) {
      rec.current?.stop();
      return;
    }
    const Ctor = getRecognition();
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = SPEECH_LANG[language][0];
    r.interimResults = false;
    r.continuous = true;
    r.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (last?.[0]?.transcript) onText(last[0].transcript.trim());
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    rec.current = r;
    r.start();
    setListening(true);
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={listening}
        className={`inline-flex min-h-12 items-center gap-2 rounded-xl border-2 px-4 text-lg font-semibold transition ${
          listening ? "border-brand bg-brand text-white" : "border-line bg-surface hover:border-ink-soft"
        }`}
      >
        <MicIcon className={`h-6 w-6 ${listening ? "animate-pulse" : ""}`} />
        {listening ? labels.listening : labels.speak}
      </button>
      {listening && <p className="text-base text-ink-soft">{labels.privacy}</p>}
    </div>
  );
}

function SpeakerIcon({ className, waves }: { className?: string; waves: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
      {waves ? <path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
    </svg>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
    </svg>
  );
}
