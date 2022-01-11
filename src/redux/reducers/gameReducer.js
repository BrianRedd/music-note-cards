/**
 * @module gameReducer
 * @description Reducer for gameState
 */

import * as actionTypes from "../ActionTypes";
import * as allTypes from "../../types/appTypes";

/**
 * @constant gameState
 * @param {Object} state
 * @param {Object} action
 */
// eslint-disable-next-line default-param-last
const gameState = (state = allTypes.gameState.defaults, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_TEST_STATUS:
      return {
        ...state,
        testStatus: payload
      };
    case actionTypes.SET_CURRENT_TEST_NOTE:
      return {
        ...state,
        currentTestNote: payload
      };
    case actionTypes.SET_GAME_MESSAGE:
      return {
        ...state,
        message: payload
      };
    default:
      return state;
  }
};

export default gameState;
