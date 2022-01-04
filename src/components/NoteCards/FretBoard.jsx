/** @module FretBoard */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";

import * as constant from "./data/constants";
import * as allTypes from "../../types/appTypes";

import "./styles/fretboard.scss";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = props => {
  const { settings, pressButton } = props;

  const Frets = memo(fretProps => {
    const { stringNumber } = fretProps;
    const frets = [];
    for (let i = 0; i <= settings?.numberOfFrets ?? 0; i += 1) {
      const key = `${i}-${stringNumber}`;
      frets.push(
        <div
          className={`fret${
            constant.INSTRUMENT?.[
              settings?.instrument
            ]?.positionMarkerArray.includes(key)
              ? " position-marker"
              : ""
          }`}
          key={key}
        >
          <ButtonBase className="button" onClick={() => pressButton(key)} />
        </div>
      );
    }
    return frets;
  });

  const BottomButtons = memo(() => {
    const bottomButtons = [];
    for (let i = 0; i <= settings?.numberOfFrets ?? 0; i += 1) {
      const key = `${i}-${
        constant.INSTRUMENT?.[settings?.instrument]?.numberOfStrings
      }`;
      bottomButtons.push(
        <div className="fret bottom-fret" key={key}>
          <ButtonBase
            className="button bottom-button"
            onClick={() => pressButton(key)}
          />
        </div>
      );
    }
    return bottomButtons;
  });

  const Strings = memo(() => {
    const strings = [];
    for (
      let i = 1;
      i < constant.INSTRUMENT?.[settings?.instrument]?.numberOfStrings;
      i += 1
    ) {
      strings.push(
        <div className="string" key={i}>
          <Frets stringNumber={i} />
        </div>
      );
    }
    return (
      <div className="fretboard">
        {strings}
        <BottomButtons />
      </div>
    );
  });

  return (
    <div data-test="presentation-fretboard" className="fretboard-container">
      <Strings />
    </div>
  );
};

FretBoard.propTypes = {
  settings: allTypes.settings.types,
  pressButton: PropTypes.func
};

FretBoard.defaultProps = {
  settings: allTypes.settings.defaults,
  pressButton: () => {}
};

export default FretBoard;
