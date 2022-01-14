/**
 * @module toggleStateReducer
 * @description Reducer for Toggle State (open/closed) data
 */

import { TOGGLE_TOGGLE, RESET_TOGGLES } from "../ActionTypes";
import * as allTypes from "../../types/appTypes";

/**
 * @constant toggleState
 * @param {Object} state
 * @param {Object} action
 */
// eslint-disable-next-line default-param-last
const toggleState = (state = allTypes.toggleState.defaults, action) => {
  const { type, payload } = action;
  const { open } = state;
  const newOpen = [...open];
  const toggleListIdx = open.indexOf(payload);
  switch (type) {
    case TOGGLE_TOGGLE:
      if (toggleListIdx === -1) {
        newOpen.push(payload);
      } else {
        newOpen.splice(toggleListIdx, 1);
      }
      return {
        ...state,
        open: newOpen
      };
    case RESET_TOGGLES:
      return { open: [] };
    default:
      return state;
  }
};

export default toggleState;
