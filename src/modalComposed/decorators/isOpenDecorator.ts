/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";
import { IsOpenState, ModalAction } from "../types";

export const createIsOpenDecorator = (
  isOpenAtom: WritableAtom<boolean, [boolean], void>
) => {
  const isOpenDecorator: ExtendStateAndDeriveDecorator<
    Partial<object>,
    DispatcherAction<ModalAction.OPEN_MODAL | ModalAction.CLOSE_MODAL, never>,
    IsOpenState
  > = {
    getter: () => {
      return atom((get) => ({
        isOpen: get(isOpenAtom),
      }));
    },
    setter: ({ stateHelper: { set }, update }) => {
      if (update.type === ModalAction.OPEN_MODAL) {
        set(isOpenAtom, true);
        return { shouldAbortNextSetter: true };
      }

      if (update.type === ModalAction.CLOSE_MODAL) {
        set(isOpenAtom, false);

        return { shouldAbortNextSetter: true };
      }

      return { shouldAbortNextSetter: false };
    },
  };
  return isOpenDecorator;
};
