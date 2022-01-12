/** @module NoteStaff */

import React, { memo } from "react";
import PropTypes from "prop-types";

import * as allTypes from "../../types/appTypes";

import "./styles/notestaff.scss";

const TrebleClef = () => <span className="treble-clef">&#119070;</span>;

// const SharpSymbol = () => <span className="staff-symbol">&#9839;</span>;
// const NaturalSymbol = () => <span className="staff-symbol">&#9838;</span>;
// const FlatSymbol = () => <span className="staff-symbol">&#9837;</span>;

/**
 * @function NoteStaff
 * @description Functional Presentational component for NoteStaff
 * @returns {React.Component} - Rendered component.
 */
const NoteStaff = props => {
  const { gameState, stats } = props;

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
      <div className="stats">
        Number of Correct Guesses: {stats.numberCorrect}
        <br />
        Number of Wrong Guesses: {stats.numberWrong}
        <br />
        Test Items Remaining: {stats.numberRemaining}
        <br />
      </div>
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
    </div>
  );
};

NoteStaff.propTypes = {
  gameState: allTypes.gameState.types,
  stats: PropTypes.shape({
    numberCorrect: PropTypes.number,
    numberWrong: PropTypes.number,
    numberRemaining: PropTypes.number
  })
};

NoteStaff.defaultProps = {
  gameState: allTypes.gameState.defaults,
  stats: {
    numberCorrect: 0,
    numberWrong: 0,
    numberRemaining: 0
  }
};

export default NoteStaff;
