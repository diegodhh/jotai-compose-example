/** @format */

import { AtomEnhancer } from "jotai-composer";
import { ModalType, ModalTypeState } from "../types";

export const createContent = (mapper: Record<ModalType, string>) => {
  const enhancer: AtomEnhancer<ModalTypeState, never, { content: string }> = {
    read: ({ last }) => {
      return {
        last,
        content: mapper[last.modalType],
      };
    },
  };
  return enhancer;
};
