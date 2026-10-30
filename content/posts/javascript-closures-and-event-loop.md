---
title: "JavaScript closures and the event loop, explained for interviews"
description: "Two topics that appear in almost every JavaScript interview, with the explanations that score well."
date: "2026-10-15"
category: "JavaScript"
readTime: "6 min read"
links:
  - "MDN: Closures|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
  - "MDN: The event loop|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"
  - "The Modern JavaScript Tutorial|https://javascript.info"
---

## What is a closure?

A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished.

```js
function counter() {
  let n = 0;
  return () => ++n;
}
const next = counter();
next(); // 1
next(); // 2
```

## Why does a var loop with setTimeout print the same number?

`var` is function-scoped, so every callback shares one variable. Use `let`, which creates a new binding per iteration.

## How does the event loop work?

JavaScript runs one task at a time on the call stack. Async callbacks wait in queues. When the stack is empty, the loop runs **all microtasks** (promises) first, then the next macrotask (timers, events).

```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4); // 1, 4, 3, 2
```

## What is the difference between == and ===?

`==` coerces types before comparing. `===` does not. Prefer `===`.

## Example: write a debounce function

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const onSearch = debounce((q) => console.log("search", q), 300);
```

This is a closure in practice: `timer` lives on between calls.

## Example: run promises in parallel

```js
const [user, posts] = await Promise.all([
  fetch("/api/user").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);
```

Awaiting them one after another would take the sum of both times. `Promise.all` takes only the longer one.

## Example: fix the loop

```js
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 0 1 2
```
