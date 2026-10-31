---
title: "CSS Flexbox vs Grid: interview questions and answers (2026)"
description: "When to use Flexbox and when to use CSS Grid, how the axes work, why flex items overflow, auto-fit vs auto-fill, grid areas and subgrid, with short answers and code."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "MDN: Flexbox|https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout"
  - "MDN: CSS Grid layout|https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
  - "web.dev: Learn CSS|https://web.dev/learn/css"
---

Layout questions are common in frontend interviews because they show whether you can build real screens without fighting the browser. These are the Flexbox and Grid questions that come up most, each with an answer you can say out loud.

## 1. When should you use Flexbox and when should you use Grid?

Use Flexbox for layout in **one dimension**, a row or a column, where the content decides the size: navbars, button groups, cards in a row, centering. Use Grid for layout in **two dimensions**, rows and columns together, where the layout decides the size: page layouts, galleries and dashboards. The two are not rivals, and most real pages use both.

A quick test: if you are lining items up along a line, reach for Flexbox. If you are placing items into a table-like structure, reach for Grid.

## 2. What are the main axis and the cross axis?

Flexbox lays items out along the **main axis**, set by `flex-direction`. The **cross axis** runs at a right angle to it. `justify-content` aligns items along the main axis and `align-items` aligns them along the cross axis.

```css
.nav {
  display: flex;
  justify-content: space-between; /* main axis (horizontal by default) */
  align-items: center;            /* cross axis (vertical) */
}
```

When you switch to `flex-direction: column`, the axes swap, so `justify-content` now works vertically. This is the most common source of confusion.

## 3. What do flex-grow, flex-shrink and flex-basis do?

- `flex-basis` is the starting size of an item before free space is shared.
- `flex-grow` says how much of the leftover space an item takes.
- `flex-shrink` says how much an item shrinks when there is not enough space.

The shorthand `flex: 1` means `flex: 1 1 0%`, so every item starts at zero and shares the space equally. `flex: none` means the item keeps its size and never grows or shrinks.

## 4. Why does a flex item overflow its container, and how do you fix it?

A flex item has `min-width: auto` by default, which means it will not shrink below the size of its content. Long words, long URLs and wide images can push it past the container. Fix it by allowing the item to shrink:

```css
.item { min-width: 0; }          /* lets the item shrink */
.item { overflow-wrap: anywhere; } /* lets long text break */
```

## 5. How do you create a grid and what does the fr unit mean?

Set `display: grid` and describe the tracks. The `fr` unit is a share of the free space.

```css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr; /* fixed sidebar, flexible content */
  gap: 1.5rem;
}
```

`repeat(3, 1fr)` gives three equal columns. `gap` adds space between tracks without margin hacks.

## 6. What is the difference between auto-fit and auto-fill?

Both create as many columns as fit in the container. With **auto-fill**, empty columns stay in the layout as empty tracks. With **auto-fit**, empty tracks collapse to zero, so the real items stretch to fill the row.

```css
.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
```

This one line gives a responsive card grid with no media queries. Say that in an interview and you will score points.

## 7. What is grid-template-areas?

It lets you draw the layout with names, which makes it easy to read and to change at breakpoints.

```css
.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.page > header { grid-area: header; }
.page > aside  { grid-area: sidebar; }
.page > main   { grid-area: main; }
```

On mobile you can redefine the areas into a single column and nothing else needs to change.

## 8. How do you center a div horizontally and vertically?

The shortest modern answers are Grid and Flexbox:

```css
.center { display: grid; place-items: center; }
/* or */
.center { display: flex; justify-content: center; align-items: center; }
```

Give the parent a height, such as `min-height: 100vh`, or there is nothing to center within.

## 9. What is the difference between justify-content and justify-items?

`justify-content` positions the **whole set of tracks** inside the container when there is extra space. `justify-items` aligns **each item inside its own grid cell**. `align-content` and `align-items` do the same for the vertical direction. `place-items` is shorthand for `align-items` plus `justify-items`.

## 10. What is subgrid?

Subgrid lets a nested grid use the tracks of its parent grid instead of creating its own. It solves a classic problem: cards in a row where the titles, text and buttons need to line up across cards even when the content length differs. Subgrid is now supported in all major browsers, so you can use it for new work.

## 11. Can you use Flexbox and Grid together?

Yes, and you usually should. A common pattern is Grid for the page layout and the card grid, and Flexbox inside each card to push the button to the bottom and to align the icon and text in the header.

## 12. How do you choose between gap and margin for spacing?

Use `gap` for space **between** items. It works in both Flexbox and Grid, it never adds space at the edges and it needs no special first-child or last-child rules. Use margin when a single element needs space around itself.

## Quick revision checklist

- Flexbox is one-dimensional, Grid is two-dimensional.
- `justify-*` follows the main axis in Flexbox, and `flex-direction` can swap the axes.
- `flex: 1` means grow equally from zero, and `min-width: 0` fixes overflow.
- `repeat(auto-fit, minmax(240px, 1fr))` is the responsive grid one-liner.
- `grid-template-areas` makes layouts readable.
- Use `gap`, not margins, for spacing between items.
