"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global { interface Window { adsbygoogle: unknown[] } }

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Manual AdSense unit. Pass the ad unit's slot id (from AdSense > Ads > By ad unit).
export default function AdSlot({ slot, format = "auto", label = "Advertisement" }: { slot?: string; format?: "auto" | "fluid" | "rectangle"; label?: string }) {
  const ref = useRef<HTMLModElement>(null);
  const path = usePathname();

  useEffect(() => {
    if (!CLIENT || !slot || !ref.current || ref.current.getAttribute("data-adsbygoogle-status")) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, [slot, path]);

  // Dev / not configured yet: show a placeholder so you can see placements.
  if (!CLIENT || !slot) {
    if (process.env.NODE_ENV === "production") return null;
    return <div className="my-10 flex h-28 items-center justify-center rounded-xl border border-dashed border-mist text-sm text-ink/40">Ad slot</div>;
  }

  return (
    <div className="my-10 min-h-[120px]" aria-label={label}>
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
