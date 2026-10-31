---
title: "HTTP and REST API interview questions for frontend developers"
description: "HTTP methods, status codes, headers, caching, fetch error handling, REST design, authentication and pagination: the API questions frontend interviews ask, with examples."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "MDN: HTTP overview|https://developer.mozilla.org/en-US/docs/Web/HTTP"
  - "MDN: HTTP response status codes|https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
  - "MDN: Using the Fetch API|https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
---

Almost every frontend app talks to an API, so interviewers expect you to understand HTTP, not just call `fetch`. This guide covers what the browser sends and receives, how REST APIs are designed, and the mistakes people make when handling responses.

## 1. What are the main HTTP methods and what are they for?

- **GET** reads data and should not change anything.
- **POST** creates a resource or triggers an action.
- **PUT** replaces a resource completely.
- **PATCH** changes part of a resource.
- **DELETE** removes a resource.

GET, PUT and DELETE are meant to be **idempotent**, which means that sending the same request several times has the same effect as sending it once. POST is not idempotent, so a double click can create two records.

## 2. What do the common status codes mean?

Know the groups: **2xx** success, **3xx** redirect, **4xx** client error, **5xx** server error. The ones to remember:

- `200` OK, `201` Created, `204` No Content.
- `301` permanent redirect, `304` Not Modified (use the cached copy).
- `400` Bad Request, `401` Unauthorized (not logged in), `403` Forbidden (logged in but not allowed), `404` Not Found, `409` Conflict, `422` validation error, `429` Too Many Requests.
- `500` Internal Server Error, `502` Bad Gateway, `503` Service Unavailable.

## 3. What is the difference between 401 and 403?

`401` means the server does not know who you are, so you need to log in or your token expired. `403` means the server knows who you are and you are not allowed to do this. On a `401` your app should send the user to log in or refresh the token. On a `403` it should show a "no access" message.

## 4. Does fetch reject the promise on a 404 or 500?

No, and this catches many people. `fetch` only rejects on **network failures**, such as no connection. A `404` or `500` response resolves normally, so you must check `response.ok`.

```js
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
```

## 5. How do you send JSON with fetch?

Set the method, the `Content-Type` header and a string body.

```js
const res = await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello" }),
});
```

## 6. How do you cancel a request?

Use an `AbortController`. This is important in React effects, where a fast change of input would otherwise let an old response overwrite a newer one.

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort(); // the fetch rejects with an AbortError
```

## 7. What makes an API RESTful?

REST is a style where **resources** are identified by URLs and you act on them with HTTP methods. Good design uses nouns in the path, not verbs, and plural names: `GET /posts`, `GET /posts/42`, `POST /posts`, `DELETE /posts/42`. The server is **stateless**, meaning each request carries everything needed, so there is no hidden session on the server between calls.

## 8. What is the difference between REST and GraphQL?

REST has many endpoints and each returns a fixed shape, which can cause over-fetching (too much data) or under-fetching (several calls needed). GraphQL has one endpoint and the client asks for exactly the fields it needs, which is flexible for complex screens but adds complexity for caching and server design. Neither is better in every case.

## 9. How does HTTP caching work?

The server sends headers that tell the browser how long it can reuse a response.

- `Cache-Control: max-age=3600` lets the browser reuse it for an hour.
- `Cache-Control: no-store` forbids storing it.
- `ETag` and `If-None-Match` let the browser ask "has this changed?", and the server replies `304 Not Modified` with no body if not.

Static files with hashed names are cached for a long time. API responses with personal data should not be cached by shared caches.

## 10. How do you handle pagination?

Two common approaches:

- **Offset or page based:** `?page=2&limit=20`. Simple, but items can shift if data changes between requests.
- **Cursor based:** `?after=abc123`. More reliable for feeds and infinite scroll, because the cursor points to a specific item.

Always show loading and empty states, and stop requesting when there is no next page.

## 11. How do you authenticate API requests?

Common methods: a **session cookie** set by the server, or a **token** (such as a JWT) sent in the `Authorization: Bearer <token>` header. Cookies marked `HttpOnly`, `Secure` and `SameSite` are safer against XSS but need CSRF protection. Always use HTTPS, and never put secrets in frontend code, because anything in the browser can be read.

## 12. What is a race condition in data fetching and how do you avoid it?

If a user types quickly, several requests are in flight and the responses can come back in a different order, so an older result overwrites a newer one. Avoid it by aborting the previous request, or by ignoring responses whose request is no longer the latest. Libraries like TanStack Query handle this for you.

## 13. How do you handle loading and error states properly?

Every request has at least four states: **idle, loading, success and error**. Show a skeleton or spinner while loading, a clear message and a retry button on error, and a helpful empty state when the list is empty. Do not leave the user looking at a blank screen.

## 14. What is the difference between a cookie and a token stored in localStorage?

Cookies are sent automatically by the browser and can be hidden from scripts with `HttpOnly`. A token in `localStorage` has to be added by your code and can be read by any script on the page, so an XSS bug exposes it. Many teams prefer HttpOnly cookies for sessions for this reason.

## 15. What are optimistic updates?

You update the UI immediately, as if the request will succeed, then send it. If it fails, you roll back and show an error. It makes actions like "like" or "add to list" feel instant. It needs a clear rollback path.

## Quick revision checklist

- Know GET, POST, PUT, PATCH and DELETE, and what idempotent means.
- `fetch` does not reject on 4xx or 5xx, so check `response.ok`.
- 401 means log in, 403 means not allowed.
- Use `AbortController` to cancel requests and avoid race conditions.
- Handle loading, error and empty states for every request.
