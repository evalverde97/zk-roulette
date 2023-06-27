import React, { useContext } from "react";
import { AppContext } from "../../App";
import { sumBet } from "../../lib/defs";

const PaddedNumber = ({ value }) => {
  value = String(value);
  let match = String(value)
    .padStart(7, "0")
    .match(value);
  if (value === "0") {
    match = { index: 6 };
  }
  if (match && match.index) {
    return (
      <p>
        <span className="padded">{"".padStart(match.index, "0")}</span>
        <span>{value}</span>
      </p>
    );
  } else return <p>{value}</p>;
};

function Info() {
  const { balance, currentBet } = useContext(AppContext);


  const currentBetSum = sumBet(currentBet);

  return (
    <div className="info">
      <div className="info-element">
        <h5>Balance</h5>
        <PaddedNumber value={balance} />
      </div>
      <div className="info-element">
        <h5>Bet</h5>
        <PaddedNumber value={currentBetSum} />
      </div>
    </div>
  );
}

export default Info;
