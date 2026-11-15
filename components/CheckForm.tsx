"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { FeatureStrings } from "@/lib/content/features";
import type { Strings } from "@/lib/i18n";
import { INPUT_MODES, MAX_TEXT_CHARS, type InputMode, type Language } from "@/lib/schema";

import { ArrowIcon, CameraIcon, ClipboardIcon, CrossIcon, LockIcon, PhoneIcon, TextIcon } from "./icons";
import { prepareImage } from "./image";
import { MicButton } from "./speech";

const noop = () => () => {};

/** The first picture in a paste or drop, if there is one. */
function imageFrom(data: DataTransfer | null): File | null {
  if (!data) return null;
  for (const file of Array.from(data.files)) if (file.type.startsWith("image/")) return file;
  return null;
}

/** Ctrl+Enter or Cmd+Enter checks the message on a computer. */
function submitOnModEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
  }
}

export type FormInput =
  | { mode: "text" | "call"; text: string }
  | { mode: "image"; image: { mimeType: "image/jpeg"; base64: string }; previewUrl: string };

type Props = {
  t: Strings;
  language: Language;
  speech: FeatureStrings["speech"];
  form: FeatureStrings["form"];
  error: string | null;
  onSubmit: (input: FormInput) => void;
};

const ICONS: Record<InputMode, typeof TextIcon> = { text: TextIcon, image: CameraIcon, call: PhoneIcon };

export function CheckForm({ t, language, speech, form, error: serverError, onSubmit }: Props) {
  const [mode, setMode] = useState<InputMode>("text");
  const [text, setText] = useState("");
  const [callText, setCallText] = useState("");
  const [image, setImage] = useState<{ base64: string; previewUrl: string } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [dragging, setDragging] = useState(false);
  const canPaste = useSyncExternalStore(noop, () => typeof navigator.clipboard?.readText === "function", () => false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const callRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const error = localError ?? serverError;

  useEffect(() => {
    if (mode === "text") textRef.current?.focus({ preventScroll: true });
    if (mode === "call") callRef.current?.focus({ preventScroll: true });
  }, [mode]);

  function showError(message: string) {
    setLocalError(message);
    setShakeKey((k) => k + 1);
  }

  function submitText(value: string, m: "text" | "call") {
    const trimmed = value.trim();
    if (!trimmed) return showError(t.errors.empty);
    if (trimmed.length > MAX_TEXT_CHARS) return showError(t.errors.tooLong);
    setLocalError(null);
    onSubmit({ mode: m, text: trimmed });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "text") return submitText(text, "text");
    if (mode === "call") return submitText(callText, "call");
    if (!image) return showError(t.errors.imageMissing);
    setLocalError(null);
    onSubmit({ mode: "image", image: { mimeType: "image/jpeg", base64: image.base64 }, previewUrl: image.previewUrl });
  }

  /** Pasting a message into the empty box starts the check right away. A pasted picture goes to the screenshot tab. */
  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const picture = imageFrom(e.clipboardData);
    if (picture) {
      e.preventDefault();
      setMode("image");
      void loadImage(picture);
      return;
    }
    const pasted = e.clipboardData.getData("text");
    if (text.trim() || !pasted.trim()) return;
    e.preventDefault();
    setText(pasted);
    submitText(pasted, "text");
  }

  /** The big "Paste message" button: reads the clipboard and checks it in one tap. */
  async function pasteFromClipboard() {
    try {
      const pasted = (await navigator.clipboard.readText()).trim();
      if (!pasted) throw new Error("empty");
      setText(pasted);
      submitText(pasted, "text");
    } catch {
      showError(form.pasteFailed);
      textRef.current?.focus();
    }
  }

  function clearText() {
    setText("");
    setLocalError(null);
    textRef.current?.focus();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const picture = imageFrom(e.dataTransfer);
    if (picture) void loadImage(picture);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) await loadImage(file);
  }

  async function loadImage(file: File) {
    try {
      const prepared = await prepareImage(file);
      setImage({ base64: prepared.base64, previewUrl: prepared.previewUrl });
      setLocalError(null);
    } catch {
      setImage(null);
      showError(t.errors.imageBad);
    }
  }

  // On the screenshot tab, a picture pasted anywhere on the page is used.
  useEffect(() => {
    if (mode !== "image") return;
    function onPaste(e: ClipboardEvent) {
      const picture = imageFrom(e.clipboardData);
      if (!picture) return;
      e.preventDefault();
      void loadImage(picture);
    }
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loadImage only uses setters and stable strings
  }, [mode]);

  const index = INPUT_MODES.indexOf(mode);
  const textareaClass =
    "block min-h-52 w-full resize-y rounded-2xl border-2 border-line bg-bg/60 p-4 text-xl leading-relaxed text-ink placeholder:text-muted transition-colors focus:border-brand focus:bg-surface focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-[28px] border border-line bg-surface p-4 shadow-lift sm:p-6"
    >
      {/* Mode switch with a sliding indicator */}
      <div role="group" className="relative grid grid-cols-3 rounded-2xl bg-panel p-1.5">
        <span
          aria-hidden
          className="absolute top-1.5 bottom-1.5 left-1.5 rounded-xl bg-surface shadow-card transition-transform duration-300 ease-[cubic-bezier(0.3,1.2,0.5,1)]"
          style={{ width: "calc((100% - 0.75rem) / 3)", transform: `translateX(${index * 100}%)` }}
        />
        {INPUT_MODES.map((m) => {
          const Icon = ICONS[m];
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setMode(m);
                setLocalError(null);
              }}
              className={`relative z-10 flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[17px] leading-tight font-semibold transition-colors ${
                active ? "text-brand-strong" : "text-ink-soft hover:text-ink"
              }`}
            >
              <Icon className={`h-7 w-7 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
              {t.tabs[m]}
            </button>
          );
        })}
      </div>

      <div key={mode} className="animate-fade">
        {mode === "text" && (
          <>
            <label htmlFor="message" className="sr-only">
              {t.textLabel}
            </label>
            <textarea
              id="message"
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={submitOnModEnter}
              placeholder={t.textPlaceholder}
              maxLength={MAX_TEXT_CHARS * 2}
              className={textareaClass}
            />
            {text ? (
              <button
                type="button"
                onClick={clearText}
                className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-line bg-surface px-4 text-lg font-semibold transition hover:border-ink-soft"
              >
                <CrossIcon className="h-5 w-5" />
                {form.clear}
              </button>
            ) : (
              canPaste && (
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand bg-brand-tint px-5 text-xl font-bold text-brand-strong transition hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98] sm:w-auto"
                >
                  <ClipboardIcon className="h-6 w-6" />
                  {form.paste}
                </button>
              )
            )}
          </>
        )}

        {mode === "call" && (
          <>
            <label htmlFor="call" className="mb-2 block text-xl font-semibold">
              {t.callLabel}
            </label>
            <textarea
              id="call"
              ref={callRef}
              value={callText}
              onChange={(e) => setCallText(e.target.value)}
              onKeyDown={submitOnModEnter}
              placeholder={t.callPlaceholder}
              maxLength={MAX_TEXT_CHARS * 2}
              className={textareaClass}
            />
            <div className="mt-3">
              <MicButton language={language} labels={speech} onText={(v) => setCallText((p) => (p ? `${p} ${v}` : v))} />
            </div>
          </>
        )}

        {mode === "image" && (
          <div
            className={`flex flex-col gap-3 rounded-2xl transition ${dragging ? "ring-4 ring-brand/40" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" id="image" tabIndex={-1} />
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element -- local preview of the person's own picture
              <img
                src={image.previewUrl}
                alt={t.imageAlt}
                className="animate-pop max-h-80 w-full rounded-2xl border-2 border-line bg-bg object-contain"
              />
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line-strong bg-bg/60 p-6 text-center transition hover:border-brand hover:bg-brand-tint"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                  <CameraIcon className="h-9 w-9" />
                </span>
                <span className="text-xl font-semibold">{t.imageChoose}</span>
                <span className="text-lg text-ink-soft">{t.imageHint}</span>
                <span className="hidden text-base text-muted md:block">{form.imageDrop}</span>
              </button>
            )}
            {image && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-line bg-surface px-4 text-xl font-semibold transition hover:border-ink-soft"
              >
                <CameraIcon className="h-6 w-6" />
                {t.imageChange}
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <p
          key={shakeKey}
          role="alert"
          className="animate-shake rounded-2xl border-l-8 border-ink bg-panel p-4 text-lg font-semibold"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-brand px-6 text-[22px] font-bold text-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lift active:translate-y-0 active:scale-[0.98]"
      >
        {t.checkButton}
        <ArrowIcon className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      <p className="flex items-center justify-center gap-2 text-lg text-ink-soft">
        <LockIcon className="h-5 w-5 text-brand" />
        {t.privacy}
      </p>
    </form>
  );
}
