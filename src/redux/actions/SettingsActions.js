/** @module SettingsActions */

import {
  TOGGLE_SETTINGS_MODAL,
  UPDATE_SETTINGS,
  RESET_SETTINGS
} from "../ActionTypes";

/**
 * @function toggleSettingsModal
 * @description toggles settingsState?.isModalOpen flag
 */
export const toggleSettingsModal = () => ({
  type: TOGGLE_SETTINGS_MODAL
});

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
