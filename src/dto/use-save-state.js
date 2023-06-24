import { useEffect } from "react";

function useSaveState({
  activeBet,
  currentBet,
  betsHistory,
  background,
}) {
  return useEffect(() => {
    try {
      localStorage.setItem(
        "zk-roulette",
        JSON.stringify({
          activeBet,
          currentBet,
          betsHistory,
          background,
        })
      );
    } catch (e) {
      console.log("error saving state!");
    }
  }, [activeBet, background, betsHistory, currentBet]);
}

export default useSaveState;
