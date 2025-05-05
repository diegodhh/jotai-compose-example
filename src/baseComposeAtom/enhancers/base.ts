/** @format */

import { WritableAtom } from "jotai";
import { atomEnhancer, DispatcherAction } from "jotai-composer";
import { Base, BaseAction } from "../types";

export const createBase = (
  baseNumberAtom: WritableAtom<number, [number], void>
) => {
  return atomEnhancer<
    Partial<object>,
    Required<DispatcherAction<BaseAction, number>>,
    Base
  >(
    (get) => ({
      base: get(baseNumberAtom),
    }),
    (get, set, update) => {
      if (update.type === BaseAction.SAVE_BASE) {
        set(baseNumberAtom, update.payload ?? 0);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    }
  );
};
