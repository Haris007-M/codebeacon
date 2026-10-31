---
title: "Responsive design interview questions: mobile-first, media queries and container queries"
description: "Mobile-first design, media queries, fluid typography with clamp, container queries, responsive images and testing: answers and code for frontend interviews."
date: "2026-10-31"
category: "Frontend"
readTime: "8 min read"
links:
  - "web.dev: Learn Responsive Design|https://web.dev/learn/design"
  - "MDN: Using media queries|https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries"
  - "MDN: Container queries|https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries"
---

More than half of web traffic comes from phones, so responsive design is a basic skill rather than a bonus. Interviewers want to see that you design for the small screen first and that you can pick the right tool: media queries, fluid sizing or container queries.

## 1. What is responsive web design?

It is building one site that adapts to any screen size and input method, using fluid layouts, flexible images and CSS media queries. The aim is that content stays readable and usable on a phone, tablet, laptop and large monitor without a separate site for each.

## 2. What does mobile-first mean and why use it?

You write the base CSS for the smallest screen, then add `min-width` media queries to enhance the layout for larger screens. Benefits: phones download simpler CSS, you are forced to prioritise content, and you override less because the default is the simplest layout.

```css
.cards { display: grid; gap: 1rem; }              /* one column by default */
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```

Tailwind works this way: unprefixed classes apply to all sizes, and `md:` and `lg:` apply from that width upward.

## 3. What is the difference between min-width and max-width media queries?

`min-width` applies styles **from** a width upward, so it suits mobile-first. `max-width` applies **up to** a width, so it suits desktop-first. Pick one approach per project, because mixing them makes the rules hard to follow.

## 4. How do you choose breakpoints?

Base them on where your **content** starts to look bad, not on specific devices, because there are too many devices. Common starting points are about 640px, 768px, 1024px and 1280px. Resize the browser slowly and add a breakpoint where the layout breaks.

## 5. What is the viewport meta tag, and what happens without it?

`<meta name="viewport" content="width=device-width, initial-scale=1">` makes mobile browsers use the real device width. Without it, mobile browsers render the page at about 980px and scale it down, so your media queries never apply as you expect.

## 6. How do you make images responsive?

Make them fluid with CSS and let the browser pick the right file:

```css
img { max-width: 100%; height: auto; }
```

```html
<img src="card-800.webp"
     srcset="card-400.webp 400w, card-800.webp 800w, card-1200.webp 1200w"
     sizes="(min-width: 1024px) 400px, 100vw"
     width="800" height="450" alt="Course preview" />
```

`srcset` lists the files and their real widths, and `sizes` tells the browser how wide the image will be. In Next.js, `next/image` creates all of this for you.

## 7. What is fluid typography and how does clamp work?

Fluid typography scales text smoothly between a minimum and a maximum instead of jumping at breakpoints. `clamp(min, preferred, max)` does it in one line.

```css
h1 { font-size: clamp(1.75rem, 1rem + 3vw, 3.5rem); }
```

The size never goes below 1.75rem or above 3.5rem, and scales with the viewport in between. Include a `rem` part in the middle value, not only `vw`, so users who zoom the text still get bigger text.

## 8. What are container queries and when are they better than media queries?

A media query looks at the **viewport**. A container query looks at the **size of a parent container**, so a component can adapt to the space it has, wherever you place it. That is much better for reusable components such as a card that appears in a wide main column and in a narrow sidebar.

```css
.card-wrap { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}
```

Container queries are now supported in all major browsers.

## 9. How do you handle touch devices?

Make tap targets at least about 44 by 44 pixels, leave space between them, and do not rely on hover for anything important. Use `@media (hover: hover)` to apply hover effects only on devices that can hover, and `@media (pointer: coarse)` to adjust for fingers.

## 10. What is the difference between vh and dvh?

On mobile, the browser toolbar appears and disappears, so `100vh` can be taller than the visible area and cut off content. `dvh` (dynamic viewport height) follows the visible area. Use `min-height: 100dvh` for full-screen sections on mobile.

## 11. How do you make a navigation bar responsive?

On large screens show the links in a row. On small screens, collapse them into a menu button that opens a panel. Use a real `<button>` with `aria-expanded` and `aria-controls`, keep the menu keyboard accessible, close it on route change or Escape, and make tap targets large.

## 12. How do you handle tables on small screens?

Wide tables overflow. Options: wrap the table in a container with `overflow-x: auto` so it scrolls sideways, or reshape each row into a stacked card on small screens. Choose based on how much the user needs to compare columns.

## 13. How do you test responsive layouts?

Use the browser's device toolbar for quick checks, then drag the width through every size (not only common ones), and test on at least one real phone, because touch, scrolling and the keyboard behave differently. Also test landscape orientation, text zoom to 200% and a slow network.

## Quick revision checklist

- Write mobile-first CSS with `min-width` queries and add the viewport meta tag.
- Pick breakpoints by content, not by device.
- Use `max-width: 100%` for images and `srcset` or `next/image` for sizes.
- Use `clamp()` for fluid type and container queries for reusable components.
- Use big tap targets, and use `dvh` for full-height mobile sections.
