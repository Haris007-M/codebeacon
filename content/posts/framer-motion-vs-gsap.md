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

Animation questions come up in frontend interviews because they test judgment, not memory. Both Framer Motion and GSAP are mature and widely used, so there is rarely one correct answer. What interviewers want to hear is that you understand how each library thinks, what each costs, and how to match the tool to the problem. The library is now branded Motion, and the `framer-motion` package name you see in most tutorials still works.

## The short answer

Framer Motion is declarative and React-native. GSAP is imperative and extremely powerful for sequenced, timeline-based work. Neither is better in every case.

## When Framer Motion fits

Component-level animation: mount and unmount transitions with `AnimatePresence`, hover and tap gestures, drag, and shared layout animations with the `layout` prop.

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
```

## When GSAP fits

Complex timelines, scroll-driven storytelling with ScrollTrigger, SVG animation, and precise control over sequencing.

## How do the two libraries differ in how you write animation?

Framer Motion is **declarative**. You describe the state you want, such as `animate={{ opacity: 1 }}`, and the library works out the transition. Because it is built for React, animations follow props and state naturally, and `AnimatePresence` lets elements animate out before they are removed from the tree.

GSAP is **imperative**. You call functions that target elements, usually through a ref or a selector, and you decide exactly when each step happens. That is more code for simple cases, but it gives you precise control over order, timing and playback (play, pause, reverse, seek).

## How do they handle scroll animation?

Framer Motion offers `whileInView` for simple reveal effects, and `useScroll` with `useTransform` to tie a value to scroll progress. This covers most landing-page effects.

GSAP's ScrollTrigger plugin goes further: pinning a section while the user scrolls, scrubbing an animation to the scrollbar, snapping to sections and coordinating many elements in one timeline. If the design is a scroll-driven story, GSAP is usually the more comfortable tool.

## What about performance and bundle size?

Neither library is slow when used well. The bigger factor is **what you animate**. Animating `transform` and `opacity` is cheap because the browser can handle it on the compositor. Animating `width`, `height`, `top` or `left` forces layout work on every frame and causes jank in any library.

On size, Framer Motion adds more JavaScript for the features it provides, and you can reduce that with `LazyMotion`. GSAP's core is compact and each plugin adds to it. In an interview, say that you would measure the real bundle and the frame rate in DevTools rather than quote numbers from memory.

## How do you respect users who prefer reduced motion?

Some people get dizzy or distracted by movement, and their operating system tells the browser through the `prefers-reduced-motion` setting. Good answers mention it.

```tsx
import { MotionConfig } from "framer-motion";

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

```js
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".hero", { y: 40, opacity: 0 });
});
```

Framer Motion can switch off transform animations globally with `MotionConfig`. With GSAP, `matchMedia` creates the animation only when the user has not asked for reduced motion.

## How do you clean up GSAP animations in React?

React Strict Mode mounts components twice in development, and navigation unmounts them. If you do not clean up, animations and ScrollTriggers pile up. Wrap your animations in `gsap.context()` and revert it when the component unmounts:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".card", { y: 30, opacity: 0, stagger: 0.1 });
  }, containerRef); // selectors are scoped to this container
  return () => ctx.revert();
}, []);
```

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

## Common mistakes to avoid

- Animating layout properties instead of `transform` and `opacity`.
- Letting two libraries animate the same property on the same element.
- Forgetting cleanup for GSAP timelines and ScrollTriggers in React components.
- Adding a heavy animation library for an effect that a CSS transition could handle.
- Ignoring reduced-motion settings and keyboard users when motion hides or moves controls.
