/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";
import { Base } from "../types";
import { BaseAction } from "./basePlusOneDecorator";

export const createBaseDecorator = (
  baseNumberAtom: WritableAtom<number, [number], void>
) => {
  const firstPlusOneDecorator: ExtendStateAndDeriveDecorator<
    Partial<object>,
    Required<DispatcherAction<BaseAction, number>>,
    Base
  > = {
    getter: () => {
      return atom((get) => ({
        base: get(baseNumberAtom),
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
