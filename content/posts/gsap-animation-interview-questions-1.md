---
title: "25 GSAP interview questions and answers with examples (2026)"
description: "GSAP interview questions on tweens, timelines, easing, stagger, ScrollTrigger, pinning, scrub, useGSAP in React, cleanup, matchMedia and performance, each with a code example."
date: "2026-10-30"
category: "GSAP"
readTime: "16 min read"
links:
  - "GSAP docs|https://gsap.com/docs/v3/"
  - "ScrollTrigger|https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
  - "GSAP with React|https://gsap.com/resources/React/"
---

Creative and agency roles often test GSAP, and it is a strong extra on any frontend CV. These 25 questions cover the core API, ScrollTrigger and using GSAP correctly in React. Comparing libraries? Read [Framer Motion vs GSAP](/blog/framer-motion-vs-gsap).

## 1. What is GSAP and why use it?

GSAP (GreenSock Animation Platform) is a JavaScript animation library. It animates any numeric property, DOM element, SVG, canvas or JS object, with precise timing control, excellent cross-browser behavior and strong performance. Since 2025 it is completely free, including all former paid plugins.

## 2. What is the difference between to, from, fromTo and set?

`to` animates from the current value to a target. `from` animates from a value to the current one. `fromTo` defines both ends. `set` applies values instantly.

```js
gsap.to(".box", { x: 200, duration: 1 });
gsap.from(".title", { opacity: 0, y: 40 });
gsap.fromTo(".bar", { width: 0 }, { width: "100%", duration: 2 });
gsap.set(".card", { opacity: 0 });
```

## 3. What is a tween?

A tween is a single animation of one or more properties on one or more targets. Every `gsap.to()` call returns a tween you can control.

```js
const tween = gsap.to(".box", { rotation: 360, duration: 2, paused: true });
tween.play();
tween.reverse();
```

## 4. What is a timeline and why use one?

A timeline sequences tweens. You can move, pause, reverse or speed up the whole group, and adjust timing without recalculating delays.

```js
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });
tl.from(".logo", { y: -50, opacity: 0 })
  .from(".nav a", { y: -20, opacity: 0, stagger: 0.1 })
  .from(".hero h1", { scale: 0.8, opacity: 0 });
```

## 5. What is the position parameter?

The third argument of a timeline method controls when a tween starts.

```js
tl.to(a, { x: 100 })
  .to(b, { x: 100 }, "<")      // same start as previous
  .to(c, { x: 100 }, "-=0.3")  // overlap previous by 0.3s
  .to(d, { x: 100 }, 2)        // at 2 seconds absolute
  .addLabel("end")
  .to(e, { x: 100 }, "end+=0.5");
```

## 6. How does easing work?

Easing controls the speed curve. `power1` to `power4` get stronger; `.in` starts slow, `.out` ends slow, `.inOut` does both. Special ones include `back`, `elastic`, `bounce` and `steps`.

```js
gsap.to(".ball", { y: 300, ease: "bounce.out", duration: 1.5 });
gsap.to(".card", { scale: 1.1, ease: "back.out(1.7)" });
```

## 7. What is stagger?

Stagger offsets the start of each target in a group. It can be a number or an object for more control.

```js
gsap.from(".grid .item", {
  opacity: 0, y: 30,
  stagger: { each: 0.08, from: "center", grid: "auto" },
});
```

## 8. What do repeat, yoyo and repeatDelay do?

`repeat` runs the animation again (`-1` is infinite), `yoyo` makes every other repeat play backwards, and `repeatDelay` waits between repeats.

```js
gsap.to(".pulse", { scale: 1.2, repeat: -1, yoyo: true, duration: 0.8 });
```

## 9. What callbacks does GSAP provide?

`onStart`, `onUpdate`, `onComplete`, `onRepeat` and `onReverseComplete`, on both tweens and timelines.

```js
gsap.to(".loader", {
  width: "100%",
  onUpdate() { console.log(this.progress()); },
  onComplete: () => showPage(),
});
```

## 10. How do you control animations after they are created?

Tweens and timelines have methods like `play`, `pause`, `reverse`, `restart`, `seek`, `progress`, `timeScale` and `kill`.

```js
const tl = gsap.timeline({ paused: true });
button.addEventListener("mouseenter", () => tl.play());
button.addEventListener("mouseleave", () => tl.reverse());
```

## 11. Why animate transforms and opacity instead of top or width?

Transforms (`x`, `y`, `scale`, `rotation`) and `opacity` can be handled by the GPU compositor without recalculating layout. Animating `top`, `left`, `width` or `margin` forces layout every frame and can cause jank.

## 12. What is ScrollTrigger?

ScrollTrigger is a plugin that ties animations to scroll position: start when an element enters the viewport, scrub with the scrollbar, pin sections and more.

```js
gsap.registerPlugin(ScrollTrigger);

gsap.from(".feature", {
  opacity: 0, y: 60,
  scrollTrigger: { trigger: ".feature", start: "top 80%" },
});
```

## 13. What do start and end mean in ScrollTrigger?

Each is "trigger position, viewport position". `start: "top 80%"` means it starts when the top of the trigger reaches 80% down the viewport. `end` works the same way and can be relative, like `"+=500"`.

## 14. What does scrub do?

`scrub` links the animation's progress directly to the scroll position, so scrolling back plays it backwards. A number adds smoothing in seconds.

```js
gsap.to(".progress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 },
});
```

## 15. What is pinning?

`pin: true` fixes an element in place while you scroll through the trigger's range, which is common for storytelling sections and horizontal scroll.

```js
const sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: { trigger: ".horizontal", pin: true, scrub: 1, end: "+=3000" },
});
```

## 16. What does toggleActions control?

Four actions for onEnter, onLeave, onEnterBack and onLeaveBack. Values include `play`, `pause`, `resume`, `reverse`, `restart`, `reset`, `complete` and `none`.

```js
scrollTrigger: { trigger: ".box", toggleActions: "play reverse play reverse" }
```

## 17. How do you debug ScrollTrigger?

Add `markers: true` to see start and end lines on the page. Call `ScrollTrigger.refresh()` after content changes size, such as images loading or fonts swapping.

## 18. How do you use GSAP in React?

Use the `useGSAP` hook from `@gsap/react`. It runs after render and automatically reverts every animation and ScrollTrigger created inside it when the component unmounts. A `scope` ref makes selector text only match inside your component.

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(".title", { y: 50, opacity: 0, duration: 0.8 });
  }, { scope: container });

  return <div ref={container}><h1 className="title">Hello</h1></div>;
}
```

## 19. Why is cleanup important in React?

Without cleanup, animations and ScrollTriggers keep running after a component unmounts, causing memory leaks and errors. React Strict Mode also runs effects twice in development, which creates duplicate animations. `useGSAP` or `gsap.context()` with `ctx.revert()` solves both.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, ref);
  return () => ctx.revert();
}, []);
```

## 20. How do you run GSAP code from event handlers in React?

Wrap the handler with `contextSafe` from `useGSAP`, so animations created on click are also cleaned up.

```tsx
const { contextSafe } = useGSAP({ scope: container });
const onClick = contextSafe(() => {
  gsap.to(".box", { rotation: "+=180" });
});
```

## 21. What is gsap.matchMedia?

It creates animations only for certain media queries and reverts them automatically when the query stops matching. Great for responsive animations and reduced motion.

```js
const mm = gsap.matchMedia();
mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
  gsap.to(".hero-img", { y: -100, scrollTrigger: { scrub: true } });
});
```

## 22. What are quickTo and quickSetter?

They create optimized functions for values that update very often, such as following the mouse, without making a new tween every time.

```js
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3, ease: "power3" });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.3, ease: "power3" });
window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY); });
```

## 23. What are some useful GSAP plugins?

ScrollTrigger (scroll animations), Flip (animate layout changes smoothly), SplitText (split text into lines, words and characters), MotionPath (move along an SVG path), Draggable (drag and throw), MorphSVG and DrawSVG (SVG effects), and ScrollSmoother (smooth scrolling).

## 24. What is the Flip plugin?

Flip records an element's current position, lets you change the layout however you like, then animates from the old position to the new one.

```js
const state = Flip.getState(".item");
container.classList.toggle("grid-view"); // change layout
Flip.from(state, { duration: 0.6, ease: "power2.inOut", stagger: 0.05 });
```

## 25. How do you prevent a flash of content before an animation starts?

Hide elements with CSS first (for example `visibility: hidden`), then use `autoAlpha`, which animates opacity and sets visibility for you. In Next.js, make sure the animation runs on the client and hide only what you actually animate.

```css
.reveal { visibility: hidden; }
```

```js
gsap.to(".reveal", { autoAlpha: 1, y: 0, duration: 0.6 });
```

## Quick revision checklist

- Build a timeline with labels and the position parameter.
- Explain ScrollTrigger `start`, `end`, `scrub` and `pin`.
- Show `useGSAP` with `scope` and `contextSafe` in a React component.
- Know why transforms perform better than layout properties.
