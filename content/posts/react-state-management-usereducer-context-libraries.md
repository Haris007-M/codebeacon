---
title: "React state management: useState, useReducer, Context and when to use a library"
description: "How to choose between useState, useReducer, Context, server-state tools and libraries like Redux Toolkit, with examples and the interview answers that show good judgment."
date: "2026-10-31"
category: "React"
readTime: "8 min read"
links:
  - "React docs: Managing state|https://react.dev/learn/managing-state"
  - "React docs: useReducer|https://react.dev/reference/react/useReducer"
  - "TanStack Query|https://tanstack.com/query/latest"
  - "Redux Toolkit|https://redux-toolkit.js.org/"
---

"How do you manage state in a React app?" is a favourite senior-level question. The best answer is not a library name. It is a way of deciding, based on what kind of state you have. This guide gives you that decision process.

## 1. What kinds of state does a React app have?

Splitting state into kinds makes the right tool obvious:

- **Local UI state:** whether a menu is open, the text in an input. Use `useState`.
- **Shared client state:** the current user, a theme, items in a cart. Use lifting state up, Context or a small store.
- **Server state:** data that lives on a server, such as posts or orders. Use a data-fetching library.
- **URL state:** filters, page numbers and tabs. Keep them in the URL so links can be shared.
- **Form state:** values, errors and touched fields. Use a form library if the form is large.

## 2. When should you use useReducer instead of useState?

Use `useReducer` when state has several related fields, or when the next state depends on complex rules. It puts all the update logic in one pure function, which makes it easy to read and to test.

```tsx
type Action = { type: "add"; item: string } | { type: "remove"; index: number } | { type: "clear" };

function reducer(state: string[], action: Action): string[] {
  switch (action.type) {
    case "add": return [...state, action.item];
    case "remove": return state.filter((_, i) => i !== action.index);
    case "clear": return [];
  }
}

function Todo() {
  const [items, dispatch] = useReducer(reducer, []);
  return <button onClick={() => dispatch({ type: "add", item: "Learn React" })}>Add</button>;
}
```

A reducer must be **pure**: no fetching, no random values, no mutation of the existing state. `dispatch` also has a stable identity, so it is safe to pass down without causing extra re-renders.

## 3. What is lifting state up, and why is it the first thing to try?

When two components need the same state, move it to their closest common parent and pass it down as props. It is the simplest solution, it needs no extra tools and it keeps data flow easy to follow. Try this before reaching for Context or a library.

## 4. What problem does Context solve?

Context avoids **prop drilling**, which is passing a prop through many layers that do not use it. A provider supplies a value and any component below it can read it with `useContext`.

```tsx
const ThemeContext = createContext<"light" | "dark">("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

It works best for values that change rarely, such as theme, locale and the logged-in user.

## 5. What is the performance problem with Context?

When the value of a Context changes, **every component that reads it re-renders**, even if it uses only a small part of the value. If you put a big, frequently changing object in one Context, a lot of the tree re-renders.

Ways to reduce the problem:

- Split into several smaller contexts, for example separate state and dispatch contexts.
- Memoize the value you pass in, using `useMemo`, so it does not change on every render.
- Move fast-changing state down, closer to where it is used.
- Use a store library with selectors when updates are frequent.

## 6. Is Context a state management tool?

Not by itself. Context is a way to **pass values down** the tree. The state still lives in `useState` or `useReducer` inside the provider. Combining `useReducer` with Context is a good pattern for medium-sized features, with no library needed.

## 7. What is server state and why should it be handled differently?

Server state is data you do not own: it can be out of date, shared between users and slow to fetch. It needs caching, loading and error states, retries, refetching on focus and invalidation after changes. Putting it in `useState` plus `useEffect` means rewriting all of that by hand.

Libraries such as **TanStack Query** or SWR manage it for you:

```tsx
const { data, isPending, error } = useQuery({
  queryKey: ["posts"],
  queryFn: () => fetch("/api/posts").then((r) => r.json()),
});
```

In Next.js, Server Components can often fetch data directly, which removes the need for client-side state for many pages.

## 8. When do you need Redux, Zustand or another library?

Reach for a store when many distant components share state that changes often, when you need strong debugging tools such as time-travel and logging, or when the logic is complex enough to need a clear structure. **Redux Toolkit** is the standard way to use Redux and removes most of the old boilerplate. **Zustand** and similar libraries are smaller and need less setup.

The interview-ready answer is: "I start local, lift when needed, use Context for low-frequency values, a query library for server data, and add a store only when the app has real shared client state."

## 9. Should you store derived data in state?

No. If you can calculate a value from existing state or props, calculate it during render. Storing a copy creates two sources of truth that can get out of sync.

```tsx
// Avoid
const [filtered, setFiltered] = useState(items);

// Prefer
const filtered = items.filter((i) => i.name.includes(query));
```

If the calculation is expensive, wrap it in `useMemo`.

## 10. What is the difference between state and a ref?

State changes trigger a re-render. A `ref` holds a value that persists across renders but does **not** cause a re-render when it changes. Use refs for DOM nodes, timers and values you need to remember without showing them on screen.

## 11. How should you structure state in a large app?

Keep state as close as possible to where it is used (colocation), and move it up only when sharing requires it. Group state by feature rather than putting everything in one global store. Keep server state, URL state and UI state separate. This keeps components small and makes changes safer.

## Quick revision checklist

- Name the kind of state first: local, shared, server, URL or form.
- `useState` for simple state, `useReducer` for related fields and complex updates.
- Lift state up before using Context, and use Context for values that change rarely.
- Use a query library for server data, and a store only when you truly need it.
- Do not store values you can derive during render.
