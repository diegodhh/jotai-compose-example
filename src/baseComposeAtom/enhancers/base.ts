/** @format */

import { atom, WritableAtom } from "jotai";
import { AtomEnhancer, DispatcherAction } from "jotai-composer";
import { Base, BaseAction } from "../types";

export const createBase = (
  baseNumberAtom: WritableAtom<number, [number], void>
) => {
  const enhancer: AtomEnhancer<
    Partial<object>,
    Required<DispatcherAction<BaseAction, number>>,
    Base
  > = {
    read: () => {
      return atom((get) => ({
        base: get(baseNumberAtom),
      }));
    },
    write: ({ stateHelper: { set }, update }) => {
      if (update.type === BaseAction.SAVE_BASE) {
        set(baseNumberAtom, update.payload ?? 0);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    },
  };
  return enhancer;
};
