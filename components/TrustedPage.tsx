"use client";

import { useState } from "react";

import { FEATURES } from "@/lib/content/features";

import { LockIcon, PeopleIcon, BankIcon } from "./icons";
import { PageHeader } from "./ui";
import { useLanguage } from "./useLanguage";
import { useTrusted, type Trusted } from "./useTrusted";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

const input =
  "block min-h-14 w-full rounded-2xl border-2 border-line bg-bg/60 px-4 text-xl text-ink placeholder:text-muted transition-colors focus:border-brand focus:bg-surface focus:outline-none";

export function TrustedPage() {
  const [language] = useLanguage();
  const f = FEATURES[language].trusted;
  const [saved, save] = useTrusted();
  // Remount the form when saved data changes (first load, or another tab) so fields reflect it.
  return <TrustedForm key={JSON.stringify(saved)} f={f} saved={saved} save={save} />;
}

function TrustedForm({
  f,
  saved,
  save,
}: {
  f: (typeof FEATURES)["en"]["trusted"];
  saved: Trusted;
  save: (t: Trusted | null) => void;
}) {
  const [draft, setDraft] = useState<Trusted>(saved);
  const [note, setNote] = useState(false);
  const set = (k: keyof Trusted) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(false);
    setDraft({ ...draft, [k]: e.target.value });
  };
  const hasAny = Object.values(saved).some((v) => v.trim());

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader eyebrow={f.title} title={f.title} intro={f.intro} />
      <form
        className="animate-rise mt-10 flex flex-col gap-6 rounded-[28px] border border-line bg-surface p-5 shadow-lift sm:p-7"
        style={delay(200)}
        onSubmit={(e) => {
          e.preventDefault();
          save(draft);
          setNote(true);
        }}
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 flex items-center gap-3 text-[22px] font-bold">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-strong">
              <BankIcon className="h-6 w-6" />
            </span>
            {f.bankName}
          </legend>
          <input aria-label={f.bankName} className={input} value={draft.bankName} onChange={set("bankName")} placeholder={f.bankNamePh} autoComplete="off" />
          <label className="text-lg font-semibold" htmlFor="bankPhone">
            {f.bankPhone}
          </label>
          <input id="bankPhone" className={input} value={draft.bankPhone} onChange={set("bankPhone")} inputMode="tel" type="tel" autoComplete="off" />
          <p className="text-lg text-ink-soft">{f.bankHint}</p>
        </fieldset>

        <fieldset className="flex flex-col gap-3 border-t-2 border-line pt-6">
          <legend className="mb-2 flex items-center gap-3 pt-6 text-[22px] font-bold">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay text-ink">
              <PeopleIcon className="h-6 w-6" />
            </span>
            {f.familyName}
          </legend>
          <input aria-label={f.familyName} className={input} value={draft.familyName} onChange={set("familyName")} placeholder={f.familyNamePh} autoComplete="off" />
          <label className="text-lg font-semibold" htmlFor="familyPhone">
            {f.familyPhone}
          </label>
          <input id="familyPhone" className={input} value={draft.familyPhone} onChange={set("familyPhone")} inputMode="tel" type="tel" autoComplete="off" />
        </fieldset>

        <button
          type="submit"
          className="min-h-16 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-strong active:scale-[0.98]"
        >
          {f.save}
        </button>
        {note && (
          <p role="status" className="animate-fade flex items-center justify-center gap-2 text-lg font-semibold text-brand-strong">
            <LockIcon className="h-5 w-5" />
            {f.saved}
          </p>
        )}
        {hasAny && (
          <button
            type="button"
            onClick={() => {
              save(null);
              setDraft({ bankName: "", bankPhone: "", familyName: "", familyPhone: "" });
            }}
            className="min-h-12 self-center rounded-xl px-4 text-lg font-semibold text-ink-soft underline underline-offset-4"
          >
            {f.clear}
          </button>
        )}
      </form>
    </div>
  );
}
