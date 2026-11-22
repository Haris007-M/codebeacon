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

Performance questions in React interviews are really questions about judgment. Anyone can list `useMemo` and `React.memo`. Strong candidates explain how to find the slow part, why a component re-renders, and which fix is worth its cost. This guide follows that order: measure, understand rendering, then apply the smallest fix that works.

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

## Does React.memo always make things faster?

No. `React.memo` compares props shallowly on every render, and that comparison has a cost. It only pays off when a component is expensive to render and its props are usually the same. If a parent passes a new object, array or function on every render, the comparison fails every time and you get the cost without the benefit. That is why `useCallback` and `useMemo` often appear together with `memo`: they keep prop values stable. Newer tooling such as the React Compiler can add memoization automatically at build time, but you are still expected to understand how it works by hand.

## Why does context cause so many re-renders?

Every component that reads a context re-renders when the context value changes. A common mistake is creating a new object on each render of the provider, for example `value={{ user, setUser }}`, which changes the value every time even when nothing changed. Fixes: memoize the value, split one large context into several small ones, or keep fast-changing state out of context.

## Does a render always update the DOM?

No. React first **renders** (calls your components to work out what the UI should look like), then compares the result with the previous one, and only **commits** the differences to the DOM. A re-render that changes nothing is cheap for the browser but can still cost CPU time if your component does heavy work. So the goal is to avoid expensive renders, not to chase every re-render.

## How do you handle expensive work during a render?

First check that the work is really slow, because many calculations are fast enough. If it is slow, cache it with `useMemo`, move it out of the render path, or keep the interface responsive while it runs. In React 18, `useDeferredValue` and `useTransition` let urgent updates (typing) happen first and heavy updates (filtering a large list) follow:

```tsx
function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => items.filter((i) => i.includes(deferred)), [items, deferred]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </>
  );
}
```

The input stays responsive because React can interrupt the slow list update while you keep typing.

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

## Common performance mistakes

- Memoizing everything "just in case" without measuring, which adds complexity and sometimes makes things slower.
- Using the array index as a `key` in lists that can be reordered or filtered.
- Putting frequently changing state high in the tree or in a global context.
- Loading a large library on every page when only one page needs it.
- Fetching data in a chain of nested components so each request waits for the previous one.

## How to answer in an interview

Describe a process, not a list of hooks: reproduce the problem, profile it, find the component or request that is responsible, apply one targeted fix, and measure again. Mentioning a real number, such as "the list went from 300 ms to 40 ms", makes the answer memorable.
