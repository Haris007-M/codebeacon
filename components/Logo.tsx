export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="12" fill="#0B1F33" />
      <path d="M16 12 L9 17 L16 22" fill="none" stroke="#FFB020" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 12 L39 17 L32 22" fill="none" stroke="#FFB020" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 9 L27.5 14 H20.5 Z" fill="#EEF3F5" />
      <rect x="21" y="14" width="6" height="6" rx="1" fill="#FFB020" />
      <path d="M20.5 40 L22 21 H26 L27.5 40 Z" fill="#EEF3F5" />
      <rect x="15" y="40" width="18" height="2.5" rx="1" fill="#0F766E" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-sea" : "text-ink"}`}>
        Code<span className={light ? "text-beam" : "text-teal"}>Beacon</span>
      </span>
    </span>
  );
}
