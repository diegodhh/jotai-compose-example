/** @format */

import { WritableAtom } from "jotai";
import { atomEnhancer, DispatcherAction } from "jotai-composer";

export enum InputAction {
  SET_VALUE = "SET_VALUE",
  RESET = "RESET",
}

export const createInputState = (
  inputAtom: WritableAtom<string, [string], void>,
  initialValue: string = ""
) => {
  return atomEnhancer<
    object,
    DispatcherAction<InputAction, string | undefined>,
    { value: string }
  >(
    (get) => ({ value: get(inputAtom) }),
    (get, set, update) => {
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
    }
  );
};
