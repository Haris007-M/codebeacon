---
title: "React Hooks interview questions you should be able to answer"
description: "useState, useEffect, useMemo and useCallback: the questions interviewers ask most, with short, correct answers."
date: "2026-10-20"
category: "React"
readTime: "6 min read"
links:
  - "React docs: Built-in hooks|https://react.dev/reference/react/hooks"
  - "Synchronizing with effects|https://react.dev/learn/synchronizing-with-effects"
  - "You might not need an effect|https://react.dev/learn/you-might-not-need-an-effect"
---

Interviewers use hooks to check whether you understand how React renders, not whether you can recite an API. Here are the questions that come up most.

## What is the difference between useMemo and useCallback?

`useMemo` caches a computed **value**. `useCallback` caches a **function**. Both only re-run when their dependencies change, and both are optimizations, not guarantees. Use them when a calculation is expensive or when a stable function reference stops a memoized child from re-rendering.

## Why does useEffect run twice in development?

In React Strict Mode, React mounts, unmounts and remounts components in development to expose effects that are missing cleanup. It does not happen in production. If your effect breaks when run twice, it needs a cleanup function.

## How do you fix a stale closure in an effect?

A stale closure happens when an effect reads state from an old render. Fix it by adding the value to the dependency array, or by using the functional form of the setter:

```js
setCount((c) => c + 1);
```

## When should you avoid useEffect?

Do not use it to derive state from props or state. Calculate the value during render instead. Use effects only to sync with something outside React, such as the network, the DOM or a subscription.

## Practice: fetch data with cleanup

Interviewers love this because it tests effects, cleanup and race conditions together.

```tsx
function User({ id }: { id: string }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/users/${id}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(setUser)
      .catch((e) => e.name !== "AbortError" && console.error(e));
    return () => controller.abort(); // cancels the old request when id changes
  }, [id]);

  return <p>{user ? user.name : "Loading..."}</p>;
}
```

## Practice: write a custom hook

```tsx
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
```

**Follow-up to expect:** why is the cleanup function needed? Because without it, a fast typist would leave several timers running and old values could win.
