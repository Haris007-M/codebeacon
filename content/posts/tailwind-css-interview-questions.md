---
title: "25 Tailwind CSS interview questions and answers with examples (2026)"
description: "Tailwind CSS interview questions on utility-first CSS, responsive design, dark mode, states, theming, v4 configuration, @apply, arbitrary values, plugins and performance, with code examples."
date: "2026-10-30"
category: "Tailwind CSS"
readTime: "15 min read"
links:
  - "Tailwind CSS docs|https://tailwindcss.com/docs"
  - "Responsive design|https://tailwindcss.com/docs/responsive-design"
  - "Dark mode|https://tailwindcss.com/docs/dark-mode"
  - "Theme variables|https://tailwindcss.com/docs/theme"
---

Tailwind is the most popular way to style React and Next.js apps, so expect questions about it whenever it is on the job post. These 25 questions cover the basics through Tailwind v4, each with a short answer and a markup example.

## 1. What is Tailwind CSS?

Tailwind is a utility-first CSS framework. Instead of writing custom classes in a stylesheet, you compose small single-purpose classes directly in your markup.

```html
<button class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
  Save
</button>
```

## 2. What does utility-first mean, and what are its pros and cons?

Each class does one thing (`p-4`, `text-center`). Pros: no naming classes, no unused CSS, styles live next to markup, consistent spacing and colors. Cons: long class lists, a learning curve, and repetition if you do not extract components.

## 3. How is Tailwind different from Bootstrap?

Bootstrap gives you ready-made components like `.btn` and `.card` that look like Bootstrap. Tailwind gives you low-level building blocks and no default look, so designs are fully custom.

## 4. How does responsive design work?

Tailwind is mobile-first. Unprefixed classes apply to all screens; prefixes like `md:` apply from that breakpoint up. Default breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">...</div>
```

## 5. How do you style hover, focus and other states?

Add a variant prefix. Variants can be stacked.

```html
<input class="border focus:border-blue-500 focus:ring-2 disabled:opacity-50" />
<a class="text-gray-600 hover:text-black md:hover:underline">Link</a>
```

## 6. What are group and peer?

`group` lets a child react to its parent's state. `peer` lets an element react to a sibling's state (the sibling must come first).

```html
<a class="group flex items-center gap-2">
  Read more <span class="transition group-hover:translate-x-1">→</span>
</a>

<input type="email" class="peer" />
<p class="invisible peer-invalid:visible text-red-600">Enter a valid email</p>
```

## 7. How does dark mode work?

By default the `dark:` variant follows the operating system's `prefers-color-scheme`. To toggle it manually with a class, change the variant (v4 shown):

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <body class="bg-white text-black dark:bg-slate-900 dark:text-white">...</body>
</html>
```

In Tailwind v3 you set `darkMode: "class"` in `tailwind.config.js` instead.

## 8. How do you customize the theme in Tailwind v4?

v4 is configured in CSS. Theme values are CSS variables in an `@theme` block, and each one creates matching utilities.

```css
@import "tailwindcss";

@theme {
  --color-brand: #0b1f33;
  --font-display: "Bricolage Grotesque", sans-serif;
  --breakpoint-3xl: 120rem;
}
```

This gives you `bg-brand`, `font-display` and `3xl:` automatically.

## 9. What changed in Tailwind v4?

A faster engine written partly in Rust, CSS-first configuration with `@theme` (no required JS config file), one `@import "tailwindcss"` line instead of three `@tailwind` directives, automatic content detection, and built-in support for modern CSS features like container queries and `@starting-style`.

## 10. How do you extend instead of override in v3?

In `tailwind.config.js`, values under `theme` replace the defaults, while values under `theme.extend` add to them.

```js
module.exports = {
  theme: {
    extend: {
      colors: { brand: "#0B1F33" }, // keeps all default colors too
    },
  },
};
```

## 11. What are arbitrary values?

Square brackets let you use a one-off value that is not in the theme.

```html
<div class="top-[117px] w-[37rem] bg-[#1da1f2] grid-cols-[1fr_2fr]">...</div>
```

Use them sparingly; if you repeat a value, add it to the theme.

## 12. What is @apply and when should you use it?

`@apply` copies utility styles into your own CSS class. It is useful for styling HTML you do not control (like Markdown output) or third-party widgets. For repeated UI, prefer a React component instead.

```css
.prose-post a {
  @apply font-medium text-teal-600 underline-offset-4 hover:underline;
}
```

## 13. How does Tailwind keep the CSS file small?

Tailwind scans your source files for class names and only generates CSS for the ones it finds. Unused utilities never reach production. Builds are typically a few kilobytes gzipped.

## 14. Why can't you build class names dynamically?

Because Tailwind scans files as plain text, it cannot see classes created at runtime.

```jsx
// Wrong: "bg-red-500" never appears in full
<div className={`bg-${color}-500`} />

// Right: map to complete class names
const colors = { red: "bg-red-500", green: "bg-green-500" };
<div className={colors[color]} />
```

## 15. How do you handle conflicting classes?

If two classes set the same property, the one later in the generated CSS wins, not the one later in your class list. For component props that override defaults, use `tailwind-merge`, often combined with `clsx` in a `cn()` helper.

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs) => twMerge(clsx(inputs));

cn("px-4 py-2", "px-6"); // "py-2 px-6"
```

## 16. How do you build a centered layout?

Flexbox or grid utilities do it in one line.

```html
<div class="flex min-h-screen items-center justify-center">...</div>
<div class="grid min-h-screen place-items-center">...</div>
```

## 17. How do you create a responsive container?

Combine a max width, auto margins and padding.

```html
<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">...</div>
```

## 18. What are container queries in Tailwind?

They style an element based on its parent's width instead of the viewport. Mark the parent with `@container` and use `@md:` style variants on children. Built in since v4.

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">...</div>
</div>
```

## 19. How do you add animations and transitions?

Use `transition`, duration and easing utilities for state changes, and built-in `animate-spin`, `animate-pulse`, `animate-bounce` or `animate-ping`. Define custom keyframes in the theme.

```html
<button class="transition duration-200 ease-out hover:scale-105">Hover me</button>
<div class="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
```

## 20. How do you respect reduced motion?

Use the `motion-safe:` and `motion-reduce:` variants.

```html
<div class="motion-safe:animate-bounce motion-reduce:animate-none">↓</div>
```

## 21. What are plugins?

Plugins add utilities, components or variants. Official ones include `@tailwindcss/typography` (the `prose` class for article text) and `@tailwindcss/forms`. In v4 you load them with `@plugin`.

```css
@plugin "@tailwindcss/typography";
```

```html
<article class="prose lg:prose-lg dark:prose-invert">...</article>
```

## 22. How do you write custom utilities in v4?

Use the `@utility` directive. It works with all variants automatically.

```css
@utility content-auto {
  content-visibility: auto;
}
```

```html
<section class="content-auto md:content-auto">...</section>
```

## 23. How do you style the first, last or odd items in a list?

Use structural variants.

```html
<li class="border-b last:border-0 odd:bg-gray-50 first:pt-0">...</li>
```

## 24. How do you make Tailwind code readable in large projects?

Extract repeated patterns into components, sort classes with the official Prettier plugin, use a `cn()` helper for conditional classes, use a variants library like `cva` for components with many styles, and keep design tokens in the theme instead of arbitrary values.

## 25. Is Tailwind accessible?

Tailwind is just CSS, so accessibility depends on your HTML. It does help: `sr-only` hides text visually but keeps it for screen readers, `focus-visible:` styles keyboard focus, and `motion-reduce:` handles reduced motion. You still need semantic elements, labels and good contrast.

```html
<button class="focus-visible:outline-2 focus-visible:outline-offset-2">
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Close menu</span>
</button>
```

## Quick revision checklist

- Explain mobile-first breakpoints and stacked variants.
- Set up class-based dark mode in v3 and v4.
- Know why dynamic class names break and how to fix them.
- Use `group`, `peer` and container queries in an example.
