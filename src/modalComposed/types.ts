/** @format */

export enum ModalAction {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_MODAL_TYPE = "SET_MODAL_TYPE",
}

export type IsOpenState = {
  isOpen: boolean;
};

export enum ModalType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type ModalTypeState = {
  modalType: ModalType;
};
