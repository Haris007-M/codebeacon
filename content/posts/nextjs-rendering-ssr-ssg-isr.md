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
