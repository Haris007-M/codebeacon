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
