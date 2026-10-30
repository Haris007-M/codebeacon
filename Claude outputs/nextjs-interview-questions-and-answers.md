---
title: "25 Next.js interview questions and answers with examples (2026)"
description: "Next.js interview questions on the App Router, Server Components, rendering, caching, Server Actions, middleware, images and SEO, with clear answers and code examples."
date: "2026-10-30"
category: "Next.js"
readTime: "18 min read"
links:
  - "Next.js docs|https://nextjs.org/docs"
  - "App Router: routing fundamentals|https://nextjs.org/docs/app/building-your-application/routing"
  - "Data fetching and caching|https://nextjs.org/docs/app/building-your-application/data-fetching"
---

Next.js is now the default way many teams ship React, so it shows up in most frontend interviews. These 25 questions cover what interviewers ask most, with answers based on the App Router. For background, see [App Router vs Pages Router](/blog/nextjs-app-router-vs-pages-router) and [SSR, SSG and ISR explained](/blog/nextjs-rendering-ssr-ssg-isr).

## 1. What is Next.js and what does it add to React?

Next.js is a React framework. React handles components; Next.js adds file-based routing, server rendering, static generation, data fetching, image and font optimization, API endpoints and a production build setup. You get a full app structure without configuring a bundler or server yourself.

## 2. How does routing work in the App Router?

Folders inside `app/` become URL segments, and a `page.tsx` file makes that segment publicly reachable.

```
app/
  page.tsx            -> /
  blog/
    page.tsx          -> /blog
    [slug]/page.tsx   -> /blog/any-post
```

## 3. What are layout.tsx, loading.tsx, error.tsx and not-found.tsx?

They are special files that wrap a route segment. `layout` is shared UI that stays mounted between navigations. `loading` is an automatic Suspense fallback. `error` is an error boundary (it must be a Client Component). `not-found` renders when you call `notFound()` or no route matches.

```tsx
// app/dashboard/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <section><Sidebar />{children}</section>;
}
```

## 4. What is the difference between Server and Client Components?

Every component in `app/` is a Server Component by default. It runs on the server, can be `async`, can read secrets and databases, and sends no JavaScript to the browser. Add `"use client"` to a file to make it a Client Component when you need state, effects, event handlers or browser APIs. Keep client components small and near the leaves of the tree.

```tsx
"use client";
import { useState } from "react";
export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>{likes}</button>;
}
```

## 5. Can you import a Server Component into a Client Component?

Not directly: anything imported into a `"use client"` file becomes client code. Instead, pass the Server Component as `children` or another prop from a server parent.

```tsx
// page.tsx (server)
<ClientTabs>
  <ServerStats />   {/* rendered on the server, passed in as children */}
</ClientTabs>
```

## 6. How do you fetch data in the App Router?

Make the Server Component `async` and `await` your data directly. No `useEffect`, no API route needed for your own pages.

```tsx
export default async function Page() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();
  return <ProductList products={products} />;
}
```

## 7. What are SSR, SSG and ISR?

SSG (static) builds the HTML at build time. SSR (dynamic) builds it on every request. ISR rebuilds a static page in the background after a set time or on demand. In the App Router you do not pick a function name; the route becomes static or dynamic based on what it uses.

```tsx
export const revalidate = 3600; // ISR: regenerate at most once an hour
```

## 8. What makes a route dynamic?

Using request-specific data: `cookies()`, `headers()`, `searchParams`, or a `fetch` with `cache: "no-store"`. You can also force it with `export const dynamic = "force-dynamic"`. Otherwise Next.js tries to render the route statically at build time.

## 9. How does caching work with fetch?

You control caching per request. In Next.js 15 and later, `fetch` is not cached by default; you opt in. Revalidate by time or by tag.

```tsx
await fetch(url, { cache: "force-cache" });              // cache it
await fetch(url, { next: { revalidate: 60 } });          // refresh every 60s
await fetch(url, { next: { tags: ["products"] } });      // refresh on demand

// later, after a write:
import { revalidateTag } from "next/cache";
revalidateTag("products");
```

## 10. What does generateStaticParams do?

It returns the list of dynamic params to pre-render at build time, replacing `getStaticPaths` from the Pages Router.

```tsx
// app/blog/[slug]/page.tsx
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
```

## 11. What are Server Actions?

Server Actions are async functions marked with `"use server"` that run on the server but can be called from forms or client code. They replace many hand-written API routes for mutations and work even before JavaScript loads.

```tsx
// app/actions.ts
"use server";
export async function addTodo(formData: FormData) {
  await db.todo.create({ data: { title: String(formData.get("title")) } });
  revalidatePath("/todos");
}

// in a component
<form action={addTodo}>
  <input name="title" />
  <button>Add</button>
</form>
```

Always validate input and check auth inside the action: it is a public endpoint.

## 12. What are Route Handlers?

Route Handlers are API endpoints in the App Router. Create `route.ts` and export functions named after HTTP methods.

```ts
// app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: "Hello" });
}
```

## 13. What is middleware used for?

Middleware runs before a request reaches a route, at the edge. Common uses: redirects, auth checks, rewriting URLs, A/B tests and setting headers. Keep it fast; do not query a database there. (In Next.js 16 the file is renamed `proxy.ts`, but the idea is the same.)

```ts
// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  if (!req.cookies.get("token")) return NextResponse.redirect(new URL("/login", req.url));
}
export const config = { matcher: ["/dashboard/:path*"] };
```

## 14. How do you add SEO metadata?

Export a `metadata` object, or a `generateMetadata` function for dynamic pages, from a layout or page.

```tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.cover] },
  };
}
```

You can also add `sitemap.ts`, `robots.ts` and `opengraph-image.tsx` files to generate those automatically.

## 15. Why use next/image instead of img?

`next/image` resizes images on demand, serves modern formats like WebP and AVIF, lazy-loads by default, and requires dimensions so the layout does not shift (better CLS). Use `priority` for the main above-the-fold image.

```tsx
import Image from "next/image";
<Image src="/hero.png" alt="Dashboard" width={1200} height={630} priority />
```

## 16. What does next/link do?

`Link` does client-side navigation without a full page reload and prefetches linked routes when they come into view, so navigation feels instant.

```tsx
import Link from "next/link";
<Link href="/blog">Blog</Link>
```

## 17. How do you navigate programmatically?

In a Client Component, use the `useRouter` hook from `next/navigation`. On the server, call `redirect()`.

```tsx
"use client";
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/dashboard");

// server
import { redirect } from "next/navigation";
redirect("/login");
```

## 18. How do you read the URL in the App Router?

Pages receive `params` and `searchParams` as props (as Promises in Next.js 15+). In Client Components use `usePathname`, `useSearchParams` and `useParams`.

```tsx
export default async function Page({ searchParams }) {
  const { q } = await searchParams;
  return <Results query={q} />;
}
```

## 19. How do environment variables work?

Variables in `.env` files are available on the server only. To expose one to the browser, prefix it with `NEXT_PUBLIC_`, and it gets inlined at build time. Never put secrets in a `NEXT_PUBLIC_` variable.

```
DATABASE_URL=...            # server only
NEXT_PUBLIC_GA_ID=G-XXXX    # visible in the browser
```

## 20. What is streaming?

Streaming sends the page in chunks: the shell and fast parts show first, and slow parts appear when ready. Wrap slow components in `Suspense` (or add `loading.tsx`) to stream them.

```tsx
export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Reviews /> {/* slow async server component */}
      </Suspense>
    </>
  );
}
```

## 21. What are route groups and private folders?

A folder in parentheses, like `(marketing)`, groups routes and can give them their own layout without adding to the URL. A folder starting with an underscore, like `_components`, is ignored by routing so you can keep files next to routes.

```
app/(marketing)/about/page.tsx -> /about
app/(shop)/cart/page.tsx       -> /cart
```

## 22. What are parallel and intercepting routes?

Parallel routes (`@slot` folders) render several pages in the same layout at once, such as a dashboard with independent panels. Intercepting routes (`(.)photo`) show a route inside the current page, for example opening a photo in a modal while the URL changes, and showing the full page on refresh.

## 23. How does next/font help performance?

`next/font` downloads Google or local fonts at build time and self-hosts them, so there is no request to Google at runtime. It also sets fallback metrics to prevent layout shift.

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
<body className={inter.className}>...</body>
```

## 24. What is the difference between the Pages Router and the App Router?

The Pages Router uses `pages/`, with `getServerSideProps` and `getStaticProps` for data and every component on the client. The App Router uses `app/`, Server Components by default, nested layouts, streaming and Server Actions. New projects should use the App Router. Read the full comparison in [App Router vs Pages Router](/blog/nextjs-app-router-vs-pages-router).

## 25. How would you improve a slow Next.js page?

Check what makes it dynamic and cache what you can. Keep `"use client"` at the leaves so less JavaScript ships. Stream slow sections with Suspense. Use `next/image` and `next/font`. Load heavy client widgets with `dynamic(() => import(...))`. Then measure Core Web Vitals with Lighthouse or Vercel Speed Insights.

## Quick revision checklist

- Draw the `app/` folder structure for a blog with a dynamic post route.
- Explain Server vs Client Components and where `"use client"` belongs.
- Know how to cache, revalidate by time and revalidate by tag.
- Write a Server Action with a form from memory.
