/** @module MainContainer */

import React /* useState */ from "react";
import { connect } from "react-redux";

import * as allTypes from "../types/appTypes";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";
import SettingsDialogContainer from "./Modals/Settings/SettingsDialogContainer";

const mapStateToProps = state => ({
  noteState: state.noteState,
  gameState: state.gameState,
  settingsState: state.settingsState
});

const mapDispatchToProps = {};

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = props => {
  const { noteState, gameState, settingsState } = props;

  // const [isSettingsOpen, setSettingsOpen] = useState(true);
  // const [settings, setSettings] = useState(allTypes.settings.defaults);
  // const [testComplete, setTestComplete] = useState(false);

  return (
    <div data-test="container-main">
      <NoteCardsContainer
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
      />
      <SettingsDialogContainer
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
      />
    </div>
  );
};

MainContainer.propTypes = {
  noteState: allTypes.noteState.types,
  gameState: allTypes.gameState.types,
  settingsState: allTypes.settingsState.types
};

MainContainer.defaultProps = {
  noteState: allTypes.noteState.defaults,
  gameState: allTypes.gameState.defaults,
  settingsState: allTypes.settingsState.defaults
};

export const MainContainerTest = MainContainer;
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
