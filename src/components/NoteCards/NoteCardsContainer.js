/** @module NoteCardsContainer */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import _ from "lodash";

import * as allTypes from "../../types/appTypes";
import * as constant from "../../data/constants";

import "./styles/notecardscontainer.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = props => {
  const {
    settingsState: { settings },
    gameState,
    noteState,
    startGame,
    toggleSettingsModal,
    makeFretboardSelection
  } = props;

  const [showStartButton, setShowStartButton] = useState(true);

  useEffect(() => {
    if (gameState?.testStatus === constant.GAME_STATUS_INPROGRESS) {
      setShowStartButton(false);
    }
  }, [gameState]);

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4} className="staff-section">
        {showStartButton ? (
          <div className="start-button-container">
            <Button variant="contained" onClick={() => startGame()}>
              Begin!
            </Button>
          </div>
        ) : (
          <NoteStaff
            currentNoteTest={gameState.currentNoteTest}
            stats={{
              numberCorrect: (noteState?.completedPool ?? []).length,
              numberWrong: _.sum(
                (noteState?.testPool ?? []).map(
                  note => (note.wrongGuesses ?? []).length
                )
              ),
              numberRemaining: (noteState?.testPool ?? []).length
            }}
          />
        )}
      </Col>
      <Col xs={8}>
        <FretBoard
          settings={settings}
          makeFretboardSelection={makeFretboardSelection}
          gameState={gameState}
          toggleSettingsModal={toggleSettingsModal}
        />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  settingsState: allTypes.settingsState.types,
  gameState: allTypes.gameState.types,
  noteState: allTypes.noteState.types,
  toggleSettingsModal: PropTypes.func,
  startGame: PropTypes.func,
  makeFretboardSelection: PropTypes.func
};

NoteCardsContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  gameState: allTypes.gameState.defaults,
  noteState: allTypes.noteState.defaults,
  toggleSettingsModal: () => {},
  startGame: () => {},
  makeFretboardSelection: () => {}
};

export default NoteCardsContainer;
