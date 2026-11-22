---
title: "TypeScript generics explained with interview-ready examples"
description: "What generics are, why they exist, and how to write and constrain them without confusing yourself."
date: "2026-10-05"
category: "TypeScript"
readTime: "5 min read"
links:
  - "TypeScript handbook: Generics|https://www.typescriptlang.org/docs/handbook/2/generics.html"
  - "Utility types|https://www.typescriptlang.org/docs/handbook/utility-types.html"
  - "Narrowing|https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
---

Generics let you write code that works with many types while keeping type safety. Interviewers ask about them to see if you can go beyond `any`.

## What problem do generics solve?

Without generics, a helper either loses type information or is copied for every type:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);      // number | undefined
const s = first(["a", "b"]);     // string | undefined
```

## How do you constrain a generic?

Use `extends` to require a shape:

```ts
function getId<T extends { id: number }>(item: T) {
  return item.id;
}
```

## What is the difference between unknown and any?

`any` turns off type checking. `unknown` accepts any value but forces you to narrow it before use, so it is the safe choice for data you do not control, such as API responses.

## Name three built-in utility types.

`Partial<T>` makes all properties optional, `Pick<T, K>` selects some of them, and `Omit<T, K>` removes some of them.

## How do generic interfaces and classes work?

The type parameter works the same way as in a function, but it applies to the whole shape. Here is a small stack that only accepts one kind of value:

```ts
class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push("2"); // error: string is not assignable to number
```

## Can a generic have a default type?

Yes. A default is used when no type argument is given and none can be inferred:

```ts
type ApiResponse<T = unknown> = { data: T; error: string | null };

const raw: ApiResponse = { data: 42, error: null }; // data is unknown
```

## Do you always have to write the type argument?

No. TypeScript usually **infers** it from the arguments, as in `first([1, 2, 3])`. Write the argument explicitly only when inference cannot work or would give a type that is too wide, for example when calling `get<User[]>("/api/users")` where nothing in the arguments mentions `User`.

## How are generics different from union types or any?

A union such as `string | number` says a value can be one of several types, but it does not remember **which one** you passed in. A function typed with a union returns a union, and you must narrow it again afterwards. A generic keeps the exact relationship: pass a `string`, get a `string` back. `any` is the opposite of both, because it gives up checking altogether. This is why a generic is the right tool when the output type depends on the input type.

## How do generics work in React components?

You can type props, state and hooks with generics. `useState<User | null>(null)` tells TypeScript the state starts empty and may later hold a user. You can also write generic components, which is useful for reusable lists and selects:

```tsx
function List<T>({ items, render }: { items: T[]; render: (item: T) => React.ReactNode }) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}

<List items={["a", "b"]} render={(s) => s.toUpperCase()} />; // s is string
```

The component works with any item type, and the `render` callback is still fully typed.

## What are mapped types?

A mapped type builds a new type by looping over the keys of another type. The built-in utility types are written this way:

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPartial<T> = { [K in keyof T]?: T[K] };
```

Knowing that `Partial` and `Readonly` are just mapped types shows that you understand utility types instead of only using them.

## What are conditional types and infer?

A conditional type chooses between two types based on a condition, written like a ternary: `T extends U ? X : Y`. The `infer` keyword lets you capture part of a type inside the condition:

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number>;   // number
```

## Example: a typed API response

```ts
type ApiResponse<T> = { data: T; error: string | null };

async function get<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return { data: (await res.json()) as T, error: res.ok ? null : res.statusText };
}

type User = { id: number; name: string };
const result = await get<User[]>("/api/users"); // result.data is User[]
```

## Example: keyof with generics

```ts
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Sara" };
pick(user, "name"); // string
pick(user, "email"); // error: not a key of user
```

## Example: utility types together

```ts
type User = { id: number; name: string; email: string };
type UserPreview = Pick<User, "id" | "name">;
type UserUpdate = Partial<Omit<User, "id">>;
```

**Interview tip:** when asked "why generics?", answer with a before and after. Show the `any` version, then the generic one that keeps types.

## When should you not use generics?

If a function only ever works with one concrete type, a generic adds noise. A useful rule from the TypeScript handbook is that a type parameter should appear at least twice, for example in the parameter and in the return type. If it appears only once, it is probably not doing anything and a plain type or `unknown` would be clearer.

## Common mistakes with generics

- Using `any` inside a generic function, which throws away the safety you wanted.
- Casting the result with `as T` to silence an error instead of constraining the type correctly.
- Over-constraining the type parameter so the function is only usable in one place.
- Naming every type parameter `T` in complex signatures. Descriptive names such as `TItem` or `TKey` are easier to read.
