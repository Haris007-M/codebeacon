---
title: "CSS interview questions: specificity, box model, positioning and stacking"
description: "The CSS fundamentals interviewers test: specificity, the cascade, box-sizing, position, z-index and stacking contexts, units, variables and pseudo-classes, with examples."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "MDN: CSS reference|https://developer.mozilla.org/en-US/docs/Web/CSS"
  - "MDN: Cascade and inheritance|https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts"
  - "web.dev: Learn CSS|https://web.dev/learn/css"
---

Flexbox and Grid get a lot of attention, but many interviews start with the fundamentals, because bugs in real projects come from them. This guide covers the core CSS questions, apart from layout with Flexbox and Grid, which has its own article.

## 1. What is CSS specificity and how is it calculated?

Specificity decides which rule wins when several rules target the same element. Think of it as a score with four parts, from strongest to weakest:

1. Inline styles.
2. IDs (`#header`).
3. Classes, attributes and pseudo-classes (`.card`, `[type="text"]`, `:hover`).
4. Elements and pseudo-elements (`div`, `::before`).

So `#nav a` beats `.menu .link`, and `.card.active` beats `.card`. If specificity is equal, the rule that appears **later** wins. `!important` overrides everything, so avoid it except as a last resort.

## 2. What is the cascade?

The cascade is how the browser chooses among conflicting declarations. It considers, in order: importance (`!important`), origin (browser, user, author), **specificity**, and finally **source order**. Modern CSS also has cascade layers (`@layer`), which let you control priority between groups of rules.

## 3. What is the box model?

Every element is a box made of four layers, from the inside out: **content**, **padding**, **border** and **margin**. Padding is inside the border and takes the element's background. Margin is outside and is always transparent.

## 4. What does box-sizing: border-box do?

By default (`content-box`), `width` only sets the content width, so padding and border are added on top. With `border-box`, `width` includes padding and border, which makes sizing predictable. Most projects set it globally.

```css
*, *::before, *::after { box-sizing: border-box; }
```

Tailwind sets this for you in its base styles.

## 5. What is margin collapsing?

When the vertical margins of two block elements touch, they combine into one margin equal to the larger of the two, instead of adding together. It also happens between a parent and its first or last child when nothing separates them. It does not happen with Flexbox or Grid items, or with horizontal margins. To stop it, add padding or a border, or use `display: flow-root`.

## 6. What are the position values?

- `static`: the default, normal flow.
- `relative`: stays in the flow, but can be nudged with `top`, `left` and so on, and becomes the reference for absolute children.
- `absolute`: removed from the flow and placed relative to the nearest positioned ancestor.
- `fixed`: placed relative to the viewport and stays during scroll.
- `sticky`: behaves as `relative` until you scroll past a threshold, then sticks like `fixed`.

```css
.header { position: sticky; top: 0; }
```

## 7. Why does z-index sometimes not work?

`z-index` only applies to positioned elements (or Flex and Grid items), and it only competes with elements **in the same stacking context**. A new stacking context is created by things like `position` with a `z-index`, `opacity` below 1, `transform`, `filter` and `isolation: isolate`. A child with `z-index: 9999` can never go above something outside its parent's stacking context if the parent sits lower.

The fix is to look at the parents, not to raise the number.

## 8. What is the difference between display none, visibility hidden and opacity 0?

- `display: none` removes the element from layout. It takes no space and is ignored by screen readers.
- `visibility: hidden` hides it but keeps its space.
- `opacity: 0` makes it invisible but it still takes space and can still be clicked and focused.

## 9. What is the difference between px, em, rem, % and vw?

- `px` is a fixed unit.
- `em` is relative to the **font size of the element** (or its parent, for font-size), so it compounds when nested.
- `rem` is relative to the **root font size**, which is the best choice for text and spacing because it respects the user's browser settings.
- `%` is relative to the parent's value.
- `vw` and `vh` are relative to the viewport. Use `dvh` on mobile to avoid the browser toolbar problem.

## 10. What are CSS custom properties?

Custom properties, also called CSS variables, store values you can reuse and change at runtime, unlike Sass variables.

```css
:root { --brand: #0f766e; }
.button { background: var(--brand); }
.dark { --brand: #2dd4bf; }
```

They follow the cascade, so you can override them in any selector, which makes themes simple.

## 11. What is the difference between pseudo-classes and pseudo-elements?

A **pseudo-class** selects an element in a certain state: `:hover`, `:focus-visible`, `:first-child`, `:nth-child(2n)`, `:not(.x)`. A **pseudo-element** styles part of an element or adds generated content: `::before`, `::after`, `::first-line`, `::placeholder`. Pseudo-classes use one colon and pseudo-elements use two.

## 12. How do you truncate text with an ellipsis?

For one line:

```css
.title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
```

For several lines, use `-webkit-line-clamp` with `display: -webkit-box`, or the standard `line-clamp` property where supported.

## 13. What is the difference between inline and external CSS, and which is better?

Inline styles have the highest specificity and cannot be cached or reused, so they are hard to maintain. External stylesheets are cached by the browser, shared across pages and easier to manage. Use external CSS (or a framework that generates it) and keep inline styles for values that truly change at runtime.

## 14. What is the difference between relative, absolute and fixed units for font sizes in accessibility?

Text in `rem` or `em` scales when users change their default browser font size. Text in `px` does not. For accessibility, use `rem` for font sizes and spacing so people who need larger text are not blocked.

## 15. What is BEM and why do teams use it?

BEM (Block, Element, Modifier) is a naming convention that keeps specificity low and names predictable: `.card`, `.card__title`, `.card--featured`. It avoids deep selectors and accidental clashes. Utility-first CSS such as Tailwind solves the same problem differently, by composing small classes in the markup.

## 16. How do you debug a CSS problem?

Open DevTools, select the element and check the **Computed** tab to see the final value and which rule won, and the **Styles** tab to see crossed-out rules. Toggle declarations on and off, check for typos and missing units, and look at parents for `overflow`, `transform` or `position` that change behaviour.

## Quick revision checklist

- Specificity order: inline, ID, class, element, then source order.
- Use `box-sizing: border-box` and know how margins collapse.
- `z-index` only works within a stacking context.
- Use `rem` for text, and `gap` and variables to keep CSS maintainable.
- `display: none` removes space, `visibility: hidden` keeps it.
