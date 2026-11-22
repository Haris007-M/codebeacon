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

Closures and the event loop are two of the most frequently asked JavaScript topics, and they are connected: both explain how JavaScript handles scope and time. Interviewers rarely want a textbook definition. They want to see that you can predict what a snippet prints and explain why. This guide gives short answers first, then the detail and examples that make them stick.

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

## What are practical uses of closures?

Closures appear everywhere in real code, even when you do not notice them:

- **Private state:** a function keeps a variable that nothing else can touch.
- **Function factories:** a function that returns a customized function, such as `makeMultiplier(3)`.
- **Callbacks and event handlers:** a handler remembers the data that existed when it was created.
- **Memoization and debouncing:** a cache or a timer lives on between calls.

```js
function createAccount(balance) {
  return {
    deposit(amount) { balance += amount; return balance; },
    getBalance: () => balance,
  };
}

const account = createAccount(100);
account.deposit(50);          // 150
account.balance;              // undefined: the variable is private
```

## Can closures cause memory leaks?

A closure keeps the variables it uses alive for as long as the function itself can be reached. If you attach an event listener that references a large object and never remove the listener, that object cannot be garbage collected. The fix is to remove listeners you no longer need, clear timers and intervals, and drop references when a component or feature is finished. Closures are not a problem by themselves. Forgotten references are.

## What are the call stack, the task queue and the microtask queue?

The **call stack** is where JavaScript runs your code, one function at a time. Timers, network requests and DOM events are handled outside the stack by the browser, and when they finish, their callbacks wait in a queue.

- **Macrotasks** include timers such as `setTimeout`, user events and most I/O.
- **Microtasks** include promise callbacks (`.then`, `.catch`), `queueMicrotask` and the code that runs after an `await`.

After each macrotask finishes, the engine empties the whole microtask queue before starting the next macrotask. That rule explains most "what does this print?" questions.

## Why does setTimeout with 0 not run immediately?

The callback is placed in the macrotask queue, so it can only run after the current script finishes and after every pending microtask. Browsers may also enforce a small minimum delay for deeply nested timers. A delay of `0` means "as soon as possible after the current work", not "now".

## What will this code print?

```js
console.log("A");
setTimeout(() => console.log("B"), 0);

(async () => {
  console.log("C");
  await null;
  console.log("D");
})();

Promise.resolve().then(() => console.log("E"));
console.log("F");
// A, C, F, D, E, B
```

Walk through it in order. `A`, `C` and `F` are synchronous, and the async function runs synchronously until its first `await`. The code after `await` (`D`) and the `.then` callback (`E`) are microtasks, so they run next, in the order they were queued. The timer callback (`B`) is a macrotask and runs last.

## How do async and await relate to promises?

`async` and `await` are syntax built on promises. An `async` function always returns a promise, and `await` pauses **that function**, not the whole program, until the promise settles. The rest of the function then continues as a microtask. This is why other code can run while you wait for a network response.

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

## Tips for explaining these in an interview

Name the three pieces (stack, queues, loop) before you trace code, and say "microtasks first, then the next macrotask" out loud. If you get a snippet wrong, trace it again line by line instead of guessing. Showing a clear method scores higher than a fast answer.
