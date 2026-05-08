# Generics: Reusable Code That Stays Typed

## Introduction

Duplication hurts maintainability; loose typing hurts reliability. **Generics** let you write one function or component that works across many shapes while keeping relationships between inputs and outputs visible to the compiler. Instead of collapsing everything to `any`, you introduce type parameters—placeholders solved when the caller uses the abstraction.

## The core idea

A generic function declares one or more type parameters in angle brackets and reuses them in parameters and return types:

```typescript
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const num = firstItem([10, 20]); // number | undefined
const label = firstItem(["east", "west"]); // string | undefined
```

TypeScript infers `T` from the argument. You wrote the logic once; the two call sites retain distinct types without manual overloads.

## Constraints keep generics honest

Sometimes “any type” is too broad. **Constraints** narrow type parameters so only objects with certain properties are accepted:

```typescript
function pickName<T extends { name: string }>(entity: T): string {
  return entity.name;
}
```

`extends` communicates requirements. Attempting `pickName(42)` fails at compile time, while `pickName({ id: 1, name: "Ada" })` succeeds and preserves the wider shape on the argument where needed.

Maps, parsers, and repository layers commonly combine generics with constraints (`keyof`, indexed access types) to relate keys and values safely.

## Reusable components beyond functions

Classes and interfaces benefit too. A minimal event emitter sketch:

```typescript
type Listener<T> = (payload: T) => void;

class Emitter<EventMap extends Record<string, unknown>> {
  private handlers = new Map<keyof EventMap, Set<Listener<unknown>>>();

  on<K extends keyof EventMap>(
    event: K,
    listener: Listener<EventMap[K]>
  ): void {
    const bucket =
      this.handlers.get(event) ?? new Set<Listener<unknown>>();
    bucket.add(listener as Listener<unknown>);
    this.handlers.set(event, bucket);
  }
}
```

Even without perfect emitter typing, the pattern shows generics carrying structured event payloads across a shared implementation.

Pair generics with defaults when sensible (`T = string`) and with utility types (`Partial`, `Readonly`) to describe variations without exploding the number of hand-written interfaces.

## Conclusion

Generics shine when behavior is identical but data shapes differ—collections, serializers, caches, hooks, adapters. Used with constraints and narrowing, they keep APIs flexible without surrendering compile-time guarantees. Investing a little abstraction up front routinely pays off whenever the team adds the next variant to the domain.
