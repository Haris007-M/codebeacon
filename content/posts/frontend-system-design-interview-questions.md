---
title: "Frontend system design interview: how to design autocomplete, infinite scroll and a news feed"
description: "A practical framework for frontend system design interviews, with worked answers for an autocomplete search box, infinite scroll and a news feed, covering state, caching and performance."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "web.dev: Virtualize large lists|https://web.dev/articles/virtualize-long-lists-react-window"
  - "MDN: Intersection Observer API|https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
  - "React docs: Thinking in React|https://react.dev/learn/thinking-in-react"
---

Senior frontend interviews often include a system design round: "Design an autocomplete", "Design an image carousel", "Design a news feed". There is no single correct answer. The interviewer wants to see that you ask good questions, break the problem into parts, and think about performance, accessibility and failure. This guide gives you a framework and three worked examples.

## 1. What framework can you use for any frontend design question?

Follow these steps in order and say each one out loud:

1. **Clarify requirements.** What are the features, the devices, the scale and the browsers? What is out of scope?
2. **Sketch the components.** Draw the main parts and how they pass data.
3. **Define the data and API.** What does the server send and in what shape? Who owns the state?
4. **Cover the user experience.** Loading, empty and error states, and accessibility.
5. **Optimise.** Performance, caching, network use and bundle size.
6. **Discuss trade-offs.** What did you choose, and what did you give up?

## 2. Design an autocomplete (search suggestions) box

**Requirements:** as the user types, show matching suggestions, let them pick with the mouse or keyboard, and keep it fast.

**Components:** an input, a dropdown list of suggestions, and a controller that manages the query, results and highlighted index.

**Data flow and API:** the input sends the query to `GET /search?q=react&limit=8`. The response is a small list of strings or objects.

**Key decisions:**

- **Debounce** the input by about 200–300 ms so you do not send a request on every key press.
- **Cancel stale requests** with `AbortController`, or ignore results that do not match the current query, to avoid race conditions where an old response arrives last.
- **Cache** results by query in a `Map`, so typing "rea", deleting, and typing "rea" again costs no request.
- **Minimum length:** do not search before 2 or 3 characters.
- **Keyboard:** Arrow keys move the highlight, Enter selects and Escape closes.
- **Accessibility:** use the combobox pattern, with `role="combobox"`, `aria-expanded`, `aria-controls` and `aria-activedescendant`, and a `role="listbox"` for the list.
- **Edge cases:** no results, a failed request, very long text and highlighting the matching part.

```js
const cache = new Map();
async function search(q, signal) {
  if (cache.has(q)) return cache.get(q);
  const res = await fetch(`/search?q=${encodeURIComponent(q)}`, { signal });
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  cache.set(q, data);
  return data;
}
```

## 3. Design infinite scroll

**Requirements:** a long list of items loads more as the user scrolls down.

**Key decisions:**

- **Detecting the end:** use an `IntersectionObserver` on a sentinel element at the bottom of the list. It is much cheaper than listening to scroll events.
- **Pagination:** prefer **cursor-based** pagination (`?after=<id>`), because offsets can skip or repeat items if new items are added while the user scrolls.
- **Preventing duplicate requests:** keep a `loading` flag and stop when the server says there are no more pages.
- **Memory:** after hundreds of items, the DOM becomes heavy. Use **virtualization** (libraries such as react-window or TanStack Virtual), which renders only the rows near the viewport.
- **State:** keep the list, the cursor, the loading state and the error state together, ideally in a data library that supports infinite queries.
- **UX:** show skeleton rows while loading, a retry button on error, and a "back to top" button. Remember scroll position when the user navigates away and returns.
- **Accessibility:** infinite scroll can trap keyboard users before the footer. Offer a "Load more" button as an alternative.

## 4. Design a news feed

**Requirements:** a list of posts that load in pages, with images, likes and comments, and new posts appearing at the top.

**Components:** `Feed`, `PostCard`, `LikeButton`, `CommentList`, `Composer`.

**Key decisions:**

- **Rendering and loading:** render the first page on the server for a fast first paint, then continue with infinite scroll on the client.
- **Normalised state:** store posts by id (`{ byId, ids }`) so that updating one post, for example a like, updates it everywhere it appears and avoids copies out of sync.
- **Optimistic updates:** when the user clicks Like, update the UI immediately and roll back if the request fails.
- **Images:** set width and height to prevent layout shift, use responsive sizes and lazy-load images below the fold. Core Web Vitals matter here.
- **Real-time updates:** do not insert new posts under the user's cursor and shift the page. Show a "New posts" button that the user clicks. For delivery, polling is simplest, while WebSockets or Server-Sent Events give instant updates.
- **Failure handling:** a failed like or comment must be visible and retryable.

## 5. What non-functional topics should you always mention?

- **Performance:** code splitting, lazy loading, caching, avoiding unnecessary re-renders, and measuring with Core Web Vitals.
- **Accessibility:** keyboard use, focus management, screen reader labels and colour contrast.
- **Internationalisation:** text length, right-to-left languages and date and number formats.
- **Security:** escaping user content to prevent XSS, and careful token storage.
- **Resilience:** offline behaviour, timeouts, retries and clear error messages.
- **Testing and monitoring:** unit and integration tests for the logic, and error and performance monitoring in production.

## 6. How do you decide where state should live?

Keep state as close as possible to where it is used. **Server data** belongs in a caching layer such as TanStack Query. **UI state** such as an open dropdown stays local. **Shareable state** such as filters and page number belongs in the URL. Only truly global client state, like the current user, needs a context or store.

## 7. How do you show you are thinking like a senior?

Ask questions before you draw anything, state your assumptions, mention trade-offs ("debounce reduces requests but adds a delay, so I would pick 250 ms"), and say what you would improve with more time. The interviewer cares less about the final design than about the quality of your reasoning.

## Quick revision checklist

- Use a framework: requirements, components, data and API, UX states, optimisation, trade-offs.
- Autocomplete: debounce, cancel stale requests, cache and use the combobox pattern.
- Infinite scroll: IntersectionObserver, cursor pagination and virtualization.
- Feed: normalised state, optimistic updates and no layout shift.
- Always mention accessibility, performance, security and error states.
