---
title: "JavaScript coding interview problems with solutions: flatten, deep clone, memoize and more"
description: "Ten common JavaScript coding challenges with clear solutions and explanations: flatten arrays, deep clone, once, memoize, compose, group by, retry with backoff and more."
date: "2026-10-31"
category: "JavaScript"
readTime: "10 min read"
links:
  - "MDN: Array methods|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
  - "MDN: structuredClone|https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone"
  - "javascript.info|https://javascript.info/"
---

Many frontend interviews include a live coding round. The problems are small, but the interviewer is watching how you think: do you clarify the input, handle edge cases and explain your choices? These ten problems appear again and again. Try each one yourself before you read the solution.

## 1. Flatten a nested array

Given `[1, [2, [3, [4]]]]`, return `[1, 2, 3, 4]` without using the built-in `flat(Infinity)`.

```js
function flatten(arr) {
  return arr.reduce(
    (out, item) => out.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
}

flatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
```

Recursion handles any depth. In an interview, also mention that `arr.flat(Infinity)` exists, and that very deep arrays could overflow the call stack, in which case an iterative solution with a stack is safer.

## 2. Remove duplicates from an array

```js
const unique = (arr) => [...new Set(arr)];

unique([1, 2, 2, 3, 1]); // [1, 2, 3]
```

A `Set` keeps one of each primitive value and preserves insertion order. For objects, you need a key to compare, such as an `id`:

```js
const uniqueBy = (arr, key) => [...new Map(arr.map((x) => [x[key], x])).values()];
```

## 3. Deep clone an object

Spread and `Object.assign` only copy one level. The simplest modern answer is `structuredClone`:

```js
const copy = structuredClone(original);
```

It handles nested objects, arrays, dates, maps and sets, but not functions. Interviewers often want you to write it by hand:

```js
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, deepClone(v)])
  );
}
```

Mention the limits: this version does not handle circular references, dates or class instances.

## 4. Implement once

`once(fn)` returns a function that runs `fn` only the first time and returns that same result afterwards.

```js
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
```

This is a closure question: `called` and `result` are remembered between calls.

## 5. Implement memoize

Cache the result of a function for the same arguments.

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);
```

Talk about trade-offs: it uses memory, `JSON.stringify` is a simple key that does not suit functions or circular data, and it only helps with **pure** functions.

## 6. Implement compose and pipe

`pipe` runs functions from left to right, passing each result to the next. `compose` goes right to left.

```js
const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input);
const compose = (...fns) => (input) => fns.reduceRight((acc, fn) => fn(acc), input);

const add1 = (x) => x + 1;
const double = (x) => x * 2;

pipe(add1, double)(3);    // 8
compose(add1, double)(3); // 7
```

## 7. Group an array of objects by a key

```js
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const k = item[key];
    (groups[k] ||= []).push(item);
    return groups;
  }, {});
}

groupBy([{ type: "a", n: 1 }, { type: "b", n: 2 }, { type: "a", n: 3 }], "type");
// { a: [{...}, {...}], b: [{...}] }
```

## 8. Check whether a string is a palindrome, or two strings are anagrams

```js
const isPalindrome = (s) => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === [...clean].reverse().join("");
};

const isAnagram = (a, b) => {
  const sort = (s) => [...s.toLowerCase().replace(/\s/g, "")].sort().join("");
  return sort(a) === sort(b);
};
```

Ask about case, spaces and punctuation before you start. It shows you think about requirements.

## 9. Retry a failing async function with backoff

A real-world problem: call an async function, and if it fails, wait and try again with longer waits.

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 2); // exponential backoff
  }
}
```

Say why you double the delay: it gives an overloaded server time to recover instead of hitting it repeatedly.

## 10. Implement a simple event emitter

```js
class Emitter {
  #handlers = new Map();

  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn); // returns an unsubscribe function
  }

  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }

  emit(event, ...args) {
    this.#handlers.get(event)?.forEach((fn) => fn(...args));
  }
}

const bus = new Emitter();
const stop = bus.on("save", (id) => console.log("saved", id));
bus.emit("save", 42); // saved 42
stop();
```

This shows classes, private fields, `Map`, `Set` and cleanup in one example.

## How to approach any coding problem in an interview

1. **Repeat the problem** in your own words and ask about inputs, outputs and edge cases (empty input, wrong type, very large input).
2. **Start with the simple solution**, even if it is slow, and say so.
3. **Talk while you code**, so the interviewer can follow your thinking.
4. **Test with examples**, including the edge cases, before you say you are done.
5. **Discuss complexity and improvements**: time, memory and what you would change with more time.

## Quick revision checklist

- Know recursion and `reduce` well, since half of these problems use them.
- Use closures for `once`, `memoize` and private state.
- Know `Set`, `Map`, `structuredClone` and `Object.fromEntries`.
- Always ask about edge cases and state the time complexity.
