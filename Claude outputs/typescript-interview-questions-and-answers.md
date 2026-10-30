---
title: "25 TypeScript interview questions and answers with examples (2026)"
description: "TypeScript interview questions on types vs interfaces, unknown vs any, generics, narrowing, utility types, keyof, mapped and conditional types, and typing React, with code examples."
date: "2026-10-30"
category: "TypeScript"
readTime: "17 min read"
links:
  - "TypeScript Handbook|https://www.typescriptlang.org/docs/handbook/intro.html"
  - "Utility types|https://www.typescriptlang.org/docs/handbook/utility-types.html"
  - "React TypeScript Cheatsheet|https://react-typescript-cheatsheet.netlify.app/"
---

Most frontend job posts now list TypeScript, and interviewers use it to check whether you can model data safely. These 25 questions go from basics to advanced types. For a deep dive into one topic, see [TypeScript generics explained](/blog/typescript-generics-explained).

## 1. What is TypeScript and why use it?

TypeScript is JavaScript with static types. It catches mistakes like typos and wrong arguments before the code runs, gives better autocomplete, and makes refactoring safer. It compiles to plain JavaScript; the types do not exist at runtime.

```ts
function total(price: number, qty: number) {
  return price * qty;
}
total("10", 2); // Error: Argument of type 'string' is not assignable to 'number'
```

## 2. What is the difference between type and interface?

Both describe object shapes. Interfaces can be reopened and merged, and use `extends`. Type aliases can also describe unions, tuples, primitives and computed types. A common rule: interfaces for public object shapes, types for everything else.

```ts
interface User { id: number; name: string }
interface User { email: string } // merges

type Status = "idle" | "loading" | "error"; // only a type can do this
type Admin = User & { role: "admin" };
```

## 3. What is the difference between any, unknown and never?

`any` turns off type checking. `unknown` accepts anything, but you must narrow it before use, so it is the safe choice. `never` means a value that can never exist, such as the return of a function that always throws.

```ts
let a: any = "x";
a.foo.bar; // no error, crashes at runtime

let u: unknown = "x";
u.toUpperCase(); // Error
if (typeof u === "string") u.toUpperCase(); // OK

function fail(msg: string): never { throw new Error(msg); }
```

## 4. What is type inference?

TypeScript works out types from values, so you do not need to annotate everything. Annotate function parameters and public APIs; let inference handle local variables.

```ts
let count = 0;            // number
const names = ["a", "b"]; // string[]
const role = "admin";     // literal type "admin"
```

## 5. What are union and intersection types?

A union (`A | B`) is one of several types. An intersection (`A & B`) has all properties of both.

```ts
type Id = string | number;
type WithTimestamps = { createdAt: Date } & { updatedAt: Date };
```

## 6. What are literal types?

A literal type is an exact value, such as `"small"` or `42`. Unions of literals are a type-safe alternative to enums.

```ts
type Size = "sm" | "md" | "lg";
function setSize(s: Size) {}
setSize("xl"); // Error
```

## 7. What is type narrowing?

Narrowing is TypeScript refining a broad type to a specific one inside a branch, using checks like `typeof`, `instanceof`, `in` or equality.

```ts
function format(value: string | number | Date) {
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
```

## 8. What is a discriminated union?

A union where every member has a shared literal property (the "discriminant"). Checking it narrows to exactly one member. It is the best way to model states.

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };

function render(s: State) {
  switch (s.status) {
    case "success": return s.data.length; // data is available here
    case "error": return s.error;
    case "loading": return "Loading...";
  }
}
```

## 9. How do you make a switch exhaustive?

Assign the value to `never` in the default case. If someone adds a new member to the union and forgets to handle it, compilation fails.

```ts
default: {
  const _exhaustive: never = s;
  return _exhaustive;
}
```

## 10. What are generics?

Generics let a function or type work with many types while keeping the link between input and output.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
const n = first([1, 2, 3]);   // number | undefined
const s = first(["a", "b"]);  // string | undefined
```

## 11. What are generic constraints?

`extends` limits what a generic accepts, so you can safely use its properties.

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("hello", "hi");  // OK
longest(10, 20);         // Error: number has no length
```

## 12. What does keyof do?

`keyof T` gives a union of the keys of `T`. Combined with generics, it lets you write type-safe property access.

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { id: 1, name: "Ali" };
getProp(user, "name"); // string
getProp(user, "age");  // Error
```

## 13. What does typeof do in a type position?

It gets the type of an existing value, so you do not repeat yourself.

```ts
const config = { theme: "dark", pageSize: 20 };
type Config = typeof config; // { theme: string; pageSize: number }
```

## 14. What are indexed access types?

`T["key"]` looks up the type of a property. It works with unions of keys and with arrays.

```ts
type User = { id: number; address: { city: string } };
type City = User["address"]["city"]; // string

const roles = ["admin", "editor"] as const;
type Role = (typeof roles)[number]; // "admin" | "editor"
```

## 15. Which utility types should you know?

`Partial` makes all properties optional, `Required` makes them required, `Readonly` locks them, `Pick` and `Omit` select or remove keys, `Record` builds an object type, and `ReturnType` and `Parameters` read a function's types.

```ts
type User = { id: number; name: string; email: string };
type UserUpdate = Partial<Omit<User, "id">>;
type PublicUser = Pick<User, "id" | "name">;
type ScoreMap = Record<string, number>;
type R = ReturnType<typeof fetchUser>;
```

## 16. What are mapped types?

A mapped type builds a new type by looping over the keys of another. This is how `Partial` and `Readonly` are built.

```ts
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

type G = Getters<{ name: string }>; // { getName: () => string }
```

## 17. What are conditional types and infer?

A conditional type picks a type based on a check: `T extends U ? X : Y`. Inside it, `infer` captures part of a type.

```ts
type IsString<T> = T extends string ? true : false;
type ElementType<T> = T extends (infer E)[] ? E : T;
type Awaited2<T> = T extends Promise<infer V> ? V : T;

type A = ElementType<number[]>;        // number
type B = Awaited2<Promise<string>>;     // string
```

## 18. What are template literal types?

They build string types from other string types, which is useful for event names, CSS classes and routes.

```ts
type Side = "top" | "bottom";
type Margin = `margin-${Side}`; // "margin-top" | "margin-bottom"
```

## 19. What is the difference between `as const` and `satisfies`?

`as const` makes a value deeply readonly with literal types. `satisfies` checks that a value matches a type without widening it, so you keep the precise inferred type.

```ts
const routes = { home: "/", blog: "/blog" } as const;
// routes.home has type "/"

type Theme = Record<string, string>;
const colors = { primary: "#0B1F33", accent: "#F5B700" } satisfies Theme;
colors.primary; // still checked, and autocomplete knows the keys
```

## 20. Should you use enums?

Enums create real runtime objects, and numeric enums allow any number. Many teams now prefer a union of string literals or an `as const` object, which has no runtime cost and is easier to read.

```ts
enum Direction { Up, Down }           // compiled to an object
type Direction2 = "up" | "down";      // types only
```

## 21. What are type guards and type predicates?

A type predicate (`x is Type`) is a function return type that tells TypeScript what the check proves.

```ts
type Cat = { meow(): void };
type Dog = { bark(): void };

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;
}
if (isCat(pet)) pet.meow();
```

## 22. What are function overloads?

Overloads give a function several call signatures, so the return type changes with the arguments. Write the signatures, then one implementation.

```ts
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number) {
  return typeof input === "string" ? Number(input) : String(input);
}
const a = parse("42"); // number
```

## 23. What do readonly and optional modifiers do?

`readonly` stops a property being reassigned after creation. `?` makes it optional, so its type includes `undefined`. `ReadonlyArray<T>` (or `readonly T[]`) removes mutating methods like `push`.

```ts
type Point = { readonly x: number; y?: number };
const p: Point = { x: 1 };
p.x = 2; // Error
```

## 24. How do you type React components and hooks?

Type props with a type or interface, let `useState` infer where possible, and give it a type when the initial value is `null`. Use React's event types for handlers.

```tsx
type ButtonProps = {
  label: string;
  variant?: "primary" | "ghost";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ComponentPropsWithoutRef<"button">;

function Button({ label, variant = "primary", ...rest }: ButtonProps) {
  return <button className={variant} {...rest}>{label}</button>;
}

const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);
```

## 25. What is strict mode in tsconfig?

`"strict": true` turns on a group of checks, most importantly `strictNullChecks` (no silent `null` or `undefined`) and `noImplicitAny`. Every new project should use it. `noUncheckedIndexedAccess` is a useful extra: it treats `arr[i]` as possibly `undefined`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## Quick revision checklist

- Explain `unknown` vs `any` and type vs interface in one sentence each.
- Model loading, success and error states with a discriminated union.
- Write `getProp<T, K extends keyof T>` from memory.
- Know the common utility types and be able to build one with a mapped type.
