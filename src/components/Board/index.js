import React, { useContext, useState } from "react";
import "./styles.scss";
import { MAX_BET, black, sumBet } from "../../lib/defs";
import { AppContext } from "../../App";
import Chip from "../Chip/Chip";
import Actions from "../Actions/Actions";
import Info from '../Info/Info'
import BetSelector from "../BetSelector";

const DISPLAY_VALUES = {
  z1: "1ST 12",
  z2: "2ND 12",
  z3: "3RD 12",
  s: "1-18",
  g: "19-36",
  e: "even",
  o: "odd",
  x1: "2:1",
  x2: "2:1",
  x3: "2:1"
};

function addHistory(history, bet) {
  history.push(JSON.stringify(bet));
  if (history.length > 25) {
    history.shift();
  }
}


const translate = key => {
  let value = DISPLAY_VALUES[key];
  return value ? value : /\d{1,2}/.test(key) && key.match(/\d{1,2}/)[0];
};

const hover = event => {};
const unhover = event => {};

const createMutateStyle = (top = 0, left = 0, deg = 0) => {
  top = (top * 15).toFixed() + "%";
  left = (left * 15).toFixed() + "%";
  // top = "0%";
  // left = "0%";
  deg = (deg * 50).toFixed();
  return {
    top,
    left,
    transform: `rotate(${deg}deg)`
  };
};

const PlacedChips = ({ values }) => {
  const [noise] = useState(
    Array.from({ length: 3 * 160 }, () => 0.5 - Math.random())
  );
  return (
    <div className="placed-chips">
      {values.slice(-25).map((value, i) => (
        <Chip
          value={value}
          style={createMutateStyle(
            noise[0 + i * 3],
            noise[1 + i * 3],
            noise[2 + i * 3]
          )}
          key={`${i}`}
        />
      ))}
    </div>
  );
};

function Board() {
  const [ setCurrentBet] = useState({});
  const [message, setMessage] = useState("");
  const { activeBet, currentBet } = useContext(AppContext);


  const placeBet = id => {
    if (sumBet(currentBet) >= MAX_BET){
      setMessage("TABLE_LIMIT REACHED");
    } 
    else {
      setCurrentBet({ pos: id, amount: activeBet})
    };
  };

  const bet = id => (
    <div
      id={id}
      style={{ gridArea: id }}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      key={`__${id}`}
      onClick={event => placeBet(event.currentTarget.id)}
    >
      {currentBet[id] ? <PlacedChips values={currentBet[id]} /> : null}
    </div>
  );

  const cell = (n, className, content) => (
    <div
      style={{ gridArea: n }}
      id={n}
      className={className ? className : null}
      key={`__${n}`}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      onClick={event => placeBet(event.currentTarget.id)}
    >
      {content ? content : <span>{translate(n)}</span>}
      {currentBet[n] ? <PlacedChips values={currentBet[n]} /> : null}
    </div>
  );

  return (
    <div className="board-wrap">
      <Info />
      <div className="board">
        {Array.from({ length: 37 }, (v, i) => i).map(n => 
          cell(`n${n}`, black(n) ? "black" : (n !== 0) ? "red" : "green")
        )}
        {["x1", "x2", "x3"].map(n => cell(n))}
        {["z1", "z2", "z3"].map(n => cell(n))}
        {["s", "e", "o", "g"].map(n => cell(n))}
        {["r", "b"].map(n =>
          cell(
            n,
            "green",
            <svg viewBox="0 0 100 50">
              <polygon points="50,0 100,25 50,50 0,25" />
            </svg>
          )
        )}
      </div>
      <div className="streets">
        {Array.from({ length: 12 }, (v, i) => i).map(n => bet(`st${n}`))}
      </div>
      <div className="verts">
        {Array.from({ length: 24 }, (v, i) => i).map(n => bet(`ve${n}`))}
      </div>
      <div className="horiz">
        {Array.from({ length: 36 }, (v, i) => i).map(n => bet(`ho${n}`))}
      </div>
      <div className="squares">
        {Array.from({ length: 24 }, (v, i) => i).map(n => bet(`sq${n}`))}
      </div>
      <section>
        <BetSelector />
      </section>
      <section>
        <Actions />
      </section>
    </div>
  );
}

export default Board;
