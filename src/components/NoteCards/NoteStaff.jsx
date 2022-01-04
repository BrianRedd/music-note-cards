/** @module NoteStaff */

import React, { memo } from "react";
import PropTypes from "prop-types";

import "./styles/notestaff.scss";

const TrebleClef = () => <span className="treble-clef">&#119070;</span>;

// const SharpSymbol = () => <span className="sharp-symbol">&#9839;</span>;

/**
 * @function NoteStaff
 * @description Functional Presentational component for NoteStaff
 * @returns {React.Component} - Rendered component.
 */
const NoteStaff = props => {
  const { pressedValue } = props;

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
      lines.push(<div className={`ledger-line below-${i}`} key={i} />);
    }
    return lines;
  });

  const Note = memo(() => {
    const noteValue = Number(pressedValue.split("-")[1]);
    const topLocation = 9 + noteValue * 20;
    return pressedValue ? (
      <div className="note" style={{ marginTop: `${topLocation}px` }} />
    ) : (
      <div />
    );
  });

  return (
    <div data-test="container-note-cards" className="staff-container">
      <TrebleClef />
      <div className="staff">
        <div className="ledger-line above-1" />
        <Lines />
        <LowerLedgerLines />
        <Note />
      </div>
    </div>
  );
};

NoteStaff.propTypes = {
  pressedValue: PropTypes.string
};

NoteStaff.defaultProps = {
  pressedValue: ""
};

export default NoteStaff;
