/** @module FretBoard */

import React from "react";

import * as constant from "./data/constants";
import * as allTypes from "./types/appTypes";

import "./styles/notecards.scss";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = props => {
  const { settings } = props;

  const Frets = fretProps => {
    const { numberOfFrets, stringNumber } = fretProps;
    const strings = [];
    for (let i = 0; i <= numberOfFrets; i += 1) {
      const key = `${i}-${stringNumber}`;
      strings.push(
        <div
          className={`fret${
            constant.INSTRUMENT?.[
              settings?.instrument
            ]?.positionMarkerArray.includes(key)
              ? " position-marker"
              : ""
          }`}
          key={key}
        />
      );
    }
    return strings;
  };

  const Strings = ({ numberOfStrings }) => {
    const strings = [];
    for (let i = 1; i < numberOfStrings; i += 1) {
      strings.push(
        <div className="string" key={i}>
          <Frets numberOfFrets={settings?.numberOfFrets} stringNumber={i} />
        </div>
      );
    }
    return strings;
  };

  return (
    <div data-test="presentation-fretboard" className="fretboard-container">
      <div className="fretboard">
        <Strings
          numberOfStrings={
            constant.INSTRUMENT?.[settings?.instrument]?.numberOfStrings
          }
        />
      </div>
    </div>
  );
};

FretBoard.propTypes = {
  settings: allTypes.settings.types
};

FretBoard.defaultProps = {
  settings: allTypes.settings.defaults
};

export default FretBoard;
