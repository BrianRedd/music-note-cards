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
    case actionTypes.PLACEHOLDER:
      return { ...state, temp: payload };
    default:
      return state;
  }
};

export default gameState;
