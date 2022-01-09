/** @module MainContainer */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as allTypes from "../types/appTypes";
import actions from "../redux/Actions";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";
import SettingsDialogContainer from "./Modals/Settings/SettingsDialogContainer";

const mapStateToProps = state => ({
  noteState: state.noteState,
  gameState: state.gameState,
  settingsState: state.settingsState
});

const mapDispatchToProps = {
  toggleSettingsModal: actions.toggleSettingsModal,
  updateSettings: actions.updateSettings,
  resetSettings: actions.resetSettings,
  setTestStatus: actions.setTestStatus
};

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = props => {
  const {
    noteState,
    gameState,
    settingsState,
    toggleSettingsModal,
    updateSettings,
    resetSettings,
    setTestStatus
  } = props;

  return (
    <div data-test="container-main">
      <NoteCardsContainer
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
        toggleSettingsModal={toggleSettingsModal}
      />
      <SettingsDialogContainer
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
        toggleSettingsModal={toggleSettingsModal}
        updateSettings={updateSettings}
        setTestStatus={setTestStatus}
        resetSettings={resetSettings}
      />
    </div>
  );
};

MainContainer.propTypes = {
  noteState: allTypes.noteState.types,
  gameState: allTypes.gameState.types,
  settingsState: allTypes.settingsState.types,
  toggleSettingsModal: PropTypes.func,
  updateSettings: PropTypes.func,
  resetSettings: PropTypes.func,
  setTestStatus: PropTypes.func
};

MainContainer.defaultProps = {
  noteState: allTypes.noteState.defaults,
  gameState: allTypes.gameState.defaults,
  settingsState: allTypes.settingsState.defaults,
  toggleSettingsModal: () => {},
  updateSettings: () => {},
  resetSettings: () => {},
  setTestStatus: () => {}
};

export const MainContainerTest = MainContainer;
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
