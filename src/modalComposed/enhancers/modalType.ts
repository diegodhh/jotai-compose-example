/** @format */

import { atom, WritableAtom } from "jotai";
import { AtomEnhancer, DispatcherAction } from "jotai-composer";
import { ModalAction, ModalType, ModalTypeState } from "../types";

export const createModalType = (
  modalTypeAtom: WritableAtom<ModalType, [ModalType], void>
) => {
  const enhancer: AtomEnhancer<
    Partial<object>,
    Required<DispatcherAction<ModalAction.SET_MODAL_TYPE, ModalType>>,
    ModalTypeState
  > = {
    read: () => {
      return atom((get) => ({ modalType: get(modalTypeAtom) }));
    },
    write: ({ stateHelper: { set }, update }) => {
      if (update.type === ModalAction.SET_MODAL_TYPE) {
        set(modalTypeAtom, update.payload);
        return { shouldAbortNextSetter: true };
      }

      return { shouldAbortNextSetter: false };
    },
  };
  return enhancer;
};
