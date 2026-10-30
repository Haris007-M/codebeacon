---
title: "Frontend developer interview roadmap: what to study and in what order"
description: "A practical study plan covering HTML, CSS, JavaScript, React, Git and system design basics."
date: "2026-10-02"
category: "Frontend"
readTime: "5 min read"
links:
  - "Frontend roadmap|https://roadmap.sh/frontend"
  - "MDN: Learn web development|https://developer.mozilla.org/en-US/docs/Learn_web_development"
  - "web.dev Learn|https://web.dev/learn"
---

## Start with fundamentals

Semantic HTML, the CSS box model, flexbox, grid, and responsive design. Many interviews begin here, and weak basics cost points fast.

## Master JavaScript next

Scope, closures, `this`, prototypes, promises, async/await and the event loop. Practice explaining each out loud.

## Then your framework

For React: components, props vs state, hooks, rendering, keys, context and performance. For Next.js: routing, server vs client components and data fetching.

## Add the tools

Git workflows, TypeScript basics, testing with Jest or Vitest, and how to debug in browser DevTools.

## Practice the format

Do small coding exercises, build one real project you can walk through in detail, and prepare short stories about problems you solved.

## Accessibility and performance

Know semantic markup, keyboard focus, alt text, and the Core Web Vitals (LCP, INP, CLS). They separate strong candidates from average ones.

## A four-week plan

- **Week 1:** HTML, CSS layout (flexbox, grid), responsive design, accessibility basics.
- **Week 2:** JavaScript core: closures, promises, array methods, DOM events.
- **Week 3:** React and Next.js: hooks, rendering, routing, data fetching.
- **Week 4:** Git, TypeScript, performance, then mock interviews.

## Practice exercises worth doing

```js
// 1. Flatten a nested array
const flat = [1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// 2. Count word frequency
const count = (s) => s.split(/\s+/).reduce((m, w) => ({ ...m, [w]: (m[w] || 0) + 1 }), {});
```

## Projects that impress interviewers

A searchable list with filters, a form with validation, and a dashboard that fetches live data. Be ready to explain every decision in each one.
