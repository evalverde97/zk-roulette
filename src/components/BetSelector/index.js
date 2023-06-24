import React, { useContext, useState } from "react";
import "./styles.scss";
import { AppContext } from "../../App";
import Chip from "../Chip/Chip";
import { CHIP_VALUES } from "../../lib/defs";


const BetOption = ({ value }) => {
  const { activeBet } = useContext(AppContext);
  const [ newActiveBet, setNewActiveBet] = useState(activeBet);

  return (
    <div
      className={`bet-option${activeBet === value ? " active" : ""}`.trim()}
      onClick={(value) => setNewActiveBet(value)}
    >
      <Chip value={value} />
    </div>
  );
};

function BetSelector() {
  return (
    <div className="bet-select">
      {CHIP_VALUES.map(v => (
        <BetOption value={v} key={v} />
      ))}
    </div>
  );
}

export default BetSelector;
