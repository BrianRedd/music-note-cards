/** @module NoteCardsContainer */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import _ from "lodash";

import actions from "../../redux/Actions";
import * as allTypes from "../../types/appTypes";
import * as constant from "../../data/constants";

import "./styles/notecardscontainer.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

const mapStateToProps = state => ({
  gameState: state.gameState,
  noteState: state.noteState,
  settingsState: state.settingsState
});

const mapDispatchToProps = {
  startGame: actions.startGame,
  toggleSettingsModal: actions.toggleSettingsModal,
  makeFretboardSelection: actions.makeFretboardSelection
};

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = props => {
  const {
    gameState,
    noteState,
    settingsState: { settings },
    startGame,
    toggleSettingsModal,
    makeFretboardSelection
  } = props;

  const [showStartButton, setShowStartButton] = useState(true);

  useEffect(() => {
    setShowStartButton(
      gameState?.testStatus !== constant.GAME_STATUS_INPROGRESS
    );
  }, [gameState]);

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4} className="staff-section">
        {showStartButton ? (
          <div className="start-button-container">
            <Button onClick={() => startGame()}>
              <span className="fas fa-guitar fa-7x color-green" />
            </Button>
          </div>
        ) : (
          <NoteStaff
            gameState={gameState}
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

export const NoteCardsContainerTest = NoteCardsContainer;
export default connect(mapStateToProps, mapDispatchToProps)(NoteCardsContainer);
