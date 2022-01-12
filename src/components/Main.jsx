/** @module Main */

import React from "react";
import PropTypes from "prop-types";

import * as allTypes from "../types/appTypes";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";
import SettingsModalContainer from "./Modals/Settings/SettingsModalContainer";

/**
 * @function Main
 * @description Functional Presentational component for Main
 * @returns {React.Component} - Rendered component.
 */
const Main = props => {
  const {
    noteState,
    gameState,
    settingsState,
    toggleSettingsModal,
    startGame,
    updateSettings,
    setTestStatus,
    resetSettings,
    setGameMessage,
    makeFretboardSelection
  } = props;

  return (
    <div data-test="presentation-main">
      <NoteCardsContainer
        noteState={noteState}
        gameState={gameState}
        settingsState={settingsState}
        toggleSettingsModal={toggleSettingsModal}
        startGame={startGame}
        setGameMessage={setGameMessage}
        makeFretboardSelection={makeFretboardSelection}
      />
      <SettingsModalContainer
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

Main.propTypes = {
  noteState: allTypes.noteState.types,
  gameState: allTypes.gameState.types,
  settingsState: allTypes.settingsState.types,
  toggleSettingsModal: PropTypes.func,
  updateSettings: PropTypes.func,
  resetSettings: PropTypes.func,
  setTestStatus: PropTypes.func,
  startGame: PropTypes.func,
  setGameMessage: PropTypes.func,
  makeFretboardSelection: PropTypes.func
};

Main.defaultProps = {
  noteState: allTypes.noteState.defaults,
  gameState: allTypes.gameState.defaults,
  settingsState: allTypes.settingsState.defaults,
  toggleSettingsModal: () => {},
  updateSettings: () => {},
  resetSettings: () => {},
  setTestStatus: () => {},
  startGame: () => {},
  setGameMessage: () => {},
  makeFretboardSelection: () => {}
};

export default Main;
