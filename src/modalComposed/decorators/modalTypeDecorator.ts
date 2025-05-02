/** @format */

import { atom, WritableAtom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";
import { ModalAction, ModalType, ModalTypeState } from "../types";

export const createModalTypeDecorator = (
  modalTypeAtom: WritableAtom<ModalType, [ModalType], void>
) => {
  const decorator: ExtendStateAndDeriveDecorator<
    Partial<object>,
    Required<DispatcherAction<ModalAction.SET_MODAL_TYPE, ModalType>>,
    ModalTypeState
  > = {
    getter: () => {
      return atom((get) => ({ modalType: get(modalTypeAtom) }));
    },
    setter: ({ stateHelper: { set }, update }) => {
      if (update.type === ModalAction.SET_MODAL_TYPE) {
        set(modalTypeAtom, update.payload);
        return { shouldAbortNextSetter: true };
      }

      return { shouldAbortNextSetter: false };
    },
  };
  return decorator;
};
