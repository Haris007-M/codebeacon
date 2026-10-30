"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Adsterra ad units. Keys come from your Adsterra dashboard (Websites > Get code).
const HOST = "https://bauval.org";
const ADSTERRA = {
  banner468: "8cafc0ce54a58ae0310bd4b94d1a1279",   // 468x60
  banner160: "9098143e63e185d9b9a9a2bde9c040b3",   // 160x300
  native: "c9f368de7cce7810b2db6d8da3480ba0",      // native banner
  rect300: "5369dc295dc0b87d6b6cd8287c1f5e6f",     // 300x250
  tower160: "848169af32cea2a3ec28940a1139735e",    // 160x600
  leader728: "b5df7a1ab046f13bd0cae06bde019cf1",   // 728x90
  mobile320: "d0bd86f13e4e069cb2d91a31a1dbb719",   // 320x50
  popunder: "e956c7639b62a42fe1f7045173b172ae",    // popunder (off unless NEXT_PUBLIC_ADSTERRA_POPUNDER=1)
};

/** iframe banner. Each one runs in its own iframe so several can sit on one page without clashing. */
const SIZES = { banner468: [468, 60], banner160: [160, 300], rect300: [300, 250], tower160: [160, 600], leader728: [728, 90], mobile320: [320, 50] } as const;

export function AdsterraBanner({ unit, className = "" }: { unit: keyof typeof SIZES; className?: string }) {
  const path = usePathname();
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

/** Page banner: 728x90 on tablets/desktops, 320x50 on phones. Only the matching one is loaded. */
export function AdsterraResponsive({ className = "" }: { className?: string }) {
  const wide = useMedia("(min-width: 800px)");
  return (
    <div className={`my-14 flex justify-center ${wide === null ? "min-h-[90px]" : ""} ${className}`}>
      {wide === null ? null : <AdsterraBanner unit={wide ? "leader728" : "mobile320"} />}
    </div>
  );
}

/** 300x250 rectangle, centred, with generous spacing so it is never next to a link or button. */
export function AdsterraRect({ className = "" }: { className?: string }) {
  return <div className={`my-14 flex justify-center ${className}`}><AdsterraBanner unit="rect300" /></div>;
}

/** 160x600 side banner, only on very wide and tall screens where it fits beside the content. */
export function AdsterraTower() {
  const fits = useMedia("(min-width: 1536px) and (min-height: 780px)");
  if (!fits) return null;
  return <aside className="fixed right-4 top-28 z-10"><AdsterraBanner unit="tower160" /></aside>;
}

/** Native banner (matches site content). */
export function AdsterraNative({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    box.innerHTML = `<div id="container-${ADSTERRA.native}"></div>`;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src = `${HOST}/21/${ADSTERRA.native}`;
    box.appendChild(s);
    return () => { box.innerHTML = ""; };
  }, [path]);
  return (
    <div className={`my-10 ${className}`}>
      <p className="mb-1 text-center text-[11px] uppercase tracking-wider text-ink/40">Sponsored</p>
      <div ref={ref} />
    </div>
  );
}

/** Popunder: loads once per page view, only when enabled in env. */
export function AdsterraPopunder() {
  if (process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER !== "1") return null;
  return <Script id="adsterra-pop" strategy="lazyOnload" data-cfasync="false" src={`${HOST}/14/${ADSTERRA.popunder}`} />;
}
