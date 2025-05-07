/** @format */

import { useAtom } from "jotai";
import "./App.css";
import { BaseAction } from "./baseComposeAtom/types";
import Mixing from "./components/Mixing";
import { composedAtom } from "./mainComposedAtom";
import { CounterAction } from "./mainComposedAtom/enhancers/addCounter";
import { InputAction } from "./mainComposedAtom/enhancers/addInputState";
import { ModalAction, ModalType } from "./modalComposed/types";

function App() {
  const [atomValue, dispatch] = useAtom(composedAtom);
  const handleAddCount = () => {
    dispatch({ type: CounterAction.ADD_COUNT });
  };
  const handleSaveBase = () => {
    dispatch({
      type: BaseAction.SAVE_BASE,
      payload: Math.floor(Math.random() * 100),
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputAction.SET_VALUE, payload: e.target.value });
  };
  const handleInputReset = () => {
    dispatch({ type: InputAction.RESET });
  };
  const handleOpenModal = () => {
    dispatch({
      type: ModalAction.OPEN_MODAL,
    });
  };
  const handleSetModalToSuccess = () => {
    dispatch({
      type: ModalAction.SET_MODAL_TYPE,
      payload: ModalType.SUCCESS,
    });
  };
  const handleSetModalToWarning = () => {
    dispatch({
      type: ModalAction.SET_MODAL_TYPE,
      payload: ModalType.WARNING,
    });
  };
  const handleSetModalToError = () => {
    dispatch({
      type: ModalAction.SET_MODAL_TYPE,
      payload: ModalType.ERROR,
    });
  };
  const handleCloseModal = () => {
    dispatch({
      type: ModalAction.CLOSE_MODAL,
    });
  };

  return (
    <div className="app-container">
      <div className="content-card">
        <h1>Atom Values</h1>
        <div className="values-container">
          <div className="value-item">
            <span className="label">First Value:</span>
            <span className="value">{atomValue.base}</span>
          </div>
          <div className="value-item">
            <span className="label">First Value + 1:</span>
            <span className="value">{atomValue.basePlus}</span>
          </div>
          <div className="value-item">
            <span className="label">Count:</span>
            <span className="value">{atomValue.count}</span>
          </div>
          <div className="value-item">
            <span className="label">Input Value:</span>
            <div className="input-container">
              <input
                type="text"
                value={atomValue.value}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Type something..."
              />
              <button onClick={handleInputReset} className="reset-button">
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="button-group">
          <button onClick={handleAddCount} className="add-button">
            Add Count
          </button>
          <button onClick={handleSaveBase} className="random-base-button">
            Set Random Base
          </button>
        </div>
        <div className="modal-controls">
          <button onClick={handleOpenModal} className="open-modal-button">
            Open Modal
          </button>
          <div className="modal-type-buttons">
            <button
              onClick={handleSetModalToSuccess}
              className="success-button"
            >
              Success
            </button>
            <button
              onClick={handleSetModalToWarning}
              className="warning-button"
            >
              Warning
            </button>
            <button onClick={handleSetModalToError} className="error-button">
              Error
            </button>
          </div>
        </div>
        {atomValue?.modal?.isOpen && (
          <div className={`modal modal-${atomValue.modal.modalType}`}>
            <div className="modal-content">
              <h2>{atomValue.modal.modalType.toUpperCase()}</h2>
              <p>{atomValue.modal.content}</p>
              <button onClick={handleCloseModal} className="close-modal-button">
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Super Count Atom Demonstration */}
      <Mixing />
    </div>
  );
}

export default App;
