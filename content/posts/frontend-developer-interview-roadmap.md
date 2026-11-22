---
title: "Frontend developer interview roadmap: what to study and in what order"
description: "A practical study plan covering HTML, CSS, JavaScript, React, Git and system design basics."
date: "2026-10-02"
category: "Frontend"
readTime: "5 min read"
links:
  - "Frontend roadmap|https://roadmap.sh/frontend"
  - "MDN: Learn web development|https://developer.mozilla.org/en-US/docs/Learn_web_development"
  - "web.dev Learn|https://web.dev/learn"
---

Preparing for a frontend interview without a plan usually means jumping between random tutorials and forgetting most of them. A roadmap fixes that by putting topics in the order they depend on each other: layout and JavaScript first, then frameworks, then tools and practice. This guide shows what to study, in what order, what interviewers look for at each level, and how to practice so your answers hold up under pressure.

## Start with fundamentals

Semantic HTML, the CSS box model, flexbox, grid, and responsive design. Many interviews begin here, and weak basics cost points fast.

## Master JavaScript next

Scope, closures, `this`, prototypes, promises, async/await and the event loop. Practice explaining each out loud.

## Then your framework

For React: components, props vs state, hooks, rendering, keys, context and performance. For Next.js: routing, server vs client components and data fetching.

## Add the tools

Git workflows, TypeScript basics, testing with Jest or Vitest, and how to debug in browser DevTools.

## Practice the format

Do small coding exercises, build one real project you can walk through in detail, and prepare short stories about problems you solved.

## Accessibility and performance

Know semantic markup, keyboard focus, alt text, and the Core Web Vitals (LCP, INP, CLS). They separate strong candidates from average ones.

## What do interviewers test at each level?

The topics overlap, but the depth changes:

- **Junior:** HTML, CSS and JavaScript fundamentals, small coding exercises, and whether you can explain your own project.
- **Mid-level:** framework depth (hooks, rendering, state management), debugging, testing, and trade-offs between two reasonable options.
- **Senior:** architecture, performance, accessibility, system design, and how you mentor others and make decisions as a team.

Knowing your level helps you decide where to spend time. A junior candidate gains more from solid CSS and closures than from learning another state library.

## What does a typical interview process look like?

It varies by company, but most loops include a recruiter call, a technical screen with questions or a live coding task, and sometimes a take-home project. Mid-level and senior roles often add a system design round, and nearly every process has a behavioral conversation about teamwork and past projects. Ask the recruiter for the format so you can practice the right thing.

## A four-week plan

- **Week 1:** HTML, CSS layout (flexbox, grid), responsive design, accessibility basics.
- **Week 2:** JavaScript core: closures, promises, array methods, DOM events.
- **Week 3:** React and Next.js: hooks, rendering, routing, data fetching.
- **Week 4:** Git, TypeScript, performance, then mock interviews.

## How should you practice explaining answers?

Reading an answer and saying it are different skills. For each topic, give a two-sentence answer out loud, then add one example. If you cannot explain it simply, you probably do not understand it yet. Record yourself or practice with a friend, and use the same structure every time: **short answer, reason, example**. That structure keeps you calm when the question is unfamiliar.

## Practice exercises worth doing

```js
// 1. Flatten a nested array
const flat = [1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// 2. Count word frequency
const count = (s) => s.split(/\s+/).reduce((m, w) => ({ ...m, [w]: (m[w] || 0) + 1 }), {});
```

## Projects that impress interviewers

A searchable list with filters, a form with validation, and a dashboard that fetches live data. Be ready to explain every decision in each one.

## How should you spend the last few days before an interview?

Stop learning new topics and start consolidating. Re-read your own notes, redo the exercises you got wrong, and run through your main project from start to finish: what problem it solves, how it is structured, what went wrong and what you would change. Prepare two or three questions about the team and the product, because interviewers notice candidates who are curious about the work. Sleep matters more than one extra hour of study the night before.

## How do you turn a personal project into good interview material?

Interviewers do not need a huge app. They need one you understand completely. Choose a project with real data, a form, loading and error states, and a deployed link. Write a short README that explains the problem, the stack and two decisions you made, such as why you chose a certain way to manage state. Then practice a two-minute walkthrough, because "tell me about a project you built" is almost always the first question.

## What are the most common mistakes?

- Memorizing answers without understanding them, which falls apart at the first follow-up question.
- Skipping fundamentals to learn a new framework feature.
- Coding in silence. Interviewers cannot give credit for thinking they cannot hear.
- Ignoring accessibility and performance until the last week.
- Not knowing your own project well enough to explain why you made each decision.

## Where to go deeper

Once you have the order, work through the topic guides on this site:

- [HTML interview questions and answers](/blog/html-interview-questions-and-answers)
- [CSS flexbox vs grid interview questions](/blog/css-flexbox-vs-grid-interview-questions)
- [JavaScript interview questions and answers](/blog/javascript-interview-questions-and-answers)
- [React interview questions and answers](/blog/react-interview-questions-and-answers)
- [Git interview questions](/blog/git-interview-questions)
- [Web accessibility interview questions](/blog/web-accessibility-interview-questions)
- [Core Web Vitals explained](/blog/core-web-vitals-explained-lcp-inp-cls)
- [Frontend system design interview questions](/blog/frontend-system-design-interview-questions)
- [Behavioral interview questions for frontend developers](/blog/behavioral-interview-questions-for-frontend-developers)

Pick one topic per day, read the article, close it, and explain the main points out loud. Repeat the topics you stumbled on at the end of each week.
