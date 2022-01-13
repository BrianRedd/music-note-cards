/** @module NoteStaff */

import React, { memo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button } from "@mui/material";

import * as allTypes from "../../types/appTypes";
import * as constant from "../../data/constants";

import "./styles/notestaff.scss";

const TrebleClef = () => <span className="treble-clef">&#119070;</span>;

/**
 * @function NoteStaff
 * @description Functional Presentational component for NoteStaff
 * @returns {React.Component} - Rendered component.
 */
const NoteStaff = props => {
  const { gameState, noteState, startGame, toggleSettingsModal } = props;

  const stats = {
    numberCorrect: (noteState?.completedPool ?? []).filter(
      note => note.lastAttemptStatus === constant.TEST_NOTE_STATUS_CORRECT
    ).length,
    numberWrong:
      _.sum(
        (noteState?.testPool ?? []).map(
          note => (note.wrongGuesses ?? []).length
        )
      ) +
      _.sum(
        (noteState?.completedPool ?? []).map(
          note => (note.wrongGuesses ?? []).length
        )
      ),
    numberRemaining: (noteState?.testPool ?? []).length
  };

  const Lines = memo(() => {
    const lines = [];
    for (let i = 0; i < 5; i += 1) {
      lines.push(<div className={`line${i === 0 ? " first" : ""}`} key={i} />);
    }
    return lines;
  });

  const LowerLedgerLines = memo(() => {
    const lines = [];
    for (let i = 1; i <= 3; i += 1) {
      lines.push(
        <div
          className={`ledger-line below-${i}${
            gameState?.currentTestNote?.ledgerLine &&
            i <= Number(gameState?.currentTestNote?.ledgerLine)
              ? " visible"
              : ""
          }`}
          key={i}
        />
      );
    }
    return lines;
  });

  const Note = memo(() => {
    const topLocation =
      ((gameState?.currentTestNote?.staffValue ?? 0) + 1) * 10;
    const noteClassArray = ["note"];
    if (gameState?.currentTestNote?.key) {
      noteClassArray.push("with-symbol");
      noteClassArray.push(gameState?.currentTestNote?.key);
    }
    return gameState?.currentTestNote ? (
      <div
        className={noteClassArray.join(" ")}
        style={{ marginTop: `${topLocation}px` }}
      />
    ) : (
      <div />
    );
  });

  return (
    <div data-test="container-note-cards" className="p-2 h-100">
      {gameState.testStatus !== constant.GAME_STATUS_NEW && (
        <div className="stats">
          Number of Correct Guesses: {stats.numberCorrect}
          <br />
          Number of Wrong Guesses: {stats.numberWrong}
          <br />
          Test Items Remaining: {stats.numberRemaining}
          <br />
        </div>
      )}
      {gameState.testStatus === constant.GAME_STATUS_INPROGRESS ? (
        <div className="staff-container">
          <TrebleClef />
          <div className="staff">
            <div
              className={`ledger-line above-1${
                gameState?.currentTestNote?.ledgerLine === -1 ? " visible" : ""
              }`}
            />
            <Lines />
            <LowerLedgerLines />
            <Note />
          </div>
        </div>
      ) : (
        <div className="start-button-container">
          <Button
            onClick={() => {
              if (gameState.testStatus === constant.GAME_STATUS_NEW) {
                startGame();
              } else {
                toggleSettingsModal();
              }
            }}
          >
            <span className="fas fa-guitar fa-7x color-green" />
          </Button>
        </div>
      )}
    </div>
  );
};

NoteStaff.propTypes = {
  gameState: allTypes.gameState.types,
  noteState: allTypes.noteState.types,
  startGame: PropTypes.func,
  toggleSettingsModal: PropTypes.func
};

NoteStaff.defaultProps = {
  gameState: allTypes.gameState.defaults,
  noteState: allTypes.noteState.defaults,
  startGame: () => {},
  toggleSettingsModal: () => {}
};

export default NoteStaff;
