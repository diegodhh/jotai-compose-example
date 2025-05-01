/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";

export type ModalState = {
  isOpen: boolean;
  content: string | null;
};

export enum ModalAction {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

export const createModalDecorator = (
  modalAtom: WritableAtom<ModalState, [ModalState], void>
) => {
  const modalDecorator: ExtendStateAndDeriveDecorator<
    Partial<object>,
    Required<DispatcherAction<ModalAction, string | null>>,
    ModalState
  > = {
    getter: () => {
      return atom((get) => get(modalAtom));
    },
    setter: ({ stateHelper: { set, get }, update }) => {
      if (update.type === ModalAction.OPEN_MODAL) {
        set(modalAtom, {
          isOpen: true,
          content: update.payload,
        });
        return { shouldAbortNextSetter: true };
      }

      if (update.type === ModalAction.CLOSE_MODAL) {
        set(modalAtom, {
          isOpen: false,
          content: null,
        });
        return { shouldAbortNextSetter: true };
      }

      return { shouldAbortNextSetter: false };
    },
  };
  return modalDecorator;
};
