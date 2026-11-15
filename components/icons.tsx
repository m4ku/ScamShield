/** Plain line icons. No sparkles, robots or brains: just everyday objects. */

type Props = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

function make(paths: React.ReactNode) {
  return function Icon({ className }: Props) {
    return (
      <svg {...base} className={className}>
        {paths}
      </svg>
    );
  };
}

export const ShieldIcon = make(<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6L12 3Z" />);
export const TextIcon = make(
  <>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 9h8M8 13h8M8 17h5" />
  </>,
);
export const CameraIcon = make(
  <>
    <path d="M4 8h3l2-3h6l2 3h3v11H4V8Z" />
    <circle cx="12" cy="13" r="3.5" />
  </>,
);
export const PhoneIcon = make(
  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
);
export const StopIcon = make(
  <>
    <path d="M8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5v-7L8.5 3Z" />
    <path d="M12 8v5M12 16.5v.01" />
  </>,
);
export const WarningIcon = make(
  <>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17v.01" />
  </>,
);
export const InfoIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8v.01" />
  </>,
);
export const ChevronIcon = make(<path d="m6 9 6 6 6-6" />);
export const ArrowIcon = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const BackIcon = make(<path d="M19 12H5M11 6l-6 6 6 6" />);
export const LockIcon = make(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </>,
);
export const GlobeIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </>,
);
export const BookIcon = make(
  <>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z" />
  </>,
);
export const TargetIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </>,
);
export const LifebuoyIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" />
  </>,
);
export const SearchIcon = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </>,
);
export const ShareIcon = make(
  <>
    <path d="M12 3v12M7 8l5-5 5 5" />
    <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </>,
);
export const RefreshIcon = make(
  <>
    <path d="M20 11a8 8 0 1 0-2.3 5.7" />
    <path d="M20 5v6h-6" />
  </>,
);
export const CheckMarkIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const CrossIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
export const PackageIcon = make(
  <>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </>,
);
export const BankIcon = make(
  <>
    <path d="M3 9.5 12 4l9 5.5H3Z" />
    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
  </>,
);
export const BadgeIcon = make(
  <>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="M12 8.5v3.5M12 15v.01" />
  </>,
);
export const PeopleIcon = make(
  <>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14.2c2.9.4 5 2.9 5 5.8" />
  </>,
);
export const MonitorIcon = make(
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>,
);
export const GiftIcon = make(
  <>
    <rect x="3.5" y="9" width="17" height="11.5" rx="1.5" />
    <path d="M2.5 9h19M12 9v11.5M12 9C9 9 7 7.8 7 6.2 7 4.9 8 4 9.2 4 11 4 12 6.5 12 9Zm0 0c3 0 5-1.2 5-2.8C17 4.9 16 4 14.8 4 13 4 12 6.5 12 9Z" />
  </>,
);
export const HeartIcon = make(
  <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />,
);
export const BriefcaseIcon = make(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 13h18" />
  </>,
);
export const ClipboardIcon = make(
  <>
    <rect x="6" y="4.5" width="12" height="16" rx="2" />
    <path d="M9.5 4.5V3.5h5v1M9 10h6M9 14h4" />
  </>,
);
