/** @format */

import { WritableAtom } from "jotai";
import { atomEnhancer, DispatcherAction } from "jotai-composer";

export enum CounterAction {
  ADD_COUNT = "ADD_COUNT",
}

export const createCounter = (
  countAtom: WritableAtom<number, [number], void>
) => {
  return atomEnhancer<
    object,
    DispatcherAction<CounterAction, never>,
    { count: number }
  >(
    (get) => ({ count: get(countAtom) }),
    (get, set, update) => {
      if (update.type === CounterAction.ADD_COUNT) {
        set(countAtom, get(countAtom) + 1);
        return {
          shouldAbortNextSetter: true,
        };
      }
      return {
        shouldAbortNextSetter: false,
      };
    }
  );
};
