/**
 * @module noteReducer
 * @description Reducer for noteState
 */

import * as actionTypes from "../ActionTypes";
import * as allTypes from "../../types/appTypes";

/**
 * @constant noteState
 * @param {Object} state
 * @param {Object} action
 */
// eslint-disable-next-line default-param-last
const noteState = (state = allTypes.noteState.defaults, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PLACEHOLDER:
      return { ...state, temp: payload };
    default:
      return state;
  }
};

export default noteState;
