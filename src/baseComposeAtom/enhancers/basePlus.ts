/** @format */

import { atom } from "jotai";
import { AtomEnhancer, DispatcherAction } from "jotai-composer";
import { Base, BaseAction, BasePlus } from "../types";

export const createBasePlus = (increment: number = 1) => {
  const enhancer: AtomEnhancer<
    Base,
    Required<DispatcherAction<BaseAction, number>>,
    BasePlus
  > = {
    read: ({ last }) => {
      return atom(() => ({
        ...last,
        basePlus: last.base + increment,
      }));
    },
  };
  return enhancer;
};
