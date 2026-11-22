---
title: "SSR vs SSG vs ISR in Next.js: the interview answer"
description: "Static, server and incremental rendering explained simply, with when to choose each."
date: "2026-10-06"
category: "Next.js"
readTime: "5 min read"
links:
  - "Next.js documentation|https://nextjs.org/docs"
  - "Rendering on the web|https://web.dev/articles/rendering-on-the-web"
  - "Learn Next.js|https://nextjs.org/learn"
---

Rendering strategy is one of the most common Next.js interview topics, because the answer shows whether you understand where your code runs and when. The four terms (SSG, SSR, ISR and CSR) all describe the same thing: **when the HTML for a page is produced**. It can be produced at build time, on every request, on a schedule, or in the visitor's browser. Below is how to explain each one, how they map to the App Router, and how to choose without guessing.

## SSG (static generation)

Pages are built once at build time and served from a CDN. Fastest option, best for blogs and docs where content changes rarely.

## SSR (server-side rendering)

HTML is generated on each request. Use it for personalized or constantly changing data. In the App Router this happens when you use dynamic functions like `cookies()` or set `export const dynamic = "force-dynamic"`.

## ISR (incremental static regeneration)

A static page that refreshes in the background after a set time:

```ts
export const revalidate = 60; // seconds
```

You get static speed with fresher content.

## CSR (client-side rendering)

Data loads in the browser after the page. Fine for private dashboards, but poor for SEO on public content.

## What does the browser receive in each case?

With SSG and ISR the HTML already exists as a file, so a CDN can return it almost instantly and the server does no work per visit. With SSR the server must run your code and wait for its data sources before it can respond, so the response time depends on your slowest database or API call. With CSR the browser first receives a nearly empty HTML shell plus JavaScript, then fetches data and builds the page, which delays the content and gives search engines less to read on the first response.

In the App Router, Server Components send rendered HTML and only Client Components are hydrated in the browser, so even a server-rendered page can ship very little JavaScript.

## How does ISR refresh a page?

ISR follows a stale-while-revalidate pattern. If a page has `revalidate = 60`, the first visitor after 60 seconds still receives the cached page instantly, while Next.js regenerates a fresh copy in the background. The next visitor gets the new version. Nobody waits for the rebuild.

You can also refresh on demand instead of waiting for a timer. After an editor publishes in your CMS, call `revalidatePath` or `revalidateTag` from a route handler or a server action:

```ts
import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/blog"); // the next request rebuilds /blog
  return Response.json({ ok: true });
}
```

## What are the trade-offs of each approach?

- **SSG:** the fastest and cheapest to host. Build time grows with the number of pages, and content stays the same until you rebuild.
- **SSR:** always fresh and can be personalized per user. Every request costs server time, and the response is harder to cache.
- **ISR:** a balance of speed and freshness. There is a short window where visitors can see slightly old content.
- **CSR:** simple to host and good for interactive screens behind a login. The first meaningful content appears later and SEO is weaker for public pages.

## Can you mix strategies in one app?

Yes, and most real sites do. The strategy is chosen per route, and in the App Router even per request. A typical site keeps marketing pages static, the blog on ISR, and the account dashboard dynamic. A route becomes dynamic automatically when it reads request-specific data such as `cookies()`, `headers()` or `searchParams`, so you rarely need to force it.

## How do you choose?

Ask how often the data changes and whether it is user-specific. Public and stable means static, public and changing means ISR, user-specific means SSR or client fetching.

## Example: static pages for each blog post

```tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
```

## Example: always fresh data

```tsx
export const dynamic = "force-dynamic"; // server-render on every request

export default async function Dashboard() {
  const res = await fetch("https://api.example.com/stats", { cache: "no-store" });
  const stats = await res.json();
  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
}
```

## Example: ISR with revalidation

```tsx
const res = await fetch("https://api.example.com/products", { next: { revalidate: 3600 } });
```

The page is served from cache and quietly rebuilt at most once an hour.

## Common mistakes to avoid

- Using SSR for every page "to be safe". It is slower and more expensive than static output for content that rarely changes.
- Fetching public, SEO-critical content on the client. Crawlers and slow phones then wait for JavaScript before seeing anything.
- Forgetting that a single dynamic function can turn a whole route dynamic, which silently removes the speed of static output.
- Relying on default caching behavior. Defaults have changed between Next.js versions, so set `revalidate` or `cache` explicitly and say so in an interview.

## How to answer in an interview

Do not just define the acronyms. Ask three questions out loud: how often does the data change, is it different for each user, and does the page need to be found by search engines? Then name the strategy and the reason. For example: "A product catalog is public and changes a few times a day, so I would use ISR with on-demand revalidation when the catalog updates."
