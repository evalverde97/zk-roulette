// // import React, { useContext } from "react";
// // import {
// //   BEGIN_SPIN,
// //   BEGIN_BALL_SPIN,
// //   END_SPIN,
// //   SPIN_DURAION_IN_SECONDS,
// // } from '../Wheel';
// // import { MAX_BET, calculateProfit, normalizeBet, sumBet } from "../../lib/defs";
// // import { AppContext } from "../../App";

// // const Undo = () => (
// //   <svg width="20" height="20">
// //     <g>
// //       <path d="M9.926 2.622v16.002l-8-8.001z" />
// //       <path d="M9 7.393v5.93c5.684.053 10.645 3.119 13.363 7.678l.002-.094c0-7.415-5.97-13.432-13.365-13.514z" />
// //     </g>
// //   </svg>
// // );

// // const Spin = () => (
// //   <svg viewBox="0 0 100 100">
// //     <circle
// //       className="hover"
// //       fill="rgba(0,0,0,0.1)"
// //       cx="50"
// //       cy="50"
// //       r="50"
// //       strokeWidth="0"
// //     />
// //     <g transform="translate(5,5)">
// //       <path d="M87.954 47.938c-2.888 10.131-8.871 18.949-16.871 25.374a50.175 50.175 0 01-13.916 7.917h11.445c10.596-6.92 17.972-18.354 19.386-31.579-.009-.572-.015-1.145-.044-1.712zM21.388 8.771C10.792 15.692 3.417 27.126 2.002 40.35c.009.572.017 1.145.046 1.713 2.885-10.131 8.871-18.95 16.868-25.376a50.307 50.307 0 0113.917-7.916H21.388z" />
// //     </g>
// //     <circle fill="none" cx="50" cy="50" r="43.25" strokeWidth="1" />
// //     <text x="50%" y="50%" textAnchor="middle" dy=".33em">
// //       Spin
// //     </text>
// //   </svg>
// // );

// // export function createSpinRequest(id, currentBet) {
// //   return window
// //     .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/spin`, {
// //       method: "POST",
// //       body: JSON.stringify({
// //         id,
// //         bet: normalizeBet(currentBet),
// //       }),
// //       headers: { "Content-Type": "application/json" },
// //     })
// //     .then((r) => r.json());
// // }

// // async function wait(milisec) {
// //   await new Promise((resolve) => setTimeout(resolve, milisec));
// // }

// // function Actions() {
// //   const {
// //     dispatch,
// //     currentBet,
// //     balance,
// //     betsHistory = [],
// //     id,
// //     spinning,
// //     activeMenu,
// //     readedWelcome,
// //   } = useContext(AppContext);

// //   const clearDisabled = spinning || sumBet(currentBet) === 0 || activeMenu;
// //   // if board is empty, can not clear and spin as well
// //   const spinDisabled = clearDisabled;

// //   const undoDisabled = betsHistory.length === 0 || spinning || activeMenu;
// //   const doubleDisabled =
// //     spinning || activeMenu || sumBet(currentBet) >= MAX_BET;
// // //manejo de acciones por estados
// //   const [clearBoard, setClearBoard] = React.useState(false);
// //   const [undoBet, setUndoBet] = React.useState(false);
// //   const [doubleBet, setDoubleBet] = React.useState(false);
// //   const [quadrupleBet, setQuadrupleBet] = React.useState(false);
// //   const [resetBet, setResetBet] = React.useState(false);
// //   const [beginBallSpin, setBeginBallSpin] = React.useState(false);
// //   const [beginSpin, setBeginSpin] = React.useState(false);
// //   const [message, setMessage] = React.useState("");
// //   const [SHOW_WELCOME, setShowWelcome] = React.useState(false);
// //   return (
// //     <div className="actions">
// //       <button
// //         aria-label="Clear Board"
// //         disabled={clearDisabled}
// //         onClick={() => setClearBoard(true)}
// //       >
// //         Clear
// //       </button>
// //       <button
// //         aria-label="Undo"
// //         disabled={undoDisabled}
// //         onClick={() => setUndoBet(true)}
// //       >
// //         <Undo />
// //       </button>
// //       <button
// //         aria-label="Spin the Wheel"
// //         disabled={spinDisabled}
// //         className="spin"
// //         onClick={async () => {
// //           if (balance < sumBet(currentBet)) {
// //             if (!readedWelcome) {
// //               setShowWelcome(true);
// //               return;
// //             }
// //             setMessage("LOW BALANCE");
// //             return;
// //           }
// //           setBeginSpin(false);

// //           createSpinRequest(id, currentBet)
// //             .then(({ luckyNumber, error }) => {
// //               return new Promise((resolve, reject) => {
// //                 resolve({ luckyNumber, error });
// //               });
// //             })
// //             .then(async ({ luckyNumber, error }) => {
// //               if (error) {
// //                 dispatch({
// //                   type: END_SPIN,
// //                   error,
// //                 });
// //               } else {
// //                 // spin if all good

// //                 dispatch({
// //                   type: BEGIN_BALL_SPIN,
// //                   luckyNumber,
// //                   log: false,
// //                 });
// //                 await wait((SPIN_DURAION_IN_SECONDS * 1000) / 3);

// //                 dispatch({
// //                   type: END_SPIN,
// //                   luckyNumber,
// //                   log: false,
// //                 });
// //                 setTimeout(() => {
// //                   const profit =
// //                     sumBet(
// //                       calculateProfit(luckyNumber, normalizeBet(currentBet))
// //                     ) - sumBet(currentBet);
// //                   setMessage('WON_LOST', profit)
// //                 }, 2800);
// //                 setMessage(luckyNumber)
// //               }
// //             })
// //             .catch((e) => {
// //               // only network failure
// //               dispatch({
// //                 type: END_SPIN,
// //                 error: e.message,
// //               });
// //               console.log(e);
// //             });
// //         }}
// //       >
// //         <Spin />
// //       </button>
// //       <button
// //         aria-label="Double Bet"
// //         disabled={doubleDisabled}
// //         onClick={() => setDoubleBet(true)}
// //       >
// //         x2
// //       </button>
// //       <button
// //         aria-label="Quadruple Bet"
// //         disabled={doubleDisabled}
// //         onClick={() => {
// //           setQuadrupleBet(true);
// //         }}
// //       >
// //         x4
// //       </button>
// //     </div>
// //   );
// // }

// // export default Actions;
// import React, { useContext } from "react";
// import { sumBet, normalizeBet, calculateProfit, MAX_BET } from "../../lib/defs";
// import {
//   BEGIN_SPIN,
//   BEGIN_BALL_SPIN,
//   END_SPIN,
//   SPIN_DURAION_IN_SECONDS,
// } from "../Wheel";

// import { CLEAR_BOARD, DOUBLE_BET, QUADRUPLE_BET, UNDO_BET } from "../Board";
// import { AppContext } from "../../App";
// import { NUMBER, WON_LOST, SHOW_MESSAGE } from "..";

// const Undo = () => (
//   <svg width="20" height="20">
//     <g>
//       <path d="M9.926 2.622v16.002l-8-8.001z" />
//       <path d="M9 7.393v5.93c5.684.053 10.645 3.119 13.363 7.678l.002-.094c0-7.415-5.97-13.432-13.365-13.514z" />
//     </g>
//   </svg>
// );

// const Spin = () => (
//   <svg viewBox="0 0 100 100">
//     <circle
//       className="hover"
//       fill="rgba(0,0,0,0.1)"
//       cx="50"
//       cy="50"
//       r="50"
//       strokeWidth="0"
//     />
//     <g transform="translate(5,5)">
//       <path d="M87.954 47.938c-2.888 10.131-8.871 18.949-16.871 25.374a50.175 50.175 0 01-13.916 7.917h11.445c10.596-6.92 17.972-18.354 19.386-31.579-.009-.572-.015-1.145-.044-1.712zM21.388 8.771C10.792 15.692 3.417 27.126 2.002 40.35c.009.572.017 1.145.046 1.713 2.885-10.131 8.871-18.95 16.868-25.376a50.307 50.307 0 0113.917-7.916H21.388z" />
//     </g>
//     <circle fill="none" cx="50" cy="50" r="43.25" strokeWidth="1" />
//     <text x="50%" y="50%" textAnchor="middle" dy=".33em">
//       Spin
//     </text>
//   </svg>
// );

// export function createSpinRequest(id, currentBet) {
//   return window
//     .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/spin`, {
//       method: "POST",
//       body: JSON.stringify({
//         id,
//         bet: normalizeBet(currentBet),
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//     .then((r) => r.json());
// }

// async function wait(milisec) {
//   await new Promise((resolve) => setTimeout(resolve, milisec));
// }

// function Actions() {
//   const {
//     dispatch,
//     currentBet,
//     balance,
//     betsHistory = [],
//     id,
//     spinning,
//     activeMenu,
//     readedWelcome,
//   } = useContext(AppContext);

//   const clearDisabled = spinning || sumBet(currentBet) === 0 || activeMenu;
//   // if board is empty, can not clear and spin as well
//   const spinDisabled = clearDisabled;

//   const undoDisabled = betsHistory.length === 0 || spinning || activeMenu;
//   const doubleDisabled =
//     spinning || activeMenu || sumBet(currentBet) >= MAX_BET;

//   return (
//     <div className="actions">
//       <button
//         aria-label="Clear Board"
//         disabled={clearDisabled}
//         onClick={() =>
//           dispatch({
//             type: CLEAR_BOARD,
//           })
//         }
//       >
//         Clear
//       </button>
//       <button
//         aria-label="Undo"
//         disabled={undoDisabled}
//         onClick={() =>
//           dispatch({
//             type: UNDO_BET,
//           })
//         }
//       >
//         <Undo />
//       </button>
//       <button
//         aria-label="Spin the Wheel"
//         disabled={spinDisabled}
//         className="spin"
//         onClick={async () => {
//           if (balance < sumBet(currentBet)) {
//             if (!readedWelcome) {
//               dispatch({
//                 type: SHOW_WELCOME,
//               });
//               return;
//             }
//             dispatch({
//               type: SHOW_MESSAGE,
//               message: "LOW BALANCE",
//             });
//             return;
//           }
//           dispatch({
//             type: BEGIN_SPIN,
//             log: false,
//           });

//           createSpinRequest(id, currentBet)
//             .then(({ luckyNumber, error }) => {
//               return new Promise((resolve, reject) => {
//                 resolve({ luckyNumber, error });
//               });
//             })
//             .then(async ({ luckyNumber, error }) => {
//               if (error) {
//                 dispatch({
//                   type: END_SPIN,
//                   error,
//                 });
//               } else {
//                 // spin if all good

//                 dispatch({
//                   type: BEGIN_BALL_SPIN,
//                   luckyNumber,
//                   log: false,
//                 });
//                 await wait((SPIN_DURAION_IN_SECONDS * 1000) / 3);

//                 dispatch({
//                   type: END_SPIN,
//                   luckyNumber,
//                   log: false,
//                 });
//                 setTimeout(() => {
//                   const profit =
//                     sumBet(
//                       calculateProfit(luckyNumber, normalizeBet(currentBet))
//                     ) - sumBet(currentBet);
//                   dispatch({
//                     type: SHOW_MESSAGE,
//                     messageType: WON_LOST,
//                     message: profit,
//                     log: false,
//                   });
//                 }, 2800);
//                 dispatch({
//                   type: SHOW_MESSAGE,
//                   messageType: NUMBER,
//                   message: luckyNumber,
//                   log: false,
//                 });
//               }
//             })
//             .catch((e) => {
//               // only network failure
//               dispatch({
//                 type: END_SPIN,
//                 error: e.message,
//               });
//               console.log(e);
//             });
//         }}
//       >
//         <Spin />
//       </button>
//       <button
//         aria-label="Double Bet"
//         disabled={doubleDisabled}
//         onClick={() => {
//           dispatch({
//             type: DOUBLE_BET,
//           });
//         }}
//       >
//         x2
//       </button>
//       <button
//         aria-label="Quadruple Bet"
//         disabled={doubleDisabled}
//         onClick={() => {
//           dispatch({
//             type: QUADRUPLE_BET,
//           });
//         }}
//       >
//         x4
//       </button>
//     </div>
//   );
// }

// export default Actions;

import React, { useContext } from "react";
import { MAX_BET, calculateProfit, normalizeBet, sumBet } from "../../lib/defs";
import {
  BEGIN_BALL_SPIN,
  BEGIN_SPIN,
  END_SPIN,
  SPIN_DURAION_IN_SECONDS,
} from "../Wheel";

import { AppContext } from "../../App";
import { CLEAR_BOARD, DOUBLE_BET, QUADRUPLE_BET, UNDO_BET } from "../Board";
import { NUMBER, WON_LOST } from "../Wheel";

const Undo = () => (
  <svg width="20" height="20">
    <g>
      <path d="M9.926 2.622v16.002l-8-8.001z" />
      <path d="M9 7.393v5.93c5.684.053 10.645 3.119 13.363 7.678l.002-.094c0-7.415-5.97-13.432-13.365-13.514z" />
    </g>
  </svg>
);

const Spin = () => (
  <svg viewBox="0 0 100 100">
    <circle
      className="hover"
      fill="rgba(0,0,0,0.1)"
      cx="50"
      cy="50"
      r="50"
      strokeWidth="0"
    />
    <g transform="translate(5,5)">
      <path d="M87.954 47.938c-2.888 10.131-8.871 18.949-16.871 25.374a50.175 50.175 0 01-13.916 7.917h11.445c10.596-6.92 17.972-18.354 19.386-31.579-.009-.572-.015-1.145-.044-1.712zM21.388 8.771C10.792 15.692 3.417 27.126 2.002 40.35c.009.572.017 1.145.046 1.713 2.885-10.131 8.871-18.95 16.868-25.376a50.307 50.307 0 0113.917-7.916H21.388z" />
    </g>
    <circle fill="none" cx="50" cy="50" r="43.25" strokeWidth="1" />
    <text x="50%" y="50%" textAnchor="middle" dy=".33em">
      Spin
    </text>
  </svg>
);

export function createSpinRequest(id, currentBet) {
  return window
    .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/spin`, {
      method: "POST",
      body: JSON.stringify({
        id,
        bet: normalizeBet(currentBet),
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.json());
}

async function wait(milisec) {
  await new Promise((resolve) => setTimeout(resolve, milisec));
}

function Actions() {
  const {
    dispatch,
    currentBet,
    balance,
    betsHistory = [],
    id,
    spinning,
    activeMenu,
  } = useContext(AppContext);

  const clearDisabled = spinning || sumBet(currentBet) === 0 || activeMenu;
  // if board is empty, can not clear and spin as well
  const spinDisabled = clearDisabled;

  const undoDisabled = betsHistory.length === 0 || spinning || activeMenu;
  const doubleDisabled =
    spinning || activeMenu || sumBet(currentBet) >= MAX_BET;

  return (
    <div className="actions">
      <button
        aria-label="Clear Board"
        disabled={clearDisabled}
        onClick={() =>
          dispatch({
            type: CLEAR_BOARD,
          })
        }
      >
        Clear
      </button>
      <button
        aria-label="Undo"
        disabled={undoDisabled}
        onClick={() =>
          dispatch({
            type: UNDO_BET,
          })
        }
      >
        <Undo />
      </button>
      <button
        aria-label="Spin the Wheel"
        disabled={spinDisabled}
        className="spin"
        onClick={async () => {
          dispatch({
            type: BEGIN_SPIN,
            log: false,
          });

          createSpinRequest(id, currentBet)
            .then(({ luckyNumber, error }) => {
              return new Promise((resolve, reject) => {
                resolve({ luckyNumber, error });
              });
            })
            .then(async ({ luckyNumber, error }) => {
              if (error) {
                dispatch({
                  type: END_SPIN,
                  error,
                });
              } else {
                // spin if all good

                dispatch({
                  type: BEGIN_BALL_SPIN,
                  luckyNumber,
                  log: false,
                });
                await wait((SPIN_DURAION_IN_SECONDS * 1000) / 3);

                dispatch({
                  type: END_SPIN,
                  luckyNumber,
                  log: false,
                });
                setTimeout(() => {
                  const profit =
                    sumBet(
                      calculateProfit(luckyNumber, normalizeBet(currentBet))
                    ) - sumBet(currentBet);
                }, 2800);

              }
            })
            .catch((e) => {
              // only network failure
              dispatch({
                type: END_SPIN,
                error: e.message,
              });
              console.log(e);
            });
        }}
      >
        <Spin />
      </button>
      <button
        aria-label="Double Bet"
        disabled={doubleDisabled}
        onClick={() => {
          dispatch({
            type: DOUBLE_BET,
          });
        }}
      >
        x2
      </button>
      <button
        aria-label="Quadruple Bet"
        disabled={doubleDisabled}
        onClick={() => {
          dispatch({
            type: QUADRUPLE_BET,
          });
        }}
      >
        x4
      </button>
    </div>
  );
}

export default Actions;
