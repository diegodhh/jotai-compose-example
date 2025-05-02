/** @format */

import {
  composedToDecorator,
  extendStateAndDeriveFromDecorator,
} from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { composedModalAtom } from "../modalComposed";
import { createCounterDecorator } from "./decorators/addCounterDecorator";
import { createBaseDecorator } from "./decorators/baseDecorator";
import { createBasePlusDecorator } from "./decorators/basePlusOneDecorator";
const baseAtom = atomWithStorage("base", 1);
const counterAtom = atomWithStorage("counter", 0);
export const composedAtom = pipe(
  extendStateAndDeriveFromDecorator(createCounterDecorator(counterAtom))(),
  extendStateAndDeriveFromDecorator(
    composedToDecorator({
      composed: composedModalAtom,
      keyString: "modal",
    })
  ),
  extendStateAndDeriveFromDecorator(createBaseDecorator(baseAtom)),
  extendStateAndDeriveFromDecorator(createBasePlusDecorator(1))
);
