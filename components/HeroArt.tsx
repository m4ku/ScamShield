/** Hero illustration: a phone showing a message with suspicious words marked, guarded by a shield. */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 320 340" className="h-full w-full">
        {/* soft background shapes */}
        <circle cx="168" cy="178" r="138" fill="var(--color-brand-soft)" opacity="0.7" />
        <circle cx="270" cy="64" r="26" fill="var(--color-clay)" />
        <circle cx="46" cy="270" r="14" fill="var(--color-clay)" />

        <g className="origin-center animate-float" style={{ transformBox: "fill-box" }}>
          {/* phone */}
          <rect x="88" y="40" width="160" height="268" rx="28" fill="var(--color-ink)" />
          <rect x="97" y="52" width="142" height="244" rx="20" fill="var(--color-surface)" />
          <rect x="146" y="60" width="44" height="7" rx="3.5" fill="var(--color-ink)" opacity="0.85" />

          {/* message card */}
          <rect x="110" y="88" width="116" height="122" rx="16" fill="var(--color-panel)" />
          <rect x="122" y="104" width="82" height="9" rx="4.5" fill="var(--color-line-strong)" />
          <rect x="122" y="122" width="58" height="13" rx="4" fill="var(--color-danger-soft)" />
          <rect x="122" y="125" width="58" height="7" rx="3.5" fill="var(--color-danger)" opacity="0.75" />
          <rect x="122" y="144" width="92" height="9" rx="4.5" fill="var(--color-line-strong)" />
          <rect x="122" y="162" width="40" height="13" rx="4" fill="var(--color-caution-soft)" />
          <rect x="122" y="165" width="40" height="7" rx="3.5" fill="var(--color-caution-strong)" opacity="0.7" />
          <rect x="168" y="165" width="40" height="7" rx="3.5" fill="var(--color-line-strong)" />
          <rect x="122" y="184" width="70" height="9" rx="4.5" fill="var(--color-line-strong)" />

          {/* number badges on the marked words */}
          <circle cx="186" cy="128" r="9" fill="var(--color-ink)" />
          <text x="186" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="sans-serif">
            1
          </text>

          {/* bottom button */}
          <rect x="110" y="236" width="116" height="34" rx="12" fill="var(--color-brand)" />
          <rect x="140" y="250" width="56" height="7" rx="3.5" fill="#fff" opacity="0.9" />
        </g>

        {/* shield badge */}
        <g className="animate-pop" style={{ "--d": "300ms" } as React.CSSProperties}>
          <circle cx="250" cy="236" r="44" fill="var(--color-surface)" />
          <circle cx="250" cy="236" r="44" fill="none" stroke="var(--color-line)" strokeWidth="2" />
          <path
            d="M250 210 231 218v13c0 11.5 8 21.2 19 24.2 11-3 19-12.7 19-24.2v-13l-19-8Z"
            fill="var(--color-brand)"
          />
          <path d="M250 224v11M250 242v.01" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
