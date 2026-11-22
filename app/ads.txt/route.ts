// Serves /ads.txt. The AdSense line is built from the publisher id in lib/ads.ts.
// Other networks (e.g. Adsterra): paste the line(s) from their dashboard into ADS_TXT_EXTRA
// (separate several lines with \n).
import { ADSENSE_CLIENT } from "@/lib/ads";

export const dynamic = "force-static";

export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  const lines: string[] = [];
  if (pub) lines.push(`google.com, ${pub}, DIRECT, f08c47fec0942fa0`);
  const extra = (process.env.ADS_TXT_EXTRA || "").replace(/\\n/g, "\n").split("\n").map((l) => l.trim()).filter(Boolean);
  lines.push(...extra);
  return new Response(lines.length ? lines.join("\n") + "\n" : "", { headers: { "Content-Type": "text/plain" } });
}
