"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { ArrowIcon } from "./icons";

type Variant = "primary" | "secondary" | "quiet";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-card hover:bg-brand-strong hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[0.98]",
  secondary:
    "border-2 border-ink/80 bg-surface text-ink hover:-translate-y-0.5 hover:border-ink hover:shadow-card active:translate-y-0 active:scale-[0.98]",
  quiet: "bg-brand-tint text-brand-strong hover:bg-brand-soft active:scale-[0.98]",
};

const SIZES = {
  lg: "min-h-16 px-7 text-[22px] rounded-2xl",
  md: "min-h-14 px-6 text-xl rounded-2xl",
};

export function buttonClass(variant: Variant = "primary", size: keyof typeof SIZES = "lg", extra = "") {
  return `inline-flex items-center justify-center gap-3 font-semibold transition duration-200 ease-out ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}

/** A link styled as a big button, with an arrow that nudges on hover. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`group ${buttonClass(variant, size, className)}`}>
      {children}
      {arrow && <ArrowIcon className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-base font-semibold text-brand-strong ${className}`}
    >
      {children}
    </span>
  );
}

/** Title block used at the top of each page. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="relative">
      <Blob className="pointer-events-none absolute -top-16 -right-24 h-64 w-64 text-brand-soft/70" />
      <div className="relative">
        <span className="animate-rise" style={{ "--d": "0ms" } as React.CSSProperties}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </span>
        <h1
          tabIndex={-1}
          className="font-display animate-rise mt-4 text-[40px] leading-[1.08] font-semibold sm:text-5xl"
          style={{ "--d": "70ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="animate-rise mt-4 max-w-xl text-xl leading-relaxed text-ink-soft"
            style={{ "--d": "140ms" } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

/** Soft organic shape used as background decoration. */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M104 18c38 2 76 30 78 72s-28 86-72 92-86-20-90-66 46-100 84-98Z"
      />
    </svg>
  );
}

/** Fades its children up when they scroll into view (once). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "shown";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "shown";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      className={className}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
