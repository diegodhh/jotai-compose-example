/** @format */

import { atom, Getter, Setter, WritableAtom } from "jotai";
import { pipe } from "remeda";
const atomWithLast = <
  Value = unknown,
  Args = unknown,
  LastValue = Value,
  LastArgs = Args
>(
  read: (
    get: Getter,
    lastAtom: WritableAtom<LastValue, [LastArgs], void>
  ) => Value,
  write: (
    get: Getter,
    set: Setter,
    lastAtom: WritableAtom<LastValue, [LastArgs], void>,
    update: Args
  ) => void = (get, set, lastAtom, update) =>
    set(lastAtom, update as unknown as LastArgs)
) => {
  return (lastAtom: WritableAtom<LastValue, [LastArgs], void>) =>
    atom(
      (get) => read(get, lastAtom),
      (get, set, update: Args) => {
        write(get, set, lastAtom, update);
      }
    );
};

const plusOneAtom = atomWithLast<number, number>(
  (get, lastAtom) => get(lastAtom) + 1,
  (get, set, lastAtom, update) => set(lastAtom, update)
);

const atomWithLogger = atomWithLast(
  (get, lastAtom) => {
    const value = get(lastAtom);
    console.log(value);
    return value;
  },
  (get, set, lastAtom, update) => set(lastAtom, update)
);
const modifySetterToSumArgs = (
  lastAtom: WritableAtom<number, [number], void>
) =>
  atom(
    (get) => get(lastAtom),
    (get, set, update: number) => {
      set(lastAtom, get(lastAtom) + update);
    }
  );

const atomNumberToDescription = <Args>(
  lastAtom: WritableAtom<number, [Args], void>
) =>
  atom(
    (get) => {
      return `The number is ${get(lastAtom)}`;
    },
    (get, set, update: Args) => {
      set(lastAtom, update);
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
    modifySetterToSumArgs,
    atomNumberToDescription,
    atomToUppercase
  );
