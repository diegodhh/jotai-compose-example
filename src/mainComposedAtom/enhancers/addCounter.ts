/** @format */

import { atom, WritableAtom } from "jotai";
import { AtomEnhancer, DispatcherAction } from "jotai-composer";

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
    read: () => {
      return atom((get) => ({ count: get(countAtom) }));
    },
    write: ({ stateHelper: { set, get }, update }) => {
      if (update.type === CounterAction.ADD_COUNT) {
        set(countAtom, get(countAtom) + 1);
        return {
          shouldAbortNextSetter: true,
        };
      }
      return {
        shouldAbortNextSetter: false,
      };
    },
  };
  return enhancer;
};
