/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";

export enum Action {
  ADD_COUNT = "ADD_COUNT",
}

export const createCounterDecorator = (
  countAtom: WritableAtom<number, [number], void>
) => {
  const counterDecorator: ExtendStateAndDeriveDecorator<
    object,
    DispatcherAction<Action, never>,
    { count: number }
  > = {
    getter: ({ last }) => {
      return atom((get) => ({ count: get(countAtom) }));
    },
    setter: ({ stateHelper: { set, get }, update }) => {
      if (update.type === Action.ADD_COUNT) {
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
  return counterDecorator;
};
