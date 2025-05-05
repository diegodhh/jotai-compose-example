/** @format */

import { atomEnhancer, DispatcherAction } from "jotai-composer";
import { Base, BaseAction, BasePlus } from "../types";

export const createBasePlus = (increment: number = 1) => {
  return atomEnhancer<
    Base,
    Required<DispatcherAction<BaseAction, number>>,
    BasePlus
  >((get, { last }) => ({
    ...last,
    basePlus: last.base + increment,
  }));
};
