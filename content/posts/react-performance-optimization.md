---
title: "React performance optimization: questions and answers"
description: "Memoization, re-renders, code splitting and lists: how to answer performance questions with substance."
date: "2026-10-10"
category: "React"
readTime: "6 min read"
links:
  - "React: memo|https://react.dev/reference/react/memo"
  - "React: Render and commit|https://react.dev/learn/render-and-commit"
  - "Core Web Vitals|https://web.dev/articles/vitals"
---

## How do you find a performance problem first?

Measure before optimizing. Use the React DevTools Profiler to see which components re-render and why, and Lighthouse for page-level metrics.

## When does a component re-render?

When its state changes, when its parent re-renders, or when a context it consumes changes.

## What do React.memo, useMemo and useCallback do?

`React.memo` skips re-rendering when props are unchanged. `useMemo` caches a value and `useCallback` caches a function, which keeps props stable for memoized children.

## How do you speed up long lists?

Use stable `key` values (not array index for changing lists) and virtualize large lists so only visible rows render.

## How do you reduce bundle size?

Split code with `React.lazy` and `Suspense`, or `next/dynamic` in Next.js, and load heavy libraries only where needed.

## Does moving state down help?

Yes. Keep state in the smallest component that needs it so fewer components re-render.

## Example: memoizing a child

```tsx
const Row = React.memo(function Row({ name, onSelect }: { name: string; onSelect: (n: string) => void }) {
  return <li onClick={() => onSelect(name)}>{name}</li>;
});

function List({ names }: { names: string[] }) {
  const onSelect = useCallback((n: string) => console.log(n), []);
  return <ul>{names.map((n) => <Row key={n} name={n} onSelect={onSelect} />)}</ul>;
}
```

Without `useCallback`, `onSelect` is a new function every render and `memo` would not help.

## Example: lazy load a heavy component

```tsx
const Chart = React.lazy(() => import("./Chart"));

<Suspense fallback={<p>Loading chart...</p>}>
  <Chart />
</Suspense>
```

## Example: state moved down

Keep a search input's state inside the search component instead of the page. Typing then re-renders only that component, not the whole page.

**Rule to say in interviews:** measure first, optimize the slow part, then measure again.
