/** @format */

import { atom } from "jotai";
import {
  DispatcherAction,
  ExtendStateAndDeriveDecorator,
} from "jotai-composer";
import { Base } from "../types";

export type FirstPlusOne = {
  base: number;
  firstPlusOne: number;
};

export enum BaseAction {
  SAVE_BASE = "SAVE_BASE",
}

export const createBasePlusDecorator = (increment: number = 1) => {
  const decorator: ExtendStateAndDeriveDecorator<
    Base,
    Required<DispatcherAction<BaseAction, number>>,
    FirstPlusOne
  > = {
    getter: ({ last }) => {
      return atom(() => ({
        ...last,
        firstPlusOne: last.base + increment,
      }));
    },
  };
  return decorator;
};
