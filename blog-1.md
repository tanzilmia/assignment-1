# Why `any` Weakens Safety and How `unknown` (plus narrowing) Helps

## Introduction

When TypeScript landed in real projects, `any` often felt like an escape hatch: “I will sort the types later.” Later rarely comes. The compiler stops helping you exactly where unpredictable data enters your program—precisely where you want the most caution. Understanding why `any` is called a “type safety hole,” what `unknown` buys you instead, and how **type narrowing** connects the dots will keep your codebase honest without slowing you down.

## The problem with `any`

`any` turns off checking for that value **and anything you derive from it**. Assign it to anything, access any property, call it like a function: the checker assumes you are right.

```typescript
function parseConfig(raw: any) {
  return raw.retryCount.toFixed(2);
}
```

If `raw` is `undefined`, missing `retryCount`, or not a number, you only discover the failure at runtime. TypeScript promised static safety; `any` hands that promise back unchecked.

People reach for `any` when integrating JSON, DOM events, third-party callbacks, or “we do not know yet” shapes of data. The intent is pragmatic, but the effect is wholesale opt-out.

## Why `unknown` is the safer default

`unknown` means “there is a value here, but we have not proved what it can do.” You cannot use it until you narrow it:

```typescript
function safeLength(value: unknown) {
  if (typeof value === "string") {
    return value.length;
  }
  return 0;
}
```

Inside the `typeof value === "string"` branch, TypeScript narrows `unknown` to `string`. Outside, you still cannot treat `value` like a string. That friction is deliberate: it forces you to validate or discriminate before touching the data.

Compared to `any`, `unknown`:

- Keeps contagion localized; it does not silently poison surrounding expressions.
- Encourages explicit guards, schemas, or parsing steps at boundaries (API responses, CLI args, browser storage).

## Type narrowing in practice

**Type narrowing** is how TypeScript refines a union or `unknown` to a smaller type inside a control-flow region. Common tools:

1. **`typeof` and `typeof` checks** for primitives.
2. **`instanceof`** for classes and built-ins.
3. **Truthiness checks** (`if (user)` narrows optional values).
4. **Discriminated unions** (`kind: "success"` vs `"error"`).

```typescript
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function unwrap<T>(result: Result<T>): T {
  if (result.ok) {
    return result.value;
  }
  throw new Error(result.error);
}
```

Here the `ok` flag is the discriminator. TypeScript narrows `result` in each branch without extra casts.

User-defined **type predicates** bundle repeated checks:

```typescript
function isBook(value: unknown): value is { title: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    typeof (value as { title: unknown }).title === "string"
  );
}
```

## Conclusion

Labeling data as `any` is tempting when typing feels expensive, but it trades away TypeScript’s main benefit. Prefer `unknown` at boundaries, then narrow with disciplined checks—`typeof`, `instanceof`, discriminated unions, or validation libraries. Narrowing connects runtime reality with static guarantees, which is exactly what strong TypeScript teams rely on day to day.
