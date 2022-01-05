/** @module FretBoard */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { Alert, ButtonBase } from "@mui/material";

import * as constant from "./data/constants";
import * as allTypes from "../../types/appTypes";

import "./styles/fretboard.scss";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = props => {
  const { settings, makeFretboardSelection, alert } = props;

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
          <ButtonBase
            className="button"
            onClick={() => makeFretboardSelection(key)}
          />
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
            onClick={() => makeFretboardSelection(key)}
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
    <div data-test="presentation-fretboard" className="section-container">
      <Alert
        severity={alert.severity}
        action={
          <ButtonBase
            color="inherit"
            size="small"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log("open settings!");
            }}
          >
            <span className="fas fa-cog fa-2x" />
          </ButtonBase>
        }
      >
        {alert.text}
      </Alert>
      <div className="fretboard-container">
        <Strings />
      </div>
    </div>
  );
};

FretBoard.propTypes = {
  settings: allTypes.settings.types,
  alert: PropTypes.shape({
    severity: PropTypes.string,
    text: PropTypes.string
  }),
  makeFretboardSelection: PropTypes.func
};

FretBoard.defaultProps = {
  settings: allTypes.settings.defaults,
  alert: PropTypes.shape({
    severity: "info",
    text: "Begin!"
  }),
  makeFretboardSelection: () => {}
};

export default FretBoard;
