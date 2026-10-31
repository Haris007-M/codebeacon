---
title: "How browsers render a page: critical rendering path, reflow and repaint"
description: "What happens between receiving HTML and seeing pixels: DOM, CSSOM, layout, paint and compositing, why scripts block rendering, and how to avoid layout thrashing."
date: "2026-10-31"
category: "Frontend"
readTime: "8 min read"
links:
  - "web.dev: Critical rendering path|https://web.dev/articles/critical-rendering-path"
  - "web.dev: Rendering performance|https://web.dev/articles/rendering-performance"
  - "MDN: Web performance|https://developer.mozilla.org/en-US/docs/Web/Performance"
---

"What happens when you type a URL and press Enter?" is a classic question, and so is "why is this animation janky?". Both are answered by understanding how the browser turns code into pixels. This guide covers the steps and the performance rules that follow from them.

## 1. What happens when you type a URL and press Enter?

In short:

1. The browser looks up the IP address with **DNS**.
2. It opens a connection to the server (TCP, and TLS for HTTPS).
3. It sends an HTTP request and receives the HTML response.
4. It parses the HTML, finds more resources such as CSS, JavaScript, images and fonts, and requests them.
5. It builds the page and paints it on the screen.

An interviewer usually wants you to go deeper into steps 4 and 5, which is the rest of this article.

## 2. What is the critical rendering path?

It is the sequence of steps the browser must complete before it can show the first pixels:

1. Parse HTML to build the **DOM** (Document Object Model).
2. Parse CSS to build the **CSSOM** (CSS Object Model).
3. Combine them into the **render tree**, which only contains visible elements. Elements with `display: none` are left out.
4. **Layout:** calculate the size and position of every box.
5. **Paint:** fill in pixels for text, colours, borders and images.
6. **Composite:** combine painted layers on the GPU in the right order.

## 3. Why is CSS called render-blocking?

The browser will not paint until it has the CSSOM, because showing unstyled content and then restyling it would flash and waste work. So a stylesheet in the `<head>` delays the first paint. Keep critical CSS small, avoid long chains of `@import` and remove unused styles. Frameworks like Tailwind produce a small CSS file, which helps.

## 4. Why can JavaScript block rendering, and what do async and defer do?

A normal `<script>` is **parser-blocking**: the HTML parser stops, downloads and runs the script, and only then continues. The script might change the DOM, so the browser has to wait.

- `defer` downloads the script in parallel and runs it after the HTML is parsed, in order.
- `async` downloads in parallel and runs as soon as it is ready, in any order.

```html
<script src="/app.js" defer></script>
<script src="/analytics.js" async></script>
```

Use `defer` for your own code and `async` for independent scripts such as analytics. Modern frameworks, including Next.js, handle this for you.

## 5. What is the difference between reflow and repaint?

A **reflow** (layout) recalculates sizes and positions. It is triggered by changing things like `width`, `height`, `margin`, `font-size`, adding or removing elements, or resizing the window. A reflow of one element can affect its children, siblings and parents.

A **repaint** only redraws pixels when the look changes but the geometry does not, for example changing `color` or `background-color`.

Reflow is more expensive than repaint, and changes that only need compositing are the cheapest.

## 6. Which CSS properties are cheapest to animate?

`transform` and `opacity`. The browser can promote the element to its own layer and let the GPU move or fade it without recalculating layout or repainting other content. Animating `top`, `left`, `width` or `height` forces layout on every frame, which causes dropped frames and jank.

```css
/* smooth */
.card { transition: transform 0.3s, opacity 0.3s; }
.card:hover { transform: translateY(-4px); }
```

This is also why animation libraries such as GSAP and Framer Motion favour transforms.

## 7. What is layout thrashing?

Layout thrashing happens when you alternate **reading** layout values (`offsetHeight`, `getBoundingClientRect()`) and **writing** styles in a loop. Each read forces the browser to recalculate layout immediately to give an accurate answer, so it does the work many times instead of once.

```js
// Slow: read, write, read, write...
items.forEach((el) => {
  const h = el.offsetHeight;
  el.style.height = h + 10 + "px";
});

// Better: batch all the reads, then all the writes
const heights = items.map((el) => el.offsetHeight);
items.forEach((el, i) => { el.style.height = heights[i] + 10 + "px"; });
```

## 8. What is requestAnimationFrame for?

`requestAnimationFrame` runs your callback right before the next paint, usually 60 times per second. Use it for visual updates in JavaScript so they are in sync with the screen and do not run when the tab is hidden. Do not use `setTimeout` for animation, because its timing does not line up with frames.

## 9. What does will-change do and when should you avoid it?

`will-change: transform` tells the browser in advance that an element will change, so it can prepare a separate layer. It can help with heavy animations, but every layer uses memory. Use it on a few elements that really animate, not on everything, and remove it when the animation ends.

## 10. Why does the page jump when images load, and how do you stop it?

If the browser does not know an image's size, it reserves no space, then reflows the page when the image arrives. This is a layout shift. Set `width` and `height` attributes (or CSS `aspect-ratio`) so the space is reserved. Next.js `next/image` requires dimensions for this reason.

## 11. How do you find rendering problems?

Open Chrome DevTools and use the **Performance** panel to record an interaction. Look for long tasks, layout and paint events, and dropped frames. The **Rendering** tab can highlight paint areas and layout shifts. Lighthouse gives a quick summary, but the Performance panel shows the cause.

## Quick revision checklist

- DOM + CSSOM, then render tree, layout, paint and composite.
- CSS blocks rendering, and scripts block parsing unless they use `defer` or `async`.
- Reflow is costlier than repaint, and `transform` and `opacity` are the cheapest to animate.
- Batch reads and writes to avoid layout thrashing, and reserve space for images.
