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
