/** @format */

import { atom, WritableAtom } from "jotai";
import { AtomEnhancer, DispatcherAction } from "jotai-composer";

export enum InputAction {
  SET_VALUE = "SET_VALUE",
  RESET = "RESET",
}

export const createInputState = (
  inputAtom: WritableAtom<string, [string], void>,
  initialValue: string = ""
) => {
  const enhancer: AtomEnhancer<
    object,
    DispatcherAction<InputAction, string | undefined>,
    { value: string }
  > = {
    read: ({ last }) => {
      return atom((get) => ({ ...last, value: get(inputAtom) }));
    },
    write: ({ stateHelper: { set }, update }) => {
      if (
        update.type === InputAction.SET_VALUE &&
        typeof update.payload === "string"
      ) {
        set(inputAtom, update.payload);
        return { shouldAbortNextSetter: true };
      }
      if (update.type === InputAction.RESET) {
        set(inputAtom, initialValue);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    },
  };
  return enhancer;
};
