---
title: "Next.js App Router vs Pages Router: what to say in an interview"
description: "A clear comparison of the two routers, server components and data fetching, in the way interviewers want to hear it."
date: "2026-10-12"
category: "Next.js"
readTime: "5 min read"
links:
  - "Next.js documentation|https://nextjs.org/docs"
  - "Learn Next.js (free course)|https://nextjs.org/learn"
  - "React Server Components|https://react.dev/reference/rsc/server-components"
---

Most Next.js interviews now include a question about the App Router. Here is a concise way to answer it.

## What is the main difference?

The Pages Router maps files in `pages/` to routes and renders client components by default. The App Router uses the `app/` directory, nested layouts, and **React Server Components by default**, so components render on the server and send no JavaScript to the browser unless you opt in.

## When do you need "use client"?

Add `"use client"` when a component uses state, effects, event handlers or browser-only APIs. Keep it as low in the tree as possible so the rest stays on the server.

## How does data fetching differ?

In the Pages Router you use `getStaticProps` or `getServerSideProps`. In the App Router you simply `await` data inside a server component, and control caching with fetch options and route segment config.

## What are layouts?

A `layout.tsx` wraps its child routes and **does not re-render** when you navigate between them, which keeps state like a sidebar's scroll position.

## How does routing work in each router?

In the Pages Router, every file inside `pages/` becomes a route, `[id].tsx` creates a dynamic route, and `_app.tsx` and `_document.tsx` customize the wrapper around every page. In the App Router, routes are **folders** and the UI for a route lives in a `page.tsx` file. Special files sit next to it: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` and `route.ts` for API endpoints. Folders in parentheses, such as `(marketing)`, group routes without changing the URL.

## What are loading.tsx and error.tsx?

`loading.tsx` shows an instant loading state while the route's data is being fetched, using React Suspense and streaming under the hood, so the user sees part of the page quickly instead of a blank screen. `error.tsx` acts as an error boundary for the route segment, so a failure in one section does not break the whole app. It must be a Client Component because error boundaries need client-side behavior.

## How does caching work in the App Router?

Caching is one of the parts that has changed between versions. Some versions cache `fetch` results by default and others do not, so do not rely on memory. In an interview, say that you set caching explicitly with `cache: "no-store"` for always-fresh data or `next: { revalidate: 60 }` for time-based refreshes, and that you check the documentation for the version you are using.

## What are Server Actions?

Server Actions are functions marked with `"use server"` that run on the server and can be called from a form or an event handler. They are used for mutations such as saving a form, and they remove the need to write a separate API route for each action:

```tsx
async function addPost(formData: FormData) {
  "use server";
  const title = String(formData.get("title"));
  await savePost(title); // your own data-layer function
}

export default function NewPost() {
  return (
    <form action={addPost}>
      <input name="title" required />
      <button type="submit">Save</button>
    </form>
  );
}
```

## What is the difference between route handlers and API routes?

In the Pages Router, API endpoints live in `pages/api` and receive `(req, res)` objects. In the App Router you create a `route.ts` file and export functions named after HTTP methods, such as `GET` and `POST`, which use the standard Web `Request` and `Response` APIs. The Web API version is closer to what you use in the browser and in edge runtimes.

## Example: a server component that fetches data

```tsx
// app/posts/page.tsx  (server component by default)
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", { next: { revalidate: 60 } });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  return <ul>{posts.map((p: { id: number; title: string }) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## Example: a small client component

```tsx
"use client";
import { useState } from "react";

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Like ({likes})</button>;
}
```

You can import `LikeButton` into the server page above. The page stays on the server and only the button ships JavaScript.

## Folder structure to remember

```text
app/
  layout.tsx        shared wrapper
  page.tsx          the / route
  blog/
    page.tsx        the /blog route
    [slug]/page.tsx dynamic route
```

## How do metadata and SEO work in each router?

In the Pages Router you usually add `<Head>` from `next/head` inside each page and write the tags by hand. In the App Router you export a `metadata` object, or an async `generateMetadata` function for dynamic pages, from a `layout.tsx` or `page.tsx`. Next.js merges the values from parent layouts and renders the tags on the server, so titles, descriptions and Open Graph data are in the first HTML response that search engines receive. Using the built-in API also avoids duplicate or conflicting tags.

## Can you use both routers in the same project?

Yes. The `app/` and `pages/` directories can coexist, which allows an incremental migration one route at a time. The only restriction is that the same URL cannot be defined in both.

## Should you migrate an existing Pages Router app?

Not automatically. The Pages Router is still supported and works well. Migrate when the App Router's benefits, such as nested layouts, streaming and Server Components, outweigh the cost of the change, and do it gradually. A balanced answer like this sounds more experienced than "always use the newest thing".
