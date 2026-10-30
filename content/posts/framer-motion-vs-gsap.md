---
title: "Framer Motion vs GSAP: which should you use?"
description: "A practical comparison of the two most popular animation libraries for React, and how to answer in an interview."
date: "2026-10-21"
category: "Framer Motion"
readTime: "4 min read"
links:
  - "Motion (Framer Motion) docs|https://motion.dev/docs"
  - "GSAP documentation|https://gsap.com/docs/v3/"
  - "Accessible animation (MDN)|https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
---

## The short answer

Framer Motion is declarative and React-native. GSAP is imperative and extremely powerful for sequenced, timeline-based work. Neither is better in every case.

## When Framer Motion fits

Component-level animation: mount and unmount transitions with `AnimatePresence`, hover and tap gestures, drag, and shared layout animations with the `layout` prop.

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
```

## When GSAP fits

Complex timelines, scroll-driven storytelling with ScrollTrigger, SVG animation, and precise control over sequencing.

## Can you use both?

Yes, but give each its own elements. Two libraries animating the same property on the same node will fight.

## What should you say in an interview?

Explain the trade-off: developer ergonomics and React integration versus control and timeline power, then name the project that decides it.

## Example: Framer Motion list with exit animation

```tsx
import { AnimatePresence, motion } from "framer-motion";

function List({ items }: { items: string[] }) {
  return (
    <ul>
      <AnimatePresence>
        {items.map((item) => (
          <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            {item}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
```

## Example: the same idea as a GSAP timeline

```js
gsap.timeline()
  .from(".title", { y: 30, opacity: 0 })
  .from(".card", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.2")
  .to(".badge", { scale: 1.1, yoyo: true, repeat: 1 });
```

## Quick decision guide

- Mount and unmount, gestures, layout changes: Framer Motion.
- Long sequences, scroll storytelling, SVG: GSAP.
- Simple hover effects: plain CSS transitions are enough.
