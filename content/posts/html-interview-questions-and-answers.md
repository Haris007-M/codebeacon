---
title: "20 HTML interview questions and answers with examples (2026)"
description: "HTML interview questions on semantic elements, doctype, forms, data attributes, script loading, meta tags and SEO basics, with short answers and code you can reuse."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "MDN: HTML reference|https://developer.mozilla.org/en-US/docs/Web/HTML"
  - "MDN: HTML elements|https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
  - "web.dev: Learn HTML|https://web.dev/learn/html"
---

HTML looks easy, so interviewers use it to separate people who memorised tags from people who understand the web platform. Here are the questions that come up most, with answers short enough to say aloud.

## 1. What is the purpose of the doctype?

The `<!DOCTYPE html>` line tells the browser to use **standards mode**. Without it, browsers fall back to quirks mode, where layout and box sizing can behave in older, inconsistent ways. Always put it on the first line.

## 2. What is semantic HTML and why does it matter?

Semantic HTML uses elements that describe their meaning, such as `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` and `<footer>`, instead of generic `<div>` and `<span>` everywhere. It helps screen readers and keyboard users, helps search engines understand the page, and makes code easier to read.

```html
<article>
  <header><h1>Post title</h1></header>
  <p>Content...</p>
  <footer>Published on 31 October</footer>
</article>
```

## 3. What is the difference between div and span?

A `<div>` is a **block-level** container that starts on a new line and takes the full width. A `<span>` is **inline** and only takes the space it needs. Both have no meaning of their own, so use them only when no semantic element fits.

## 4. What is the difference between block, inline and inline-block elements?

Block elements stack vertically and accept width, height and vertical margins. Inline elements flow within text and ignore width and height. `inline-block` flows like text but accepts width and height. You can change any element's behaviour with the CSS `display` property.

## 5. What is the difference between section, article and div?

Use `<article>` for a self-contained piece that makes sense on its own, such as a blog post or a product card. Use `<section>` for a themed group of content that usually has a heading. Use `<div>` when you need a wrapper only for styling or scripting, with no meaning.

## 6. Why should every page have one h1 and a logical heading order?

Headings form an outline of the page. Screen reader users jump from heading to heading to navigate, and search engines use them to understand structure. Use one `<h1>` for the main topic, then `<h2>` for sections and `<h3>` for subsections, without skipping levels. Never pick a heading just for its size, because you can change size with CSS.

## 7. What is the viewport meta tag?

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

It tells mobile browsers to use the device width as the layout width. Without it, phones pretend to be about 980px wide and shrink the page, so your responsive CSS does not work.

## 8. What is the difference between async and defer on a script?

Both download the script without blocking HTML parsing. `defer` runs it after the document is parsed, in order. `async` runs it as soon as it has downloaded, in any order. Use `defer` for scripts that depend on the DOM or on each other, and `async` for independent ones such as analytics.

## 9. How do you make a form accessible and easy to use?

Connect every field to a `<label>`, use the correct `type` (`email`, `tel`, `number`, `date`) so mobile keyboards and validation help the user, and add `autocomplete` hints and the `required` attribute.

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required />
  <button type="submit">Subscribe</button>
</form>
```

## 10. What is the difference between GET and POST in a form?

`GET` puts the data in the URL, so it can be bookmarked, cached and shared, which is right for searches and filters. `POST` sends the data in the request body, which is right for changes such as creating an account or submitting a message, and for anything private. Never send passwords with GET.

## 11. What are data attributes?

Custom attributes that start with `data-` let you store small pieces of information on an element for CSS or JavaScript.

```html
<button data-product-id="42" data-price="19">Add to cart</button>
```

```js
const { productId } = button.dataset; // "42"
```

## 12. What is the difference between localStorage, sessionStorage and cookies?

- **localStorage:** about 5 MB, stays until you clear it, never sent to the server automatically.
- **sessionStorage:** the same API, but cleared when the tab closes.
- **Cookies:** about 4 KB, sent with every request to the matching site, and can be made HttpOnly so scripts cannot read them.

Do not store secrets or tokens in localStorage if your app could suffer XSS.

## 13. What does the alt attribute do?

It gives a text alternative for an image. Screen readers read it, and it shows if the image fails to load. Describe the image's purpose, and use an empty `alt=""` for purely decorative images so they are skipped.

## 14. How do you load images efficiently?

Set `width` and `height` to prevent layout shift, use `loading="lazy"` for images below the fold, and give the browser choices with `srcset` and `sizes` so a phone does not download a desktop-sized image.

```html
<img src="photo-800.webp" srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1600.webp 1600w"
     sizes="(max-width: 600px) 100vw, 800px" width="800" height="450" alt="Team at work" loading="lazy" />
```

## 15. What does the picture element do?

It lets you offer different sources, for different formats or for art direction, and the browser chooses the first one it supports.

```html
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="Hero" />
</picture>
```

## 16. What is the difference between a link and a button?

A link (`<a href>`) **navigates** somewhere. A button (`<button>`) **does** something on the current page, such as opening a menu or submitting a form. Using the wrong one hurts accessibility. For example, a link without an `href` is not keyboard-focusable.

## 17. What are the important meta tags for SEO?

The `<title>` and `<meta name="description">` shape your search result. Add a `<link rel="canonical">` to point to the preferred URL, `<meta name="robots">` to control indexing, and Open Graph tags (`og:title`, `og:image`) to control how links look when shared.

## 18. What does rel="noopener noreferrer" do on a link?

When you use `target="_blank"`, `noopener` stops the new page from controlling your page through `window.opener`. `noreferrer` also hides the referring URL. Modern browsers apply `noopener` by default for `_blank`, but it is still good practice to write it.

## 19. What are HTML entities?

They let you write characters that have special meaning in HTML, such as `&lt;` for `<`, `&gt;` for `>`, `&amp;` for `&` and `&nbsp;` for a non-breaking space. Always escape untrusted text before putting it in HTML to avoid XSS.

## 20. What is the difference between the head and body elements?

`<head>` holds information about the page that is not shown directly: the title, meta tags, stylesheets and scripts. `<body>` holds the visible content. Put critical CSS in the head and non-critical scripts at the end of the body or use `defer`.

## Quick revision checklist

- Always add the doctype and the viewport meta tag.
- Use semantic elements and a logical heading order.
- Connect labels to inputs and use the right input types.
- Use `defer` for scripts and `loading="lazy"` for images below the fold.
- Know the difference between localStorage, sessionStorage and cookies.
