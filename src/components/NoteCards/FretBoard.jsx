/** @module FretBoard */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ButtonBase, Snackbar, Alert } from "@mui/material";

import * as constant from "./data/constants";
import * as allTypes from "../../types/appTypes";

import "./styles/fretboard.scss";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = props => {
  const { settings, makeFretboardSelection, gameState, toggleToggle } = props;

  const Frets = memo(fretProps => {
    const { stringNumber } = fretProps;
    const frets = [];
    for (let fret = 0; fret <= settings?.numberOfFrets ?? 0; fret += 1) {
      const key = `${stringNumber}-${fret}`;
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
    for (let fret = 0; fret <= settings?.numberOfFrets ?? 0; fret += 1) {
      const key = `${
        constant.INSTRUMENT?.[settings?.instrument]?.numberOfStrings
      }-${fret}`;
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
        <div
          className="string"
          key={i}
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/istockphoto-1083302826-170667a.jpg)`
          }}
        >
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

  const [snackbarMessage, setSnackbarMessage] = useState(null);

  useEffect(() => {
    if (
      gameState?.message?.text &&
      gameState?.message?.text !== snackbarMessage
    ) {
      setSnackbarMessage(gameState?.message?.text);
    }
  }, [gameState.message.text, snackbarMessage]);

  return (
    <div data-test="presentation-fretboard" className="section-container">
      <div className="fretboard-container">
        <ButtonBase
          className="button-settings"
          color="inherit"
          size="small"
          onClick={() => toggleToggle("settings-modal")}
        >
          <span className="fas fa-cog fa-2x" />
        </ButtonBase>
        <Strings />
      </div>
      <Snackbar open>
        <Alert severity={gameState?.message?.severity}>
          {gameState?.message?.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

FretBoard.propTypes = {
  settings: allTypes.settings.types,
  gameState: allTypes.gameState.types,
  makeFretboardSelection: PropTypes.func,
  toggleToggle: PropTypes.func
};

FretBoard.defaultProps = {
  settings: allTypes.settings.defaults,
  gameState: allTypes.gameState.defaults,
  makeFretboardSelection: () => {},
  toggleToggle: () => {}
};

export default FretBoard;
