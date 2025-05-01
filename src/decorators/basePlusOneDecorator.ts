/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";

export type FirstPlusOne = {
  base: number;
  firstPlusOne: number;
};

export enum BaseAction {
  SAVE_BASE = "SAVE_BASE",
}

export const createBasePlusOneDecorator = (
  baseNumberAtom: WritableAtom<number, [number], void>
) => {
  const firstPlusOneDecorator: ExtendStateAndDeriveDecorator<
    Partial<object>,
    Required<DispatcherAction<BaseAction, number>>,
    FirstPlusOne
  > = {
    getter: () => {
      return atom((get) => ({
        base: get(baseNumberAtom),
        firstPlusOne: get(baseNumberAtom) + 1,
      }));
    },
    setter: ({ stateHelper: { set }, update }) => {
      if (update.type === BaseAction.SAVE_BASE) {
        set(baseNumberAtom, update.payload ?? 0);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    },
  };
  return firstPlusOneDecorator;
};
