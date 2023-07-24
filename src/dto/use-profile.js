export const PROFILE_CREATED = "PROFILE_CREATED";
export const PROFILE_LOADED = "PROFILE_LOADED";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const useProfile = (dispatch) => {
  const profile = {
    id: 1,
    name: "test",
    balance: 100,
    activeBet: 0,
    currentBet: {},
    betsHistory: [],
    spinDeg: 0,
    ballSpinDeg: 0,
  };

  return profile;
}

export const TEST_PROFILE = {
    id: 1,
    name: "test",
    balance: 100,
    activeBet: 0,
    currentBet: {},
    betsHistory: [],
    spinDeg: 0,
    ballSpinDeg: 0,
  };
