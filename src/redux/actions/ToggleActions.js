/** @module ToggleActions */

import { TOGGLE_TOGGLE, RESET_TOGGLES } from "../ActionTypes";

/**
 * @function toggleToggle
 * @description adds or removes toggle name to toggleState,
 * used to determine if toggle et al is open or closed
 * @param {String} toggle - name of toggle being toggled
 */
export const toggleToggle = toggle => ({
  type: TOGGLE_TOGGLE,
  payload: toggle
});

/**
 * @function resetToggles
 * @description resets toggle state to default
 */
export const resetToggles = () => ({
  type: RESET_TOGGLES,
  payload: null
});
