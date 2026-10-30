# CodeBeacon

Next.js 14 (App Router) + TypeScript + Tailwind + GSAP + Lucide. Pages: home, blog (10 posts), interview prep, FAQ, about, contact, privacy policy. Posts live in `content/posts/*.md`. Change the email in `app/contact/page.tsx`.

```
npm install
npm run dev
```

Add a post: create a new `.md` file in `content/posts` with the same front matter as the others.
Ads: AdSense needs a privacy policy page and approval. Put your ad code in `components/AdSlot.tsx`.
Deploy: push to GitHub and import into Vercel, then point codebeacon.site at it.
