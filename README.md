# CodeBeacon

Next.js 14 (App Router) + TypeScript + Tailwind + GSAP + Lucide. Pages: home, blog (10 posts), interview prep, FAQ, about, contact, privacy policy. Posts live in `content/posts/*.md`. Change the email in `app/contact/page.tsx`.

```
npm install
npm run dev
```

Add a post: create a new `.md` file in `content/posts` with the same front matter as the others.
Ads: see the "Ads (AdSense + Adsterra)" section below.
Deploy: push to GitHub and import into Vercel, then point codebeacon.site at it.

## Career form
The form posts to `app/api/apply/route.ts`.
- Local (`npm run dev`) with nothing configured: each application and its CV are saved in the `applications/` folder.
- Production: create a free account at resend.com and set `RESEND_API_KEY`, `APPLICATIONS_TO_EMAIL` and `APPLICATIONS_FROM_EMAIL` in `.env.local` / Vercel. The application arrives as an email with the CV attached. To use your own address as the sender, verify codebeacon.site in Resend.
- Max CV size is 4 MB (Vercel's request limit is 4.5 MB).

## Ads (AdSense + Adsterra)
Ads are controlled by environment variables (`.env.local` locally, Project Settings > Environment Variables on Vercel). See `.env.example`.

**Phase 1: AdSense review** (`NEXT_PUBLIC_AD_MODE` unset or `review`)
- The publisher id (`ca-pub-6211805066105040`) is built into `lib/ads.ts`, so no variable is needed. It adds the AdSense script to every page `<head>`, the `google-adsense-account` meta tag and `/ads.txt`. `NEXT_PUBLIC_ADSENSE_CLIENT` can override it.
- No Adsterra ads load. Google reviews a clean, content-first site. Ad units are not needed for approval.

**Phase 2: after approval** (`NEXT_PUBLIC_AD_MODE=live`)
- Create display ad units in AdSense and put their slot ids in `NEXT_PUBLIC_AD_SLOT_POST_TOP`, `..._POST_MID`, `..._POST_BOTTOM`, `..._SIDEBAR`. They appear on blog articles only (after the intro, between sections of long articles, after the article, and in the desktop sidebar).
- Adsterra shows as a separate banner at the bottom of pages (`components/Adsterra.tsx`). Add Adsterra's `ads.txt` line(s) to `ADS_TXT_EXTRA`.
- Popunders are not supported on purpose: AdSense does not allow them.
- Do not add ads to the thank-you page, application form, contact, about or privacy pages.
