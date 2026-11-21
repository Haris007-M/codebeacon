# CodeBeacon

Next.js 14 (App Router) + TypeScript + Tailwind + GSAP + Lucide. Pages: home, blog (10 posts), interview prep, FAQ, about, contact, privacy policy. Posts live in `content/posts/*.md`. Change the email in `app/contact/page.tsx`.

```
npm install
npm run dev
```

Add a post: create a new `.md` file in `content/posts` with the same front matter as the others.
Ads: AdSense needs a privacy policy page and approval. Put your ad code in `components/AdSlot.tsx`.
Deploy: push to GitHub and import into Vercel, then point codebeacon.site at it.

## Career form
The form posts to `app/api/apply/route.ts`.
- Local (`npm run dev`) with nothing configured: each application and its CV are saved in the `applications/` folder.
- Production: create a free account at resend.com and set `RESEND_API_KEY`, `APPLICATIONS_TO_EMAIL` and `APPLICATIONS_FROM_EMAIL` in `.env.local` / Vercel. The application arrives as an email with the CV attached. To use your own address as the sender, verify codebeacon.site in Resend.
- Max CV size is 4 MB (Vercel's request limit is 4.5 MB).

## Ads (Adsterra)
Ad units live in `components/Adsterra.tsx`. Blog posts and job pages use a sticky side column (desktop), in-article banners between sections, and a closable bottom banner on phones.
