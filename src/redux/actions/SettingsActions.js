/** @module SettingsActions */

import { UPDATE_SETTINGS, RESET_SETTINGS } from "../ActionTypes";

/**
 * @function updateSettings
 * @description merges settingsObject with existing settingsState.settings object
 * @param {Object} settingsObject
 */
export const updateSettings = settingsObject => ({
  type: UPDATE_SETTINGS,
  payload: settingsObject
});

/**
 * @function resetSettings
 * @description reset settingsState.settings to default state
 */
export const resetSettings = () => ({
  type: RESET_SETTINGS
});
