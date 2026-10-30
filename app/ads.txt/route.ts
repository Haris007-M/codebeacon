// Serves /ads.txt (required by AdSense). Uses your publisher id from NEXT_PUBLIC_ADSENSE_CLIENT.
export const dynamic = "force-static";

export function GET() {
  const pub = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").replace(/^ca-/, "");
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
