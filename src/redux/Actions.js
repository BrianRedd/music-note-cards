/** @module Actions */

import * as noteActions from "./actions/NoteActions";
import * as gameActions from "./actions/GameActions";
import * as settingsActions from "./actions/SettingsActions";

/**
 * @constant actions
 * @description combines actions into single export
 */
const actions = {
  ...noteActions,
  ...gameActions,
  ...settingsActions
};

export default actions;
