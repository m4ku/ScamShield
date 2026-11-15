"use client";

import { useEffect, useState } from "react";

import type { FormInput } from "./CheckForm";

/**
 * Shown while a check runs: the person's own message with a gentle scanning light,
 * and a short calm status line that changes every couple of seconds.
 */
export function CheckingView({
  input,
  steps,
  cancelLabel,
  onCancel,
}: {
  input: FormInput;
  steps: string[];
  cancelLabel: string;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 2200);
    return () => window.clearInterval(id);
  }, [steps.length]);

  const preview = input.mode === "image" ? null : input.text.slice(0, 320) + (input.text.length > 320 ? "…" : "");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-8 py-6">
      <div className="animate-pop relative w-full overflow-hidden rounded-[28px] border border-line bg-surface p-5 shadow-lift">
        {input.mode === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element -- local preview of the person's own picture
          <img src={input.previewUrl} alt="" className="max-h-72 w-full rounded-2xl object-contain" />
        ) : (
          <p className="text-lg leading-relaxed whitespace-pre-wrap text-ink-soft">{preview}</p>
        )}
        <span
          aria-hidden
          className="animate-scan pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-brand-soft/80 to-transparent mix-blend-multiply"
        />
      </div>

      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
        <p key={step} className="animate-rise text-center text-[26px] font-semibold">
          {steps[step]}
        </p>
        <div className="flex gap-2" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${i <= step ? "w-10 bg-brand" : "w-4 bg-line"}`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="min-h-14 rounded-2xl border-2 border-line bg-surface px-8 text-xl font-semibold transition hover:border-ink-soft"
      >
        {cancelLabel}
      </button>
    </div>
  );
}
