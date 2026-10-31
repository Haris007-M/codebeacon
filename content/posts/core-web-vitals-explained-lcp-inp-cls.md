---
title: "Core Web Vitals explained: LCP, INP and CLS interview questions"
description: "What the three Core Web Vitals measure, the thresholds for a good score, how to fix each one in React and Next.js, and how to measure them with lab and field data."
date: "2026-10-31"
category: "Frontend"
readTime: "8 min read"
links:
  - "web.dev: Web Vitals|https://web.dev/articles/vitals"
  - "web.dev: Interaction to Next Paint|https://web.dev/articles/inp"
  - "PageSpeed Insights|https://pagespeed.web.dev/"
---

Core Web Vitals are Google's measurements of real-world page experience: how fast the main content appears, how quickly the page reacts, and how stable the layout is. They come up in interviews for any role that touches performance, and they are used as part of Google's page experience signals. Here is what to know.

## 1. What are the three Core Web Vitals?

- **LCP (Largest Contentful Paint)** measures loading: when the largest visible element, usually a hero image or a heading, finishes rendering.
- **INP (Interaction to Next Paint)** measures responsiveness: how long the page takes to show a visual response after a click, tap or key press.
- **CLS (Cumulative Layout Shift)** measures visual stability: how much content jumps around while the page loads.

INP replaced the older FID (First Input Delay) metric in March 2024. If an interviewer says FID, you can show you are up to date by mentioning the change.

## 2. What are the thresholds for a good score?

A page is "good" when it meets these values for at least 75% of real visits:

- **LCP:** good at 2.5 seconds or less, poor above 4 seconds.
- **INP:** good at 200 milliseconds or less, poor above 500 milliseconds.
- **CLS:** good at 0.1 or less, poor above 0.25.

## 3. What is the difference between lab data and field data?

**Lab data** comes from a controlled test, such as Lighthouse in Chrome DevTools. It is repeatable and good for debugging, but it uses one device and one network. **Field data** comes from real users, such as the Chrome UX Report that PageSpeed Insights shows. It is what Google uses, but it is slower to change and harder to debug. Use lab data to find problems and field data to confirm they are fixed.

## 4. How do you improve LCP?

LCP has four parts: server response time, resource load delay, resource load time and render delay. Work through them in order.

- Make the server fast: cache pages, use a CDN and prefer static generation.
- Tell the browser about the hero image early. In Next.js use `priority` on `next/image`, or in plain HTML use `fetchpriority="high"`.
- Serve modern, correctly sized images (WebP or AVIF) and never lazy-load the LCP image.
- Remove render-blocking CSS and scripts above the fold, and use `next/font` or `font-display: swap` so text shows while fonts load.

```tsx
<Image src="/hero.webp" alt="..." width={1200} height={630} priority />
```

## 5. How do you improve INP?

INP is mostly about **long tasks** on the main thread. When JavaScript runs for more than about 50 ms, the browser cannot respond to input.

- Ship less JavaScript: remove unused libraries and use dynamic imports for heavy code.
- Break up long work, with `setTimeout`, `requestIdleCallback` or by moving work to a Web Worker.
- In React, mark non-urgent updates with `useTransition` so typing and clicking stay responsive, and avoid re-rendering large lists on every keystroke.
- Keep event handlers small and debounce expensive work such as search.

## 6. How do you improve CLS?

Layout shift happens when something appears and pushes content down or sideways.

- Give images, videos and iframes `width` and `height` (or `aspect-ratio`) so the browser reserves space.
- **Reserve space for ads and embeds**, using a fixed-height container, because late-loading ads are a top cause of shifts.
- Avoid inserting banners or cookie notices above content that is already visible.
- Load fonts with `next/font` or `size-adjust` so the fallback font and the web font have similar metrics.
- Animate with `transform` instead of properties like `top` or `height`.

## 7. Why does Next.js help with Core Web Vitals?

The framework gives you good defaults: static and server rendering for a fast first paint, `next/image` for sized, lazy-loaded and modern-format images, `next/font` for font loading without layout shift, and automatic code splitting by route. You still need to use them correctly. A huge client component or an unsized image can undo the benefits.

## 8. How do you measure Core Web Vitals?

- **PageSpeed Insights** shows field data and a Lighthouse run for one URL.
- **Search Console** has a Core Web Vitals report that groups URLs across your site.
- **Chrome DevTools Performance panel** helps you find long tasks and layout shifts.
- **The `web-vitals` JavaScript library** lets you send real-user measurements to your own analytics.

```js
import { onLCP, onINP, onCLS } from "web-vitals";
onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

## 9. What would you do if LCP is slow on mobile only?

Say how you would investigate, not just guess. Run Lighthouse with mobile throttling and look at what the LCP element is. Often it is a large image that is not sized for small screens, so use `srcset` or `sizes`. Check whether a font, script or stylesheet is delaying rendering. Then look at the server response time, because a slow first byte limits everything after it.

## Quick revision checklist

- LCP is loading (2.5 s or less), INP is responsiveness (200 ms or less) and CLS is stability (0.1 or less).
- INP replaced FID in 2024.
- Prioritise the hero image, reserve space for everything that loads late and keep the main thread free.
- Use lab data to debug and field data to confirm.
