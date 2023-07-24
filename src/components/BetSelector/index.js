// import React, { useContext, useState } from "react";
// import "./styles.scss";
// import { AppContext } from "../../App";
// import Chip from "../Chip/Chip";
// import { CHIP_VALUES } from "../../lib/defs";


// const BetOption = ({ value }) => {
//   const { activeBet } = useContext(AppContext);
//   const [ newActiveBet, setNewActiveBet] = useState(activeBet);

//   return (
//     <div
//       className={`bet-option${activeBet === value ? " active" : ""}`.trim()}
//       onClick={(value) => setNewActiveBet(value)}
//     >
//       <Chip value={value} />
//     </div>
//   );
// };

// function BetSelector() {
//   return (
//     <div className="bet-select">
//       {CHIP_VALUES.map(v => (
//         <BetOption value={v} key={v} />
//       ))}
//     </div>
//   );
// }

// export default BetSelector;

import React, { useContext } from "react";
import "./styles.scss";
import { addHandler } from "../../utils/reducer";
import { AppContext } from "../../App";
import Chip from "../Chip/Chip";
import { CHIP_VALUES } from "../../lib/defs";

const SET_ACTIVE_BET = "SET_ACTIVE_BET";

addHandler(SET_ACTIVE_BET, action => {
  return {
    activeBet: action.value
  };
});

const BetOption = ({ value }) => {
  const { activeBet, dispatch } = useContext(AppContext);
  return (
    <div
      className={`bet-option${activeBet === value ? " active" : ""}`.trim()}
      onClick={() => {
        dispatch({
          type: SET_ACTIVE_BET,
          value
        });
      }}
    >
      <Chip value={value} />
    </div>
  );
};

function BetSelect() {
  return (
    <div className="bet-select">
      {CHIP_VALUES.map(v => (
        <BetOption value={v} key={v} />
      ))}
    </div>
  );
}

export default BetSelect;
