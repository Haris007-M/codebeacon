import { ImageResponse } from "next/og";

export const alt = "CodeBeacon: frontend interview questions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#050d18,#0B1F33 60%,#0F766E)", color: "#EEF3F5" }}>
        <div style={{ fontSize: 40, color: "#FFB020", fontWeight: 700 }}>{"< CodeBeacon >"}</div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>Frontend interview answers that light the way</div>
        <div style={{ fontSize: 32, marginTop: 28, opacity: 0.8 }}>React · Next.js · TypeScript · Tailwind · GSAP · Git</div>
      </div>
    ),
    size
  );
}
