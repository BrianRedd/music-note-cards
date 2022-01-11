/** @module MainContainer */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import * as allTypes from "../types/appTypes";
import actions from "../redux/Actions";

import Main from "./Main";

const mapStateToProps = state => ({
  noteState: state.noteState,
  gameState: state.gameState,
  settingsState: state.settingsState
});

const mapDispatchToProps = {
  toggleSettingsModal: actions.toggleSettingsModal,
  updateSettings: actions.updateSettings,
  resetSettings: actions.resetSettings,
  setTestStatus: actions.setTestStatus,
  initializeAllNotes: actions.initializeAllNotes,
  startGame: actions.startGame
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
    setTestStatus,
    initializeAllNotes,
    startGame
  } = props;

  useEffect(() => {
    if (_.isEmpty(noteState?.allNotes)) {
      initializeAllNotes();
    }
  });

  return (
    <div data-test="container-main">
      <Main
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
        toggleSettingsModal={toggleSettingsModal}
        startGame={startGame}
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
  setTestStatus: PropTypes.func,
  initializeAllNotes: PropTypes.func,
  startGame: PropTypes.func
};

MainContainer.defaultProps = {
  noteState: allTypes.noteState.defaults,
  gameState: allTypes.gameState.defaults,
  settingsState: allTypes.settingsState.defaults,
  toggleSettingsModal: () => {},
  updateSettings: () => {},
  resetSettings: () => {},
  setTestStatus: () => {},
  initializeAllNotes: () => {},
  startGame: () => {}
};

export const MainContainerTest = MainContainer;
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
