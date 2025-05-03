/** @format */

import { atom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";
import { Base, BaseAction, BasePlus } from "../types";

export const createBasePlusDecorator = (increment: number = 1) => {
  const decorator: ExtendStateAndDeriveDecorator<
    Base,
    Required<DispatcherAction<BaseAction, number>>,
    BasePlus
  > = {
    getter: ({ last }) => {
      return atom(() => ({
        ...last,
        basePlus: last.base + increment,
      }));
    },
  };
  return decorator;
};
