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

## What are the rules of hooks?

Call hooks only at the top level of a component or custom hook, never inside conditions, loops or nested functions, and call them only from React function components or other hooks. React matches each hook to its stored state by the **order** of the calls, so the order must be the same on every render. The `eslint-plugin-react-hooks` package enforces these rules and also checks dependency arrays.

## What is the difference between useState and useRef?

Both keep a value between renders, but changing `useState` triggers a re-render and changing `ref.current` does not. Use state for anything that should appear on screen. Use a ref for values that must persist without rendering: a DOM element, a timer ID, or the previous value of a prop.

## When would you use useReducer instead of useState?

Choose `useReducer` when several values change together, when the next state depends on the previous one in non-trivial ways, or when you want all transitions described in one place, which also makes them easier to test:

```tsx
type Action = { type: "add" } | { type: "reset" };

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add": return state + 1;
    case "reset": return 0;
  }
}

const [count, dispatch] = useReducer(reducer, 0);
```

## What does the dependency array do?

It lists the values an effect reads. React re-runs the effect only when one of them changed, compared with `Object.is`. An empty array means "run after the first render only", and leaving the array out means "run after every render". Missing dependencies are a common source of stale-closure bugs, so follow the lint rule instead of silencing it.

## What is the difference between useEffect and useLayoutEffect?

`useEffect` runs after the browser has painted, so it does not block the screen. `useLayoutEffect` runs after React updates the DOM but before the browser paints, which makes it the right tool when you must measure an element and adjust the layout before the user sees anything. Use it sparingly, because it delays painting.

## How do you share logic between components?

Write a custom hook, which is a function whose name starts with `use` and that calls other hooks. Each component that calls the hook gets its **own** copy of the state, so custom hooks share logic, not data. To share data, lift the state up or use context.

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

## How to answer in an interview

Explain the idea behind each hook before the syntax. For example, "useEffect synchronizes a component with something outside React" is a stronger start than "it runs after render". Then mention one pitfall, such as a missing cleanup or dependency, to show you have debugged these problems in real code.
