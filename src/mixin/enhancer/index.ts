/** @format */

import { atom, WritableAtom } from "jotai";
import { pipe } from "remeda";

const plusOneAtom = (lastAtom: WritableAtom<number, [number], void>) =>
  atom(
    (get) => {
      return get(lastAtom) + 1;
    },
    (get, set, update: number) => {
      set(lastAtom, update);
    }
  );
const atomWithLogger = <Value, Args>(
  lastAtom: WritableAtom<Value, [Args], void>
) =>
  atom(
    (get) => {
      const value = get(lastAtom);
      console.log(value);
      return value;
    },
    (get, set, update: Args) => {
      set(lastAtom, update);
    }
  );

const atomNumberToDescription = (
  lastAtom: WritableAtom<number, [number], void>
) =>
  atom(
    (get) => {
      return `The number is ${get(lastAtom)}`;
    },
    (get, set, update: number) => {
      set(lastAtom, get(lastAtom) + update);
    }
  );
const atomToUppercase = <Args>(lastAtom: WritableAtom<string, [Args], void>) =>
  atom(
    (get) => {
      return get(lastAtom).toUpperCase();
    },
    (get, set, update: Args) => {
      set(lastAtom, update);
    }
  );

export const plusOneAndLoggerPlusDescription = (
  countAtomGeneric: WritableAtom<number, [number], void>
) =>
  pipe(
    countAtomGeneric,
    plusOneAtom,
    atomWithLogger,
    atomNumberToDescription,
    atomToUppercase
  );
