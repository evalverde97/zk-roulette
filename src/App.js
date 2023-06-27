import React, { useEffect, useReducer } from "react";

import Wheel from "./components/Wheel";
import useSaveState from "./dto/use-save-state";
import { CHIP_VALUES } from "./lib/defs";

import "./App.scss";
import Board from "./components/Board";
import Header from "./components/Header/Header";
import reducer, { addHandler, setDefaults } from "./utils/reducer";

export const NUMBER = 1;
export const TEXT = 2;
export const WON_LOST = 3;
export const TOGGLE_MENU = "TOGGLE_MENU";
export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";
export const SET_BACKGROUND = "SET_BACKGROUND";

export const initialState = {
  balance: 0,
  activeBet: CHIP_VALUES[2], // 10
  currentBet: {},
  betsHistory: [],
  spinDeg: 0,
  ballSpinDeg: 0,
  background: "green",
};

addHandler(TOGGLE_MENU, (action, state) => {
  return {
    activeMenu: !state.activeMenu,
  };
});

addHandler(OPEN_MENU, (action) => {
  return {
    activeMenu: true,
  };
});

addHandler(CLOSE_MENU, (action) => {
  return {
    activeMenu: false,
  };
});

addHandler(SET_BACKGROUND, ({ background }) => {
  return {
    background,
  };
});

let savedState;

// load initial state from localStore
try {
  savedState = JSON.parse(localStorage.getItem("lrt3"));

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
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...savedState,
  });

  // const profile = useProfile(dispatch);
  const profile = {
    id: 1,
    name: "test",
    balance: 1000,

  };
  useSaveState({ ...state });

  let profileId = profile && profile.id;

  useEffect(() => {
    if (profileId) {
      setDefaults({
        profile: profileId,
      });
    }
  }, [profileId]);

  return (
    <AppContext.Provider value={{
      ...state,
      ...profile,
      dispatch,
      }} >
      <Header profile={profile}/>
      <div className="app">
        <div className="game centered">
          <Wheel />
          <Board />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
