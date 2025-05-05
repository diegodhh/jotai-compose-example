/** @format */

import { WritableAtom } from "jotai";
import { atomEnhancer, DispatcherAction } from "jotai-composer";
import { IsOpenState, ModalAction } from "../types";

export const createIsOpen = (
  isOpenAtom: WritableAtom<boolean, [boolean], void>
) => {
  return atomEnhancer<
    Partial<object>,
    DispatcherAction<ModalAction.OPEN_MODAL | ModalAction.CLOSE_MODAL, never>,
    IsOpenState
  >(
    (get) => ({
      isOpen: get(isOpenAtom),
    }),
    (get, set, update) => {
      if (update.type === ModalAction.OPEN_MODAL) {
        set(isOpenAtom, true);
        return { shouldAbortNextSetter: true };
      }

      if (update.type === ModalAction.CLOSE_MODAL) {
        set(isOpenAtom, false);
        return { shouldAbortNextSetter: true };
      }

      return { shouldAbortNextSetter: false };
    }
  );
};
