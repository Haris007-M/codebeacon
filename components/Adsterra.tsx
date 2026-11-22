"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SHOW_ADSTERRA } from "@/lib/ads";

// Adsterra ad units. Keys come from your Adsterra dashboard (Websites > Get code).
// Every component here renders nothing unless NEXT_PUBLIC_AD_MODE=live (see lib/ads.ts),
// so during the AdSense review the site shows no third-party ads.
// Popunders, fixed/sticky overlays and native "sponsored" blocks are intentionally not included:
// they conflict with AdSense program policies.
const HOST = "https://bauval.org";
const ADSTERRA = {
  banner468: "8cafc0ce54a58ae0310bd4b94d1a1279",   // 468x60
  rect300: "5369dc295dc0b87d6b6cd8287c1f5e6f",     // 300x250
  leader728: "b5df7a1ab046f13bd0cae06bde019cf1",   // 728x90
  mobile320: "d0bd86f13e4e069cb2d91a31a1dbb719",   // 320x50
};

/** iframe banner. Each one runs in its own iframe so several can sit on one page without clashing. */
const SIZES = { banner468: [468, 60], rect300: [300, 250], leader728: [728, 90], mobile320: [320, 50] } as const;

export function AdsterraBanner({ unit, className = "" }: { unit: keyof typeof SIZES; className?: string }) {
  const path = usePathname();
  if (!SHOW_ADSTERRA) return null;
  const adKey = ADSTERRA[unit];
  const [width, height] = SIZES[unit];
  const html = `<!doctype html><html><head><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>
<script>atOptions={key:'${adKey}',format:'iframe',height:${height},width:${width},params:{}};</script>
<script src="${HOST}/22/${adKey}"></script></body></html>`;
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="mb-1 text-[11px] uppercase tracking-wider text-ink/40">Advertisement</span>
      <iframe key={path} title="Advertisement" srcDoc={html} width={width} height={height} scrolling="no" className="border-0" style={{ maxWidth: "100%" }} />
    </div>
  );
}

/** True/false once the media query is known; null before mount (so ads that don't fit never load). */
function useMedia(query: string) {
  const [match, setMatch] = useState<boolean | null>(null);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Page / footer banner: 728x90 on tablets/desktops, 320x50 on phones. Only the matching one is loaded. */
export function AdsterraResponsive({ className = "" }: { className?: string }) {
  const wide = useMedia("(min-width: 800px)");
  if (!SHOW_ADSTERRA) return null;
  return (
    <div className={`my-14 flex justify-center ${wide === null ? "min-h-[90px]" : ""} ${className}`}>
      {wide === null ? null : <AdsterraBanner unit={wide ? "leader728" : "mobile320"} />}
    </div>
  );
}

/** 300x250 rectangle, centred, with generous spacing so it is never next to a link or button. */
export function AdsterraRect({ className = "" }: { className?: string }) {
  if (!SHOW_ADSTERRA) return null;
  return <div className={`my-14 flex justify-center ${className}`}><AdsterraBanner unit="rect300" /></div>;
}

/** In-content ad: 468x60 on tablets/desktops, 300x250 on phones. Only the matching one is loaded. */
export function AdsterraInline({ className = "" }: { className?: string }) {
  const wide = useMedia("(min-width: 640px)");
  if (!SHOW_ADSTERRA) return null;
  return (
    <div className={`my-10 flex justify-center ${wide === null ? "min-h-[90px]" : ""} ${className}`}>
      {wide === null ? null : <AdsterraBanner unit={wide ? "banner468" : "rect300"} />}
    </div>
  );
}
