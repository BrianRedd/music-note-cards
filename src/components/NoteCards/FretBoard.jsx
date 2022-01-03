/** @module FretBoard */

import React from "react";

import * as constant from "./data/constants";

import "./styles/notecards.scss";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = () => (
  <div data-test="presentation-fretboard" className="fretboard-container">
    <div className="fretboard">
      {(constant?.FRETS ?? []).map(fret => (
        <div className="fret" key={fret}>
          {(constant?.STRINGS ?? []).map(string => (
            <div
              className="string"
              key={`${fret}-${string}`}
            >{`${fret}-${string}`}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default FretBoard;
