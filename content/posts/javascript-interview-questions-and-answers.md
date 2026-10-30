---
title: "30 JavaScript interview questions and answers with examples (2026)"
description: "Core JavaScript interview questions: var vs let, hoisting, closures, this, promises, async/await, the event loop, prototypes, equality, debounce and more, each with a code example."
date: "2026-10-30"
category: "JavaScript"
readTime: "20 min read"
links:
  - "MDN JavaScript Guide|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
  - "MDN: Event loop|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"
  - "javascript.info|https://javascript.info/"
---

Every frontend interview tests JavaScript, whatever framework the job uses. These 30 questions cover the fundamentals interviewers check most, plus the classic "what does this print?" puzzles. For two of the hardest topics in depth, read [closures and the event loop](/blog/javascript-closures-and-event-loop).

## 1. What is the difference between var, let and const?

`var` is function-scoped and can be redeclared. `let` and `const` are block-scoped. `const` cannot be reassigned, but an object it holds can still be changed.

```js
if (true) { var a = 1; let b = 2; }
console.log(a); // 1
console.log(b); // ReferenceError

const user = { name: "Ali" };
user.name = "Sara"; // fine
user = {};          // TypeError
```

## 2. What is hoisting?

Declarations are processed before code runs. `var` is hoisted and set to `undefined`. `let` and `const` are hoisted but stay in the "temporal dead zone" until their line runs. Function declarations are hoisted whole.

```js
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 5;

sayHi(); // works
function sayHi() { console.log("hi"); }
```

## 3. What are the data types in JavaScript?

Seven primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `null` and `symbol`. Everything else is an `object`, including arrays and functions. Primitives are copied by value; objects are copied by reference.

## 4. What is the difference between == and ===?

`===` compares value and type with no conversion. `==` converts types first, which gives surprising results. Use `===` almost always.

```js
0 == "0";           // true
0 === "0";          // false
null == undefined;  // true
null === undefined; // false
```

## 5. What is the difference between null and undefined?

`undefined` means a value was never assigned. `null` is an intentional "no value" that you set yourself. Funny detail: `typeof null` is `"object"`, a bug kept for compatibility.

## 6. What is a closure?

A closure is a function that remembers the variables from where it was created, even after that outer function has returned. It is how you get private state in JavaScript.

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next(); // 1
next(); // 2
```

## 7. What does this print? (the classic loop)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3: one shared i, and the loop finishes first

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2: let creates a new i for each iteration
```

## 8. How does `this` work?

`this` depends on how a function is called. In a method call (`obj.fn()`) it is the object. In a plain call it is `undefined` in strict mode. With `new` it is the new object. Arrow functions have no `this` of their own and use the surrounding one.

```js
const user = {
  name: "Ali",
  regular() { return this.name; },
  arrow: () => this.name,
};
user.regular(); // "Ali"
user.arrow();   // undefined (this is the outer scope)
```

## 9. What are call, apply and bind?

All three set `this`. `call` invokes now with arguments listed, `apply` invokes now with an array, and `bind` returns a new function with `this` fixed.

```js
function greet(greeting) { return `${greeting}, ${this.name}`; }
const user = { name: "Sara" };
greet.call(user, "Hi");      // "Hi, Sara"
greet.apply(user, ["Hey"]);  // "Hey, Sara"
const hello = greet.bind(user);
hello("Hello");              // "Hello, Sara"
```

## 10. How are arrow functions different from regular functions?

Arrow functions have no own `this`, `arguments` or `prototype`, and cannot be used with `new`. They are shorter and ideal for callbacks. Do not use them as object methods that need `this`.

## 11. What is the event loop?

JavaScript runs on one thread. Synchronous code runs first on the call stack. When it is empty, the event loop runs all microtasks (promise callbacks), then one macrotask (timers, events), then microtasks again, and so on.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1 4 3 2
```

## 12. What is a promise?

A promise is an object representing a value that will be available later. It is pending, then either fulfilled or rejected. You handle it with `.then` and `.catch`, or with `await`.

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait(500).then(() => console.log("done"));
```

## 13. What are Promise.all, allSettled, race and any?

`all` waits for every promise and fails fast if one rejects. `allSettled` waits for all and gives each result. `race` settles with the first to finish. `any` resolves with the first to succeed.

```js
const [user, posts] = await Promise.all([getUser(), getPosts()]);
const results = await Promise.allSettled([a(), b()]);
// [{ status: "fulfilled", value }, { status: "rejected", reason }]
```

## 14. How does async/await work, and how do you handle errors?

`async` functions always return a promise. `await` pauses the function until a promise settles, without blocking the thread. Use `try/catch` for errors.

```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
```

## 15. What is prototypal inheritance?

Every object has a hidden link to a prototype object. When you read a property that is not on the object, JavaScript looks up the prototype chain. Classes are syntax on top of this.

```js
const animal = { speak() { return "..." } };
const dog = Object.create(animal);
dog.speak(); // "...", found on the prototype

class Cat { meow() { return "meow"; } }
Object.getPrototypeOf(new Cat()) === Cat.prototype; // true
```

## 16. What is the difference between shallow and deep copy?

A shallow copy duplicates the top level only; nested objects are still shared. A deep copy duplicates everything. Use `structuredClone` for deep copies.

```js
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99, shared

const deep = structuredClone(original);
```

## 17. What are destructuring, spread and rest?

Destructuring pulls values out of arrays and objects. Spread (`...`) expands them. Rest (`...`) collects the remaining values.

```js
const { name, age = 18 } = user;
const [first, ...others] = [1, 2, 3]; // first 1, others [2, 3]
const merged = { ...defaults, ...options };
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
```

## 18. What are map, filter and reduce?

`map` transforms each item into a new array, `filter` keeps items that pass a test, and `reduce` combines items into a single value. None of them change the original array.

```js
const prices = [10, 25, 40];
prices.map((p) => p * 2);            // [20, 50, 80]
prices.filter((p) => p > 20);        // [25, 40]
prices.reduce((sum, p) => sum + p, 0); // 75
```

## 19. What is event delegation?

Instead of adding a listener to every child, add one to the parent and check `event.target`. It uses less memory and works for children added later, thanks to event bubbling.

```js
document.querySelector("#list").addEventListener("click", (e) => {
  const item = e.target.closest("li");
  if (item) console.log("Clicked", item.dataset.id);
});
```

## 20. What are event bubbling and capturing?

An event travels down from the window to the target (capturing), then back up (bubbling). Listeners run in the bubbling phase by default. `stopPropagation()` stops it moving further; `preventDefault()` stops the browser's default action.

## 21. Implement debounce

Debounce waits until calls stop for a set time, then runs once. Great for search inputs.

```js
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const onSearch = debounce((q) => fetchResults(q), 400);
```

## 22. Implement throttle

Throttle runs at most once per interval, however often it is called. Good for scroll and resize handlers.

```js
function throttle(fn, interval = 200) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}
```

## 23. What are truthy and falsy values?

Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` and `NaN`. Everything else is truthy, including `"0"`, `[]` and `{}`.

## 24. What are optional chaining and nullish coalescing?

`?.` stops and returns `undefined` if the left side is null or undefined. `??` gives a default only for null or undefined, unlike `||`, which also replaces `0` and `""`.

```js
const city = user?.address?.city;
const count = settings.count ?? 10; // keeps 0
const count2 = settings.count || 10; // replaces 0 with 10
```

## 25. What are ES modules?

Modules split code into files with `export` and `import`. Each module has its own scope and runs once. Dynamic `import()` loads a module on demand and returns a promise.

```js
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add } from "./math.js";
const { heavy } = await import("./heavy.js");
```

## 26. What is the difference between Map and Object?

A `Map` accepts any key type (including objects), keeps insertion order, has a `size` property and is faster for frequent adds and removes. Use a plain object for fixed, string-keyed records like JSON.

```js
const visits = new Map();
visits.set(userObj, 3);
visits.get(userObj); // 3
```

## 27. What is currying?

Currying turns a function with several arguments into a chain of functions that each take one. It makes partial application easy.

```js
const multiply = (a) => (b) => a * b;
const double = multiply(2);
double(5); // 10
```

## 28. What are pure functions and immutability?

A pure function returns the same output for the same input and changes nothing outside itself. Immutability means creating new values instead of changing existing ones. React relies on both to detect changes.

```js
// impure: changes the input
const addItem = (cart, item) => { cart.push(item); return cart; };
// pure
const addItemPure = (cart, item) => [...cart, item];
```

## 29. What does this print? (scope puzzle)

```js
let a = 1;
function outer() {
  console.log(a);
  let a = 2;
}
outer(); // ReferenceError: the inner a is in its temporal dead zone
```

The inner `let a` shadows the outer one for the whole function, so the log tries to read it before it is initialized.

## 30. What are generators?

A generator function (`function*`) can pause with `yield` and resume later, producing values one at a time. Useful for lazy sequences and custom iterators.

```js
function* ids() {
  let id = 1;
  while (true) yield id++;
}
const gen = ids();
gen.next().value; // 1
gen.next().value; // 2
```

## Quick revision checklist

- Predict output for event loop and `var` in loop puzzles.
- Write debounce, throttle and a closure counter from memory.
- Explain `this` in four call styles and how arrow functions differ.
- Know `Promise.all` vs `allSettled` and error handling with async/await.
