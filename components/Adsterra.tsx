"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Adsterra ad units. Keys come from your Adsterra dashboard (Websites > Get code).
const HOST = "https://bauval.org";
export const ADSTERRA = {
  banner468: "8cafc0ce54a58ae0310bd4b94d1a1279",   // 468x60
  banner160: "9098143e63e185d9b9a9a2bde9c040b3",   // 160x300
  native: "c9f368de7cce7810b2db6d8da3480ba0",      // native banner
  popunder: "e956c7639b62a42fe1f7045173b172ae",    // popunder (off unless NEXT_PUBLIC_ADSTERRA_POPUNDER=1)
};

/** iframe banner. Each one runs in its own iframe so several can sit on one page without clashing. */
export function AdsterraBanner({ adKey, width, height, className = "" }: { adKey: string; width: number; height: number; className?: string }) {
  const path = usePathname();
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
