import React, { useState, useEffect } from "react";

import { CHIP_VALUES } from "./lib/defs";
import profile from './dto/profile'
import useSaveState from "./dto/use-save-state";
import Wheel from "./components/Wheel";

import "./App.scss";
import Board from "./components/Board";
import BetSelector from "./components/BetSelector";
import Info from "./components/Info/Info";

export const TOGGLE_MENU = "TOGGLE_MENU";
export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const initialState = {
  balance: 10,
  activeBet: CHIP_VALUES[2], // 10
  currentBet: {},
  betsHistory: [],
  spinDeg: 0,
  ballSpinDeg: 0,
  background: "green",
};

let savedState;

// load initial state from localStore
try {
  savedState = JSON.parse(localStorage.getItem("zk-roulette"));

  window
    .fetch("https://www.iplocate.io/api/lookup", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.json())
    .then((json) => (window.__location = json));
} catch (e) {
  console.log("error loading saved state");
}

export const AppContext = React.createContext(initialState);

function App() {
  const [state, setState] = useState(savedState && initialState);
  const [defaults, setDefaults] = useState({});

  useSaveState({ ...state });

  let profileId = profile?.id;

  useEffect(() => {
    if (profileId) {
      setDefaults({
        profile: profileId,
      });
    }
  }, [profileId]);

  return (
    <AppContext.Provider value={{ ...state, ...profile }} >
      
      <div className="app">
        <div className="game">
          <Wheel />
          <Board />
        </div>
        <div className="game-info">
          <Info />
          <BetSelector />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
