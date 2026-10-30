---
title: "Tailwind CSS interview questions and answers"
description: "Utility-first CSS, responsive design, dark mode and customization: what interviewers actually ask."
date: "2026-10-27"
category: "Tailwind CSS"
readTime: "5 min read"
links:
  - "Responsive design|https://tailwindcss.com/docs/responsive-design"
  - "Dark mode|https://tailwindcss.com/docs/dark-mode"
  - "Theme configuration|https://tailwindcss.com/docs/theme"
---

## What is utility-first CSS?

Instead of writing custom class names, you compose small single-purpose classes (`flex`, `p-4`, `text-lg`) directly in markup. It removes naming debates, keeps styles next to the element, and the build step ships only the classes you use.

## How does responsive design work in Tailwind?

Tailwind is mobile-first. An unprefixed class applies to all sizes, and prefixes like `md:` or `lg:` apply from that breakpoint up:

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
```

## How do you customize the design system?

Extend `theme.extend` in `tailwind.config.ts` for colors, fonts and spacing, so you add to the defaults instead of replacing them.

## How do you handle repeated class lists?

Extract a React component first. Use `@apply` sparingly, only for things you cannot componentize, such as styling markdown output.

## How does dark mode work?

Use the `dark:` variant. It follows the system preference by default, or a class on `<html>` if you set `darkMode: "class"`.

## Example: a reusable button with variants

```tsx
const styles = {
  primary: "bg-teal text-white hover:bg-teal/90",
  ghost: "border border-ink/20 hover:bg-ink/5",
};

export function Button({ variant = "primary", ...props }: React.ComponentProps<"button"> & { variant?: keyof typeof styles }) {
  return <button className={`rounded-full px-5 py-2.5 font-semibold transition ${styles[variant]}`} {...props} />;
}
```

## Example: extending the theme

```ts
// tailwind.config.ts
export default {
  theme: { extend: { colors: { brand: "#0F766E" }, fontFamily: { display: ["Inter", "sans-serif"] } } },
};
```

Now `bg-brand` and `font-display` work everywhere.

## Example: a responsive card grid with dark mode

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-2xl bg-white p-6 shadow dark:bg-slate-800 dark:text-white">Card</article>
</div>
```

**Common mistake:** building class names dynamically like `` `bg-${color}-500` ``. Tailwind cannot see them at build time, so use complete class names.
