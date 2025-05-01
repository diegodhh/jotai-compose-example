/** @format */

import { extendStateAndDeriveFromDecorator } from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { createCounterDecorator } from "./decorators/addCounterDecorator";
import {
  createModalDecorator,
  ModalState,
} from "./decorators/addModalDecorator";
import { createBasePlusOneDecorator } from "./decorators/basePlusOneDecorator";
const baseAtom = atomWithStorage("base", 1);
const counterAtom = atomWithStorage("counter", 0);
const modalAtom = atomWithStorage<ModalState>("modal", {
  isOpen: false,
  content: null,
});
export const composedAtom = pipe(
  extendStateAndDeriveFromDecorator(createCounterDecorator(counterAtom))(),
  extendStateAndDeriveFromDecorator(createBasePlusOneDecorator(baseAtom)),
  extendStateAndDeriveFromDecorator(createModalDecorator(modalAtom))
);
