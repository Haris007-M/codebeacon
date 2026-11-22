// Central ad configuration. Everything is driven by environment variables (.env.local / Vercel).

/** AdSense publisher id (AdSense > Account > Settings). Built in, so the site is connected without any env var;
 *  NEXT_PUBLIC_ADSENSE_CLIENT can override it. */
export const ADSENSE_CLIENT: string = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-6211805066105040";

/**
 * NEXT_PUBLIC_AD_MODE
 *  - "review" (default): AdSense application period. Only the AdSense connection code is on the site.
 *                        No Adsterra ads at all, so Google reviews a clean, content-first site.
 *  - "live":             After AdSense approval. AdSense units + a separate Adsterra banner placement.
 * Popunders are never loaded: Google does not allow AdSense on sites that use them.
 */
export const AD_MODE: "review" | "live" = process.env.NEXT_PUBLIC_AD_MODE === "live" ? "live" : "review";
export const SHOW_ADSTERRA = AD_MODE === "live";

// Ad unit slot ids from AdSense (Ads > By ad unit > Display ads). Create them after approval.
export const AD_SLOTS = {
  postTop: process.env.NEXT_PUBLIC_AD_SLOT_POST_TOP,       // after the intro of an article
  postMid: process.env.NEXT_PUBLIC_AD_SLOT_POST_MID,       // between sections, longer articles only
  postBottom: process.env.NEXT_PUBLIC_AD_SLOT_POST_BOTTOM, // after the article
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,        // sticky desktop sidebar
};
