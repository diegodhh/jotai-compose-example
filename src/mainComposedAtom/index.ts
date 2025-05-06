/** @format */

import { atomWithStorage } from "jotai/utils";
import { pipe } from "remeda";
import { baseEnhacer } from "../baseComposeAtom";
import { modalEnhancer } from "../modalComposed";
import { createCounter } from "./enhancers/addCounter";
import { createInputState } from "./enhancers/addInputState";

const counterAtom = atomWithStorage("counter", 0);
const inputAtom = atomWithStorage("input", "");

export const composedAtom = pipe(
  createCounter(counterAtom)(),
  baseEnhacer,
  createInputState(inputAtom, ""),
  modalEnhancer
);
