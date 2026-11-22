"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT as CLIENT } from "@/lib/ads";

declare global { interface Window { adsbygoogle: unknown[] } }

type Props = {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  label?: string;
  /** Only render (and request an ad) when the viewport is at least this wide, e.g. 1024 for a desktop sidebar. */
  minWidth?: number;
  className?: string;
};

// Manual AdSense unit. Pass the ad unit's slot id (from AdSense > Ads > By ad unit).
export default function AdSlot({ slot, format = "auto", label = "Advertisement", minWidth, className = "my-10" }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const path = usePathname();
  const [fits, setFits] = useState(!minWidth);

  // Never request an ad inside a hidden element (AdSense errors on zero-width containers).
  useEffect(() => {
    if (!minWidth) return;
    const m = window.matchMedia(`(min-width: ${minWidth}px)`);
    const on = () => setFits(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [minWidth]);

  useEffect(() => {
    if (!CLIENT || !slot || !fits || !ref.current || ref.current.getAttribute("data-adsbygoogle-status")) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, [slot, path, fits]);

  if (!fits) return null;

  // Dev / not configured yet: show a placeholder so you can see placements. Nothing renders in production.
  if (!CLIENT || !slot) {
    if (process.env.NODE_ENV === "production") return null;
    return <div className={`${className} flex h-28 items-center justify-center rounded-xl border border-dashed border-mist text-sm text-ink/40`}>AdSense slot</div>;
  }

  return (
    <div className={`ad-box ${className} min-h-[120px]`} aria-label={label}>
      <p className="mb-1 text-center text-[11px] uppercase tracking-wider text-ink/40">{label}</p>
      <ins
        key={path}
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
