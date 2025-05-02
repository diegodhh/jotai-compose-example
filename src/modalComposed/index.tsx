/** @format */

import { extendStateAndDeriveFromDecorator } from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { createContentDecorator } from "./decorators/contentDecorator";
import { createIsOpenDecorator } from "./decorators/isOpenDecorator";
import { createModalTypeDecorator } from "./decorators/modalTypeDecorator";
import { ModalType } from "./types";

const isOpenAtom = atomWithStorage<boolean>("isOpen", false);
const modalTypeAtom = atomWithStorage<ModalType>(
  "modalType",
  ModalType.SUCCESS
);
const modalTypeContentMapper = {
  [ModalType.SUCCESS]: "This is a success modal",
  [ModalType.WARNING]: "This is a warning modal",
  [ModalType.ERROR]: "This is an error modal",
};
export const composedModalAtom = pipe(
  extendStateAndDeriveFromDecorator(createIsOpenDecorator(isOpenAtom))(),
  extendStateAndDeriveFromDecorator(createModalTypeDecorator(modalTypeAtom)),
  extendStateAndDeriveFromDecorator(
    createContentDecorator(modalTypeContentMapper)
  )
);
