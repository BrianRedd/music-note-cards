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
    case actionTypes.ADD_ALL_NOTES:
      return {
        ...state,
        allNotes: payload
      };
    case actionTypes.ADD_TEST_POOL:
      return {
        ...state,
        testPool: payload
      };
    case actionTypes.DECREMENT_TEST_POOL:
      return {
        ...state,
        testPool: [...action.testPool.splice(payload, 1)]
      };
    case actionTypes.CLEAR_COMPLETED_POOL:
      return {
        ...state,
        completedPool: []
      };
    case actionTypes.INCREMENT_COMPLETED_POOL:
      return {
        ...state,
        completedPool: [...state.completedPool, payload]
      };
    default:
      return state;
  }
};

export default noteState;
