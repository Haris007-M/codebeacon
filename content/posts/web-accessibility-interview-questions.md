---
title: "Web accessibility (a11y) interview questions and answers (2026)"
description: "Semantic HTML, keyboard access, ARIA, color contrast, focus management and testing: the accessibility questions frontend interviewers ask, with clear answers and code."
date: "2026-10-31"
category: "Frontend"
readTime: "9 min read"
links:
  - "WCAG overview|https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "ARIA Authoring Practices Guide|https://www.w3.org/WAI/ARIA/apg/"
  - "MDN: Accessibility|https://developer.mozilla.org/en-US/docs/Web/Accessibility"
---

Accessibility means people with different abilities can use your site, including people who use a keyboard only, a screen reader, zoom or voice control. Interviewers ask about it to see whether you build for everyone, and it is the topic many candidates skip. Here are the questions worth preparing.

## 1. What is web accessibility and what is WCAG?

Web accessibility is building sites that people with disabilities can perceive, operate and understand. **WCAG** (Web Content Accessibility Guidelines) is the standard most laws and companies follow. It is organised around four principles, often shortened to POUR: content must be **Perceivable**, **Operable**, **Understandable** and **Robust**. Most teams aim for conformance level **AA**.

## 2. Why is semantic HTML the first step?

Native elements come with roles, keyboard behaviour and screen reader support for free. A `<button>` is focusable, works with Enter and Space and is announced as a button. A `<div onClick>` has none of that until you rebuild it by hand.

```html
<!-- Bad -->
<div class="btn" onclick="save()">Save</div>

<!-- Good -->
<button type="button" onclick="save()">Save</button>
```

Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<h1>` to `<h6>` in order, `<ul>` for lists and `<label>` for form fields. Screen reader users jump between landmarks and headings, so structure is navigation.

## 3. What is the first rule of ARIA?

If a native HTML element already does the job, use it instead of adding ARIA. ARIA changes what assistive technology hears, but it does not add behaviour. A `role="button"` on a `div` still needs focus, key handling and styling from you. Bad ARIA is worse than no ARIA, because it can promise something the element does not do.

## 4. How do you make a page keyboard accessible?

Everything you can do with a mouse must work with the keyboard. In practice:

- Interactive elements must be reachable with Tab, in an order that matches the visual order.
- Never remove the focus outline without replacing it with a clear one.
- Do not use positive `tabindex` values. Use `tabindex="0"` to add something to the tab order and `tabindex="-1"` to allow focus from script only.
- Provide a **skip link** so users can jump past the navigation.

```css
:focus-visible { outline: 3px solid #ffb020; outline-offset: 3px; }
```

## 5. What makes good alt text?

Alt text describes the **purpose** of an image, not every detail. A product photo might be "Red running shoe, side view". A decorative image should have an empty alt, `alt=""`, so screen readers skip it. If an image is a link or button, the alt text should describe where it goes or what it does, such as "CodeBeacon home". Do not start with "image of", because the screen reader already says it is an image.

## 6. What colour contrast is required?

For WCAG AA, normal text needs a contrast ratio of at least **4.5:1** against its background. Large text (about 24px, or 18.66px bold) needs **3:1**, and so do interactive components such as input borders and icons that carry meaning. Never use colour as the only signal. An error should have an icon or text as well as red.

## 7. How do you label form fields?

Every input needs a programmatic label. The best way is a visible `<label>` connected to the field:

```html
<label for="email">Email</label>
<input id="email" type="email" autocomplete="email" required aria-describedby="email-help" />
<p id="email-help">We only use this to reply to you.</p>
```

Do not use the placeholder as the label, because it disappears when you type and often has poor contrast. For errors, show a text message, link it with `aria-describedby` and mark the field `aria-invalid="true"`.

## 8. How do you make a modal dialog accessible?

A good dialog does five things:

1. Moves focus into the dialog when it opens.
2. Keeps focus inside it while it is open (a focus trap).
3. Closes with the Escape key.
4. Returns focus to the button that opened it.
5. Has a role and a name, using `role="dialog"`, `aria-modal="true"` and `aria-labelledby`.

The native `<dialog>` element with `showModal()` handles much of this for you, so mention it.

## 9. What are ARIA live regions?

A live region tells screen readers to announce content that changes without a page reload, such as a toast message, a form error or a search result count. Use `aria-live="polite"` for most updates so the screen reader finishes the current sentence first, and `role="alert"` for urgent messages.

```html
<p aria-live="polite">12 results found</p>
```

## 10. How do you handle focus in a single-page app?

When a client-side route changes, the browser does not reload the page, so a screen reader user may hear nothing. Move focus to the new page heading or the main region after navigation, and update the document title. Frameworks like Next.js announce route changes for you, but you should still check by testing.

## 11. How do you respect motion preferences?

Some users get dizzy or distracted from large animations. The `prefers-reduced-motion` media query lets you turn them off.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

## 12. How do you test accessibility?

Use several layers, because no tool finds everything:

- **Automated:** Lighthouse, axe DevTools or eslint-plugin-jsx-a11y. These catch roughly a third of issues, such as missing labels and low contrast.
- **Keyboard:** unplug the mouse and use the whole page with Tab, Shift+Tab, Enter, Space and Escape.
- **Screen reader:** try VoiceOver on macOS and iOS, NVDA on Windows or TalkBack on Android.
- **Zoom:** at 200% zoom and a narrow window, nothing should be cut off or overlap.

## Quick revision checklist

- Use native elements first, ARIA only when needed.
- Everything works by keyboard and focus is always visible.
- Text contrast is at least 4.5:1, and colour is never the only signal.
- Inputs have real labels and errors are linked to fields.
- Dialogs trap and restore focus, and live regions announce updates.
- Test with an automated tool, a keyboard and a screen reader.
