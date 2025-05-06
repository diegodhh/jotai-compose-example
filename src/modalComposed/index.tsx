/** @format */

import { toEnhancer } from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { createContent } from "./enhancers/content";
import { createIsOpen } from "./enhancers/isOpen";
import { createModalType } from "./enhancers/modalType";
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
const composedModalAtom = pipe(
  createIsOpen(isOpenAtom)(),
  createModalType(modalTypeAtom),
  createContent(modalTypeContentMapper)
);

export const modalEnhancer = toEnhancer({
  composed: composedModalAtom,
  keyString: "modal",
});
