/** @format */

import { WritableAtom } from "jotai";
import { atomEnhancer, DispatcherAction } from "jotai-composer";
import { ModalAction, ModalType, ModalTypeState } from "../types";

export const createModalType = (
  modalTypeAtom: WritableAtom<ModalType, [ModalType], void>
) => {
  return atomEnhancer<
    Partial<object>,
    Required<DispatcherAction<ModalAction.SET_MODAL_TYPE, ModalType>>,
    ModalTypeState
  >(
    (get) => ({ modalType: get(modalTypeAtom) }),
    (get, set, update) => {
      if (update.type === ModalAction.SET_MODAL_TYPE) {
        set(modalTypeAtom, update.payload);
        return { shouldAbortNextSetter: true };
      }
      return { shouldAbortNextSetter: false };
    }
  );
};
