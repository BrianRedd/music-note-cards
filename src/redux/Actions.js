/** @module Actions */

import * as noteActions from "./actions/NoteActions";
import * as gameActions from "./actions/GameActions";
import * as settingsActions from "./actions/SettingsActions";
import * as toggleActions from "./actions/ToggleActions";

/**
 * @constant actions
 * @description combines actions into single export
 */
const actions = {
  ...noteActions,
  ...gameActions,
  ...settingsActions,
  ...toggleActions
};

export default actions;
