/** @module NoteCardsContainer */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../redux/Actions";
import * as allTypes from "../../types/appTypes";

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
  toggleToggle: actions.toggleToggle,
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
    toggleToggle,
    makeFretboardSelection
  } = props;

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4} className="staff-section">
        <NoteStaff
          gameState={gameState}
          noteState={noteState}
          startGame={startGame}
          toggleToggle={toggleToggle}
        />
      </Col>
      <Col xs={8}>
        <FretBoard
          settings={settings}
          makeFretboardSelection={makeFretboardSelection}
          gameState={gameState}
          toggleToggle={toggleToggle}
        />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  settingsState: allTypes.settingsState.types,
  gameState: allTypes.gameState.types,
  noteState: allTypes.noteState.types,
  toggleToggle: PropTypes.func,
  startGame: PropTypes.func,
  makeFretboardSelection: PropTypes.func
};

NoteCardsContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  gameState: allTypes.gameState.defaults,
  noteState: allTypes.noteState.defaults,
  toggleToggle: () => {},
  startGame: () => {},
  makeFretboardSelection: () => {}
};

export const NoteCardsContainerTest = NoteCardsContainer;
export default connect(mapStateToProps, mapDispatchToProps)(NoteCardsContainer);
