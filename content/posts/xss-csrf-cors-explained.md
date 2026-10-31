---
title: "XSS, CSRF and CORS explained: frontend security interview questions"
description: "The difference between XSS, CSRF and CORS, how React protects you, where to store tokens, what a preflight request is and how to fix the common CORS error."
date: "2026-10-31"
category: "Frontend"
readTime: "8 min read"
links:
  - "OWASP: Cross Site Scripting|https://owasp.org/www-community/attacks/xss/"
  - "OWASP: Cross Site Request Forgery|https://owasp.org/www-community/attacks/csrf"
  - "MDN: CORS|https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
---

XSS, CSRF and CORS are three different things that people mix up all the time. Interviewers like this topic because a clear answer shows that you understand how the browser works. Here is each one in plain words, with the questions you are likely to get.

## 1. What is XSS and why is it dangerous?

Cross-site scripting (XSS) is when an attacker gets their JavaScript to run on **your** page, in your visitor's browser. That script can read the page, call your API as the user, steal data and change what the user sees. It happens when you put untrusted input into the page as HTML.

There are three types:

- **Stored XSS:** the malicious input is saved, for example in a comment, and shown to every visitor.
- **Reflected XSS:** the input comes from the URL or a form and is echoed straight back in the response.
- **DOM-based XSS:** client-side code writes untrusted data into the DOM, for example with `innerHTML`.

## 2. Does React protect you from XSS?

Mostly, yes. React escapes values inside JSX before it puts them in the DOM, so text such as `<script>` is shown as text and never runs.

```tsx
const comment = '<img src=x onerror="alert(1)">';
return <p>{comment}</p>; // safe: rendered as plain text
```

React cannot protect you when you bypass it. The main danger is `dangerouslySetInnerHTML`, and so are `href` values such as `javascript:` URLs, `eval` and building HTML strings yourself.

## 3. How do you render user HTML safely?

Avoid it if you can. If you must, **sanitize** it with a maintained library such as DOMPurify before rendering, and only allow the tags you need.

```tsx
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
```

For content you wrote yourself, such as Markdown from your own repository, the risk is much lower, but sanitizing is still a good habit if the content ever comes from users.

## 4. What is a Content Security Policy?

A Content Security Policy (CSP) is a response header that tells the browser which sources of scripts, styles, images and frames are allowed. Even if an attacker injects a script tag, the browser refuses to run it when the policy does not allow it. It is a second line of defence, not a replacement for escaping input.

## 5. What is CSRF?

Cross-site request forgery (CSRF) tricks a logged-in user's browser into sending a request to your site that they did not intend. Because browsers attach cookies automatically, a hidden form on a bad site can submit a "transfer money" or "change email" request to your site, and your server sees a valid session.

The attacker cannot read the response, but they can cause a state change.

## 6. How do you prevent CSRF?

- Set session cookies with `SameSite=Lax` or `SameSite=Strict`, so the browser does not send them on most cross-site requests. Modern browsers already default to Lax.
- Use **CSRF tokens**: a secret value the server gives your page and expects back in a header or form field, which another site cannot read.
- Check the `Origin` or `Referer` header on state-changing requests.
- Use POST, PUT or DELETE for changes, never GET.

## 7. What is the difference between XSS and CSRF?

XSS runs the attacker's code **inside your site**, so it can do and read almost anything the user can. CSRF makes the user's browser send a request **from another site**, so the attacker can trigger actions but cannot read data. A site with an XSS hole can also defeat CSRF protection, because the injected script can read the token. That is why XSS is usually treated as the more serious one.

## 8. What is CORS and what problem does it solve?

Browsers follow the **same-origin policy**: a page can freely call its own origin, but JavaScript on one origin cannot read responses from another unless that server allows it. An origin is the combination of scheme, host and port. CORS (Cross-Origin Resource Sharing) is the set of headers a server uses to say "this other origin may read my responses".

```
Access-Control-Allow-Origin: https://app.example.com
```

## 9. Is CORS a security feature that protects my API?

No. CORS only controls what **browsers** let JavaScript read. A script, `curl` or any server can call your API without caring about CORS. It protects users from malicious websites reading their data, not your server from callers. Your API still needs real authentication and authorisation.

## 10. What is a preflight request?

For requests that could be dangerous, such as those with custom headers like `Authorization`, or methods like PUT and DELETE, the browser first sends an `OPTIONS` request to ask permission. The server replies with which origins, methods and headers it allows. If the answer is no, the real request is never sent.

```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
```

## 11. How do you fix "blocked by CORS policy"?

Fix it on the **server** by returning the right headers, because the browser is enforcing the rule and the frontend cannot override it. Allow the exact origin you need. If your requests send cookies (`credentials: "include"`), the server must return a specific origin, not `*`, and also `Access-Control-Allow-Credentials: true`.

During development you can avoid CORS by proxying requests through your own server, for example with Next.js route handlers or a rewrite, so the browser only talks to one origin.

## 12. Where should you store an authentication token?

There is no perfect answer, but you should know the trade-offs:

- **localStorage** is simple but any XSS can read it.
- **HttpOnly cookies** cannot be read by JavaScript, so XSS cannot steal them, but they need CSRF protection and the right `SameSite` and `Secure` flags.

Many teams choose HttpOnly, Secure, SameSite cookies for sessions, and the best answer in an interview is to explain this trade-off.

## Quick revision checklist

- XSS is attacker script running on your page, CSRF is a forged request using the user's cookies, and CORS is the browser rule for cross-origin reads.
- React escapes JSX, but `dangerouslySetInnerHTML` and `javascript:` URLs bypass it.
- Defend with escaping and sanitizing, CSP, SameSite cookies and CSRF tokens.
- Fix CORS errors on the server, and remember that CORS does not protect your API.
