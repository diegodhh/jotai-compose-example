<!-- @format -->

# Jotai Composer Guide (Example Project)

This guide explains how the example project uses **Jotai Composer** to build a fully-typed, modular state layer composed of multiple **enhancers**.

> Terminology: In this project we **only** use the term **enhancer** (never _decorator_).

---

## What is Jotai Composer?

Jotai Composer is a thin wrapper around [Jotai](https://jotai.org/) that lets you **compose** independent pieces of state logic (enhancers) into a single derived atom. Each enhancer owns its own state slice and actions and can be developed, tested, and reasoned about in isolation.

Key benefits:

- **Modularity** – split complex state into bite-sized pieces
- **Composition** – combine enhancers with simple, readable pipelines
- **Type-safety** – actions and derived state are fully typed
- **Persistence** – still compatible with `atomWithStorage`

---

## Enhancers in this Project

| #   | Enhancer         | File                                              | Purpose                                                                                                    |
| --- | ---------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | Counter          | `src/mainComposedAtom/enhancers/addCounter.ts`    | Adds a numeric `count` value and an action to increment it                                                 |
| 2   | Base             | `src/baseComposeAtom/enhancers/base.ts`           | Stores a `base` number and an action to save it                                                            |
| 3   | Base Plus        | `src/baseComposeAtom/enhancers/basePlus.ts`       | Derives `basePlus = base + 1` from the previous enhancer                                                   |
| 4   | Input State      | `src/mainComposedAtom/enhancers/addInputState.ts` | Manages a text input (`value`) with `SET_VALUE` / `RESET` actions                                          |
| 5   | Modal (composed) | `src/modalComposed`                               | Handles modal visibility, type, and content through three sub-enhancers (`isOpen`, `modalType`, `content`) |

---

### 1 – Counter Enhancer (snippet)

```ts
export enum CounterAction {
  ADD_COUNT = "ADD_COUNT",
}
export const createCounter = (
  countAtom: WritableAtom<number, [number], void>
) => {
  const enhancer: AtomEnhancer<
    object,
    DispatcherAction<CounterAction, never>,
    { count: number }
  > = {
    read: () => atom((get) => ({ count: get(countAtom) })),
    write: ({ stateHelper: { set, get }, update }) => {
      if (update.type === CounterAction.ADD_COUNT) {
        set(countAtom, get(countAtom) + 1);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    },
  };
  return enhancer;
};
```

_(see the source file for full code)_

> All other enhancers follow the same pattern: expose **actions** in an enum and implement a **read/write** pair that maps those actions to state updates.

---

## Composing Enhancers

### Base Compose Atom (sub-composition)

`src/baseComposeAtom/index.ts`

```ts
const baseAtom = atomWithStorage("base", 1);
const composedBaseAtom = pipe(
  enhanceWith(createBase(baseAtom))(),
  enhanceWith(createBasePlus(1))
);
export const baseEnhacer = composedToEnhancer({ composed: composedBaseAtom });
```

### Main Compose Atom

`src/mainComposedAtom/index.ts`

```ts
const counterAtom = atomWithStorage("counter", 0);
const inputAtom = atomWithStorage("input", "");

export const composedAtom = pipe(
  enhanceWith(createCounter(counterAtom))(), // Counter
  enhanceWith(baseEnhacer), // Base + BasePlus
  enhanceWith(createInputState(inputAtom, "")), // Input
  enhanceWith(modalEnhancer) // Modal (isOpen + type + content)
);
```

Result: **`composedAtom`** exposes a single state object:

```ts
{
  count: number;
  base: number;
  basePlus: number;
  value: string; // input value
  modal: {
    isOpen: boolean;
    modalType: ModalType;
    content: string;
  }
}
```

All enhancer actions can be dispatched through the tuple returned by `useAtom(composedAtom)`.

---

## Using the Composed Atom in React

Here is a condensed excerpt from `src/App.tsx` illustrating how to interact with the enhancers:

```tsx
const [state, dispatch] = useAtom(composedAtom);

/* Counter */
<button onClick={() => dispatch({ type: CounterAction.ADD_COUNT })}>
  Add Count
</button>

/* Base (random save) */
<button onClick={() =>
  dispatch({ type: BaseAction.SAVE_BASE, payload: Math.floor(Math.random()*100) })
}>
  Save Random Base
</button>

/* Input */
<input
  value={state.value}
  onChange={(e) => dispatch({ type: InputAction.SET_VALUE, payload: e.target.value })}
/>
<button onClick={() => dispatch({ type: InputAction.RESET })}>Reset</button>

/* Modal */
<button onClick={() => dispatch({ type: ModalAction.OPEN_MODAL })}>Open Modal</button>
```

---

## Best Practices

1. **Single Responsibility** – keep each enhancer focused on a single state slice.
2. **Enum Actions** – always define an enum for actions to guarantee type-safety.
3. **Avoid Circular Reads** – `read` should stay pure (no side-effects).
4. **Return `shouldAbortNextSetter`** – when an enhancer handles an action, return `true` to stop other enhancers from processing it.
5. **Persist Where Needed** – combine `atomWithStorage` with enhancers seamlessly.

---

## Troubleshooting Checklist

| Issue              | Check                                                              |
| ------------------ | ------------------------------------------------------------------ |
| Action not handled | Was the enhancer added to the pipeline? Is the enum value correct? |
| State not updating | Did you forget `shouldAbortNextSetter: true` in `write`?           |
| Type errors        | Ensure payload types in `DispatcherAction` are correct             |

---

## Further Reading

- [Jotai Documentation](https://jotai.org/)
- [Jotai Composer – GitHub](https://github.com/jotai-composer/jotai-composer)
- [Remeda (utility fp)](https://remedajs.com/)
- [TypeScript](https://www.typescriptlang.org/)
