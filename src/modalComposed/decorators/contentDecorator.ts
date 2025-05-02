/** @format */

import { ExtendStateAndDeriveDecorator } from "jotai-composer";
import { ModalType, ModalTypeState } from "../types";

export const createContentDecorator = (mapper: Record<ModalType, string>) => {
  const decorator: ExtendStateAndDeriveDecorator<
    ModalTypeState,
    never,
    { content: string }
  > = {
    getter: ({ last }) => {
      return {
        last,
        content: mapper[last.modalType],
      };
    },
  };
  return decorator;
};
