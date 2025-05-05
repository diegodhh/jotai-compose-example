/** @format */

import { ModalType, ModalTypeState } from "../types";

import { atomEnhancer } from "jotai-composer";

export const createContent = (mapper: Record<ModalType, string>) => {
  return atomEnhancer<ModalTypeState, never, { content: string }>(
    (get, { last }) => {
      return {
        content: mapper[last.modalType],
      };
    }
  );
};
