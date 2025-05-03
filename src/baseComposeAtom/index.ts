/** @format */

import { composedToEnhancer, enhanceWith } from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { createBase } from "./enhancers/base";
import { createBasePlus } from "./enhancers/basePlus";

const baseAtom = atomWithStorage("base", 1);

const composedBaseAtom = pipe(
  enhanceWith(createBase(baseAtom))(),
  enhanceWith(createBasePlus(1))
);

export const baseEnhacer = composedToEnhancer({
  composed: composedBaseAtom,
});

export type ComposedBaseAtom = typeof composedBaseAtom;
