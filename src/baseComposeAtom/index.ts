/** @format */

import { toEnhancer } from "jotai-composer";
import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { createBase } from "./enhancers/base";
import { createBasePlus } from "./enhancers/basePlus";

const baseAtom = atomWithStorage("base", 1);

const composedBaseAtom = pipe(createBase(baseAtom)(), createBasePlus(1));

export const baseEnhacer = toEnhancer({
  composed: composedBaseAtom,
});

export type ComposedBaseAtom = typeof composedBaseAtom;
