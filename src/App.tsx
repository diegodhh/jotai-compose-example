/** @format */

import { useAtom } from "jotai";
import "./App.css";
import { composedAtom } from "./coposedAtom";
import { Action } from "./decorators/addCounterDecorator";
import { ModalAction } from "./decorators/addModalDecorator";
import { BaseAction } from "./decorators/basePlusOneDecorator";

function App() {
  const [atomValue, dispatch] = useAtom(composedAtom);

  const handleAddCount = () => {
    dispatch({ type: Action.ADD_COUNT });
  };
  const handleSaveBase = () => {
    dispatch({
      type: BaseAction.SAVE_BASE,
      payload: Math.floor(Math.random() * 100),
    });
  };
  const handleOpenModal = () => {
    dispatch({
      type: ModalAction.OPEN_MODAL,
      payload: "This is a modal message!",
    });
  };
  const handleCloseModal = () => {
    dispatch({
      type: ModalAction.CLOSE_MODAL,
      payload: null,
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
            <span className="value">{atomValue.firstPlusOne}</span>
          </div>
          <div className="value-item">
            <span className="label">Count:</span>
            <span className="value">{atomValue.count}</span>
          </div>
        </div>
        <button onClick={handleAddCount} className="add-button">
          Add Count
        </button>
        <button onClick={handleSaveBase} className="random-base-button">
          Set Random Base
        </button>
        <button onClick={handleOpenModal} className="open-modal-button">
          Open Modal
        </button>
        {atomValue.isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span>{atomValue.content}</span>
              <button onClick={handleCloseModal} className="close-modal-button">
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
