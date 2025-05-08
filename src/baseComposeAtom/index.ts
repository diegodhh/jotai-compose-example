/** @format */

import { atomWithStorage } from "jotai/utils";
import { piped } from "remeda";
import { createBase } from "./enhancers/base";
import { createBasePlus } from "./enhancers/basePlus";

const baseAtom = atomWithStorage("base", 1);

const baseEnhacer = piped(createBase(baseAtom), createBasePlus(1));

export { baseEnhacer };
