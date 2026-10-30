---
title: "25 React interview questions and answers with examples (2026)"
description: "The React interview questions asked most in 2026: rendering, state, hooks, keys, context, Suspense, Server Components and performance, each with a short answer and a code example."
date: "2026-10-30"
category: "React"
readTime: "18 min read"
links:
  - "React docs: Learn React|https://react.dev/learn"
  - "React docs: API reference|https://react.dev/reference/react"
  - "Server Components|https://react.dev/reference/rsc/server-components"
---

These are the React questions that come up again and again in frontend interviews, from junior screens to senior rounds. Each answer is short enough to say out loud, with a code example you can sketch on a whiteboard. For a deeper look at hooks, read our [React Hooks interview questions](/blog/react-hooks-interview-questions).

## 1. What is React and why would you use it?

React is a JavaScript library for building user interfaces out of components. You describe what the UI should look like for a given state, and React works out the minimum DOM changes needed when that state changes. The main benefits are reusable components, a predictable one-way data flow and a huge ecosystem.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

## 2. What is JSX?

JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. A compiler turns it into function calls that create React elements. It is not HTML: attributes use camelCase (`className`, `onClick`) and any JavaScript expression goes inside curly braces.

```jsx
const el = <button className="btn" onClick={save}>Save {count}</button>;
// compiles to roughly:
// jsx("button", { className: "btn", onClick: save, children: ["Save ", count] })
```

## 3. What is the virtual DOM and how does reconciliation work?

React keeps a lightweight description of the UI in memory. When state changes, it renders a new description, compares it with the previous one (reconciliation, or "diffing") and applies only the differences to the real DOM. Two rules make this fast: elements of a different type are replaced entirely, and `key` tells React which list items are the same between renders.

## 4. What is the difference between props and state?

Props are inputs passed from a parent and are read-only inside the component. State is data the component owns and can change with a setter, which triggers a re-render.

```jsx
function Counter({ step }) {          // step is a prop
  const [count, setCount] = useState(0); // count is state
  return <button onClick={() => setCount(count + step)}>{count}</button>;
}
```

## 5. Why do lists need keys, and why not use the index?

Keys let React match items between renders so it can reuse, move or remove the right DOM nodes and keep each item's state attached to it. Using the array index breaks this when items are inserted, removed or reordered: state and input values end up on the wrong row. Use a stable ID from your data.

```jsx
{todos.map((t) => <TodoItem key={t.id} todo={t} />)}
```

## 6. What is the difference between controlled and uncontrolled components?

A controlled input gets its value from React state and updates through `onChange`, so React is the single source of truth. An uncontrolled input keeps its own value in the DOM and you read it with a ref or from the form on submit.

```jsx
// Controlled
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />

// Uncontrolled
const ref = useRef(null);
<input defaultValue="" ref={ref} />  // read ref.current.value on submit
```

## 7. What causes a component to re-render?

A component re-renders when its state changes, when its parent re-renders, or when a context it reads changes. Changing props alone does not cause a render; the parent rendering does. A re-render is not the same as a DOM update: React only touches the DOM if the output changed.

## 8. Why is state update "asynchronous"? What is batching?

Calling a setter does not change the variable immediately. It schedules a new render, and React batches several updates in the same event (and, since React 18, in promises and timeouts too) into one render.

```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  // count only goes up by 1: both read the same old value
  setCount((c) => c + 1);
  setCount((c) => c + 1);
  // functional updates queue up: +2
}
```

## 9. What is lifting state up?

When two sibling components need the same data, move the state to their closest common parent and pass it down as props, along with a function to change it. This keeps one source of truth.

```jsx
function Filters() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <Results query={query} />
    </>
  );
}
```

## 10. What is prop drilling and how do you avoid it?

Prop drilling is passing props through several components that do not use them, just to reach a deep child. Fixes include component composition (passing `children`), Context for app-wide values like theme or user, or a state library such as Zustand or Redux for complex shared state.

## 11. How does the Context API work?

You create a context, wrap part of the tree in its Provider with a value, and read it anywhere below with `useContext`. Every consumer re-renders when the value changes, so keep context values small and stable.

```jsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // "dark"
  return <div className={theme}>...</div>;
}
```

## 12. What is the difference between useEffect and useLayoutEffect?

`useEffect` runs after the browser has painted, so it does not block the screen. `useLayoutEffect` runs after the DOM updates but before paint. Use it only when you must measure the DOM and adjust it before the user sees a flicker, such as positioning a tooltip.

## 13. What is the cleanup function in useEffect?

The function you return from an effect runs before the effect re-runs and when the component unmounts. Use it to remove listeners, clear timers, cancel requests and unsubscribe.

```jsx
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

## 14. What is useRef used for?

`useRef` gives you a mutable box (`ref.current`) that survives renders without causing one when it changes. Two common uses: holding a DOM node, and storing values like timer IDs or the previous value.

```jsx
function Search() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

## 15. When would you use useReducer instead of useState?

Use `useReducer` when state has several related fields or when the next state depends on the previous one in many ways. It puts all update logic in one pure function, which is easier to test.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "add": return { ...state, items: [...state.items, action.item] };
    case "clear": return { ...state, items: [] };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { items: [] });
dispatch({ type: "add", item: "Milk" });
```

## 16. What are custom hooks?

A custom hook is a function whose name starts with `use` and which calls other hooks. It lets you share stateful logic between components without sharing UI.

```jsx
function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return online;
}
```

## 17. What are the rules of hooks?

Call hooks only at the top level of a component or custom hook, never inside conditions, loops or nested functions, and only from React functions. React identifies each hook by its call order, so the order must be the same on every render.

```jsx
// Wrong
if (loggedIn) { const [x, setX] = useState(0); }
// Right
const [x, setX] = useState(0);
if (loggedIn) { /* use x */ }
```

## 18. What does React.memo do?

`React.memo` wraps a component so it skips re-rendering when its props are shallowly equal to last time. It only helps if the props really are stable, which is why it is often paired with `useCallback` and `useMemo`.

```jsx
const Row = React.memo(function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
});

// in the parent
const onSelect = useCallback((id) => setSelected(id), []);
```

Note: the React Compiler can add this memoization automatically, so in projects that use it you write far fewer `memo`, `useMemo` and `useCallback` calls by hand.

## 19. What are fragments?

A fragment groups several elements without adding an extra DOM node. Use the short syntax `<>...</>`, or `<Fragment key={...}>` when you need a key in a list.

```jsx
function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Email</td>
    </>
  );
}
```

## 20. What is an error boundary?

An error boundary is a component that catches errors thrown while rendering its children and shows a fallback UI instead of crashing the whole app. It still has to be a class component (or you use a library like `react-error-boundary`). It does not catch errors in event handlers or async code.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() { return this.state.hasError ? <p>Something went wrong.</p> : this.props.children; }
}
```

## 21. What are lazy loading and Suspense?

`React.lazy` loads a component's code only when it is first rendered, which shrinks the initial bundle. `Suspense` shows a fallback while that code (or data, in frameworks that support it) is loading.

```jsx
const Chart = lazy(() => import("./Chart"));

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <Chart />
    </Suspense>
  );
}
```

## 22. What are portals?

A portal renders children into a different DOM node, outside the parent's DOM hierarchy, while keeping them in the same React tree (so context and event bubbling still work). Typical uses are modals, toasts and tooltips that must escape `overflow: hidden`.

```jsx
function Modal({ children }) {
  return createPortal(<div className="modal">{children}</div>, document.body);
}
```

## 23. What are React Server Components?

Server Components run only on the server. They can read from a database or file system directly, and their code never ships to the browser, which cuts bundle size. They cannot use state, effects or browser APIs. Add `"use client"` at the top of a file to make it a Client Component when you need interactivity. Frameworks like Next.js use Server Components by default.

```jsx
// Server Component (default in Next.js App Router)
export default async function Posts() {
  const posts = await db.post.findMany();
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## 24. What are useTransition and useDeferredValue?

Both mark some updates as non-urgent so typing and clicking stay responsive. `useTransition` wraps a state update you control. `useDeferredValue` gives you a lagging copy of a value you receive.

```jsx
const [isPending, startTransition] = useTransition();

function onChange(e) {
  setQuery(e.target.value);              // urgent: update the input
  startTransition(() => setFilter(e.target.value)); // can wait: filter a big list
}
```

## 25. How do you optimize a slow React app?

Measure first with the React DevTools Profiler. Then the usual fixes are: keep state close to where it is used so fewer components re-render, memoize expensive work, virtualize long lists (react-window or TanStack Virtual), code-split with `lazy`, avoid creating new objects in props on every render, and move non-interactive parts to Server Components. Our [React performance guide](/blog/react-performance-optimization) goes into each one.

## Quick revision checklist

- Explain rendering, reconciliation and keys in your own words.
- Know when state updates are batched and why functional updates fix it.
- Be able to write a fetch with cleanup and a custom hook from memory.
- Understand Server vs Client Components and where `"use client"` goes.
