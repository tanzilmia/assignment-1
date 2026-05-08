# TypeScript Assignment: Advanced Problem Solving & OOP

This repo holds the coursework for **B7A1**— seven small TypeScript exercises in one module plus two short technical write-ups.

## What's inside

| File           | Purpose |
|----------------|---------|
| `solutions.ts` | All problem solutions (exported functions, types, and classes). |
| `blog-1.md`  | Article on `any` vs `unknown` and type narrowing. |
| `blog-2.md`  | Article on generics and reusable typed code. |

There are **no** `console.log` calls in `solutions.ts`; everything returns values as required.

## Problems covered

1. **filterEvenNumbers** — filter even integers from an array.
2. **reverseString** — reverse a string character by character.
3. **StringOrNumber** and **checkType** — union type plus `typeof` narrowing returning `"String"` or `"Number"`.
4. **getProperty** — generic property access with `keyof` constraint.
5. **Book**, **toggleReadStatus** — spread into a new object with **`isRead` defaulting to `true`**.
6. **Person** / **Student** — inheritance with **getDetails** matching the specified label casing.
7. **getIntersection** — numbers appearing in **both** arrays, order preserved from the first array.

String output for **getDetails** is intentionally verbatim:  
`Name: …, Age: …, Grade: …` (capital letters as in the brief).

## How to type-check locally

From the project root (no local install required):

```bash
npx -p typescript tsc --noEmit --strict solutions.ts --moduleResolution bundler --module esnext --target ES2022
```

Or add your own `tsconfig.json` / `package.json` if your course expects a full Node project scaffold.

## Blog posts

Choose two topics—here, **Blog 1** covers the `any` / `unknown` split and narrowing; **Blog 2** covers generics. Both use Markdown headings, prose, fenced code samples, and a short closing section so they read like normal technical notes rather than bullet homework dumps.

---

*Assignment context: fundamentals of typing, interfaces, classes with inheritance, type guards, and simple data-structure work in TypeScript.*
