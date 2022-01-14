/**
 * @module settingsReducer
 * @description Reducer for settingsState
 */

import * as actionTypes from "../ActionTypes";
import * as allTypes from "../../types/appTypes";

/**
 * @constant settingsState
 * @param {Object} state
 * @param {Object} action
 */
// eslint-disable-next-line default-param-last
const settingsState = (state = allTypes.settingsState.defaults, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload
        }
      };
    case actionTypes.RESET_SETTINGS:
      return {
        ...state,
        settings: allTypes.settingsState.defaults.settings
      };
    default:
      return state;
  }
};

export default settingsState;
