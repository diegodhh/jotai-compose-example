/** @format */

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { plusOneAndLoggerPlusDescription } from "../mixin/enhancer";

const countAtom = atomWithStorage("count", 0);
const superCountAtom = plusOneAndLoggerPlusDescription(countAtom);
const Mixing = () => {
  const [superCount, setSuperCount] = useAtom(superCountAtom);

  const handleAddSuperCount = () => {
    setSuperCount(1);
  };

  return (
    <div className="content-card">
      <h1>Super Count Atom Demonstration</h1>
      <p>
        This demonstrates the pipe enhancer pattern with +1, logger, and
        storage.
      </p>

      <div className="values-container">
        <div className="value-item">
          <span className="label">Super Count (+1 &amp; persisted):</span>
          <span className="value">{superCount}</span>
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleAddSuperCount} className="add-button">
          Add Super Count
        </button>
      </div>
    </div>
  );
};

export default Mixing;
