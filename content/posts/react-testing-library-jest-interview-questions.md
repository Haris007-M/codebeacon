---
title: "React testing interview questions: Jest and React Testing Library"
description: "How to test React components, what to test, queries and user events, mocking fetch, async tests and common mistakes, with examples for Jest and React Testing Library."
date: "2026-10-31"
category: "React"
readTime: "8 min read"
links:
  - "React Testing Library docs|https://testing-library.com/docs/react-testing-library/intro/"
  - "Jest docs|https://jestjs.io/docs/getting-started"
  - "Testing Library: Queries|https://testing-library.com/docs/queries/about"
---

Testing questions separate developers who write features from developers who ship them with confidence. You do not need to know every API. You need to explain what to test, how to test it the way a user would, and how to avoid brittle tests.

## 1. What types of tests are there in a frontend app?

- **Unit tests** check a small piece in isolation, such as a function or hook.
- **Integration tests** check several pieces working together, such as a form with validation and a submit button. For React, this is where most value is.
- **End-to-end (E2E) tests** run a real browser through whole flows, with tools such as Playwright or Cypress. They are the most realistic but the slowest.

A good balance has many unit and integration tests and a few E2E tests for the critical flows.

## 2. What is the difference between Jest and React Testing Library?

**Jest** is the test runner: it finds tests, runs them, gives you `describe`, `it`, `expect`, mocks and coverage. **React Testing Library (RTL)** is a set of helpers to render components and interact with them. You use them together: RTL renders and queries the DOM, and Jest checks the results.

## 3. What is the philosophy behind React Testing Library?

"The more your tests resemble the way your software is used, the more confidence they can give you." You test what the user sees and does, not the internal state or implementation. If you refactor the component without changing its behaviour, the tests should still pass.

## 4. How do you write a basic component test?

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increments the count when the button is clicked", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole("button", { name: /increment/i }));

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

Notice that the test finds the button by its role and name, as a user or screen reader would.

## 5. Which query should you use: getBy, queryBy or findBy?

- `getBy...` returns the element or **throws** if it is missing. Use it when the element must exist.
- `queryBy...` returns the element or `null`. Use it to assert something is **not** there.
- `findBy...` returns a promise that waits for the element to appear. Use it for async content.

```tsx
expect(screen.queryByText("Error")).not.toBeInTheDocument();
expect(await screen.findByText("Loaded")).toBeInTheDocument();
```

## 6. What is the preferred order of queries?

Prefer queries that reflect how users and assistive technology find things: `getByRole` first, then `getByLabelText` for form fields, then `getByPlaceholderText`, `getByText` and `getByDisplayValue`. Use `getByTestId` only as a last resort when nothing else works, because users cannot see test ids.

## 7. Why use userEvent instead of fireEvent?

`userEvent` simulates what a real user does, including focus, hover, key presses and the full sequence of events, while `fireEvent` dispatches a single low-level event. For example, `userEvent.type` fires keydown, keypress and input events for every character. It finds more real bugs and is the recommended choice.

## 8. How do you test async behaviour, such as fetching data?

Mock the network, render, and wait for the result with `findBy` or `waitFor`.

```tsx
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => [{ id: 1, title: "First post" }],
}) as jest.Mock;

test("shows posts after loading", async () => {
  render(<Posts />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText("First post")).toBeInTheDocument();
});
```

For bigger apps, many teams use **Mock Service Worker (MSW)** to mock at the network level, so the component code does not change.

## 9. What is mocking and when should you avoid it?

Mocking replaces a real dependency, such as a network call or a timer, with a controlled fake. It makes tests fast and predictable. But the more you mock, the less your test proves. Mock things at the edges (network, time, browser APIs) and avoid mocking your own components, because then you are no longer testing how they work together.

## 10. How do you test a custom hook?

Use `renderHook` from React Testing Library, and wrap state changes in `act`.

```tsx
import { renderHook, act } from "@testing-library/react";

test("useCounter increments", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

If the hook is only used by one component, it is often better to test it through that component.

## 11. What does the act warning mean?

It appears when React state updates happen outside of the test's awareness, often because you did not wait for an async update. RTL wraps most interactions in `act` already. The fix is usually to `await` the interaction and to use `findBy` or `waitFor` for the change you expect, rather than silencing the warning.

## 12. What should you test and what should you skip?

Test behaviour that matters: what renders for given props, what happens on click and submit, validation messages, loading and error states, and permission-based UI. Skip implementation details such as internal state names, and skip testing the library itself (for example, that `useState` works). Do not chase 100% coverage, because coverage shows what ran, not what was verified.

## 13. What are snapshot tests and what is their risk?

A snapshot test saves the rendered output and fails when it changes. They are quick to write, but large snapshots are noisy, and people tend to update them without reading, so they stop catching bugs. Use small, focused snapshots or prefer explicit assertions.

## 14. How do you make tests reliable?

Avoid depending on real time, random values or the network. Use fake timers for debounce and animation, reset mocks between tests with `afterEach`, and make each test independent so the order does not matter. A test that fails sometimes ("flaky") is worse than no test, so fix it or remove it.

## Quick revision checklist

- Test what the user sees and does, not internal implementation.
- Prefer `getByRole` and `getByLabelText`, and use `userEvent`.
- `getBy` throws, `queryBy` returns null, `findBy` waits.
- Mock at the edges, and use MSW for network mocking.
- Cover the critical behaviours, and avoid flaky tests.
