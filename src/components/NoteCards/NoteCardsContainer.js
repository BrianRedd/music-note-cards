/** @module NoteCardsContainer */

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import _ from "lodash";

import * as allTypes from "../../types/appTypes";
import * as constant from "../../data/constants";
import availableNotes from "./data/notes";

import "./styles/notecardscontainer.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = props => {
  const {
    settingsState: { settings },
    gameState,
    toggleSettingsModal,
    startGame,
    testComplete,
    setTestComplete,
    setGameMessage
  } = props;

  const [noteTestPool, setNoteTestPool] = useState([]);
  const [completedTestNotes, setCompletedTestNotes] = useState([]);
  const [currentNoteTest, setCurrentNoteTest] = useState({});
  const [randomNoteValue, setRandomNoteValue] = useState(-1);
  // const [alertSeverity, setAlertSeverity] = useState("info");
  // const [alertText, setAlertText] = useState("Begin!");
  const [theseSettings, setTheseSettings] = useState(settings);

  /**
   * @function getStartNoteByStringIndices
   * @description based on selected string-staff value, returns noteObject from
   * constant.NOTE_PROGRESSION
   * @param {String} value {string}-{staff}
   * @returns {Object}
   */
  const getSelectedNoteObject = value => {
    const stringValue = Number(value.split("-")[0]) - 1;
    const staffValue = Number(value.split("-")[1]);
    const consolidatedNoteProgression = constant.NOTE_PROGRESSION.map(
      note => `${note.note}${note.key ? "#" : ""}`
    );
    const stringStartingNote =
      constant.START_NOTE_BY_STRING[stringValue].toUpperCase();
    const startNoteByStringIndices = constant.START_NOTE_BY_STRING.map(note =>
      consolidatedNoteProgression.indexOf(note.toUpperCase())
    );
    const selectedNoteIndex =
      (startNoteByStringIndices[stringValue] + staffValue) % 12;

    // eslint-disable-next-line no-console
    console.log(
      "getSelectedNoteObject; value:",
      value,
      "\n consolidatedNoteProgression:",
      consolidatedNoteProgression,
      "\n stringStartingNote:",
      stringStartingNote,
      "\n startNoteByStringIndices:",
      startNoteByStringIndices,
      "\n selectedNoteIndex:",
      selectedNoteIndex,
      "\n return value:",
      constant.NOTE_PROGRESSION[selectedNoteIndex]
    );

    return constant.NOTE_PROGRESSION[selectedNoteIndex];

    // constant.NOTE_PROGRESSION[
    //       (constant.START_NOTE_BY_STRING[value.split("-")[1]] +
    //         Number(value.split("-")[0])) %
    //         12
    //     ]
  };

  /**
   * @function useEffect
   * @description sets up filtered list of notes to test against
   */
  useEffect(() => {
    if (!testComplete && (!noteTestPool.length || settings !== theseSettings)) {
      let filteredNotes = availableNotes.map(note => ({
        ...note,
        lastAttemptStatus: "untested",
        numberOfAttempts: 0,
        wrongGuesses: []
      }));
      // number of frets
      filteredNotes = filteredNotes.filter(
        note => Number(note.tab.split("-")[0]) <= settings?.numberOfFrets
      );
      // instruments
      if (settings?.instrument === "ukelele") {
        filteredNotes = filteredNotes.filter(note => !note.guitarOnly);
      }
      // keys
      if ((settings?.excludedKeys ?? []).length > 0) {
        filteredNotes = filteredNotes.filter(
          note => !(settings?.excludedKeys ?? []).includes(note.key)
        );
      }
      setNoteTestPool(filteredNotes);
      setTheseSettings(settings);
      // eslint-disable-next-line no-console
      console.log("initial filteredNotes:", filteredNotes);
    }
  }, [noteTestPool, settings, theseSettings, setTheseSettings, testComplete]);

  const generateRandomValue = max => Math.floor(Math.random() * max);

  /**
   * @function randomizeNextNote
   * @description selects next note from remaining noteTestPool
   */
  const randomizeNextNote = useCallback(() => {
    let randomValue = generateRandomValue(noteTestPool.length);
    if (noteTestPool[randomValue].id === currentNoteTest.id) {
      randomValue = generateRandomValue(noteTestPool.length);
    }
    setRandomNoteValue(randomValue);
    const newNote = noteTestPool[randomValue];
    setCurrentNoteTest(newNote);
  }, [noteTestPool, currentNoteTest]);

  /**
   * @function makeFretboardSelection
   * @description when fretboard selection is made, test against currentNoteTest,
   * and update arrays based on success or failure
   * @param {String} value
   */
  const makeFretboardSelection = value => {
    // eslint-disable-next-line no-console
    console.log("makeFretboardSelection = value:", value);
    const updatedNoteTestPool = [...noteTestPool];
    const isCorrect =
      currentNoteTest?.tab === `${value.split("-")[1]}-${value.split("-")[0]}`;
    if (isCorrect) {
      const updatedCompletedTestNotes = [...completedTestNotes];
      updatedCompletedTestNotes.push({
        ...currentNoteTest,
        lastAttemptStatus: "correct",
        numberOfAttempts:
          (noteTestPool?.[randomNoteValue]?.numberOfAttempts ?? 0) + 1
      });
      updatedNoteTestPool.splice(randomNoteValue, 1);
      setCompletedTestNotes(updatedCompletedTestNotes);
      setNoteTestPool(updatedNoteTestPool);
      setGameMessage({
        severity: "success",
        text: `${currentNoteTest.name} is Correct!`
      });
    } else {
      const wrongGuesses =
        updatedNoteTestPool[randomNoteValue]?.wrongGuesses ?? [];
      wrongGuesses.push(value);
      updatedNoteTestPool[randomNoteValue] = {
        ...updatedNoteTestPool[randomNoteValue],
        lastAttemptStatus: "incorrect",
        numberOfAttempts:
          (updatedNoteTestPool[randomNoteValue]?.numberOfAttempts ?? 0) + 1,
        wrongGuesses
      };
      const selectedNoteObject = getSelectedNoteObject(value);
      setNoteTestPool(updatedNoteTestPool);
      setGameMessage({
        severity: "error",
        text: `${selectedNoteObject.note}${
          selectedNoteObject.key ? "#" : ""
        } is Incorrect! Should Be ${currentNoteTest.name}`
      });
      // setAlertSeverity("error");
      // setAlertText(
      //   `${
      //     constant.NOTE_PROGRESSION[
      //       (constant.START_NOTE_BY_STRING[value.split("-")[1]] +
      //         Number(value.split("-")[0])) %
      //         12
      //     ]
      //   } is Incorrect! Should Be ${currentNoteTest.name}`
      // );
    }
    if (updatedNoteTestPool.length === 0) {
      setTestComplete(true);
      setGameMessage({
        severity: "success",
        text: "Test Complete!"
      });
      // setAlertSeverity("success");
      // setAlertText("Test Complete!");
    } else {
      randomizeNextNote();
    }
  };

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4} className="staff-section">
        {!_.isEmpty(currentNoteTest) ? (
          <NoteStaff
            currentNoteTest={currentNoteTest}
            stats={{
              numberCorrect: (completedTestNotes ?? []).length,
              numberWrong: _.sum(
                (noteTestPool ?? []).map(
                  note => (note.wrongGuesses ?? []).length
                )
              ),
              numberRemaining: noteTestPool.length
            }}
          />
        ) : (
          <div className="start-button-container">
            <Button variant="contained" onClick={() => startGame()}>
              Begin!
            </Button>
          </div>
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
  testComplete: PropTypes.bool,
  setTestComplete: PropTypes.func,
  toggleSettingsModal: PropTypes.func,
  startGame: PropTypes.func,
  setGameMessage: PropTypes.func
};

NoteCardsContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  gameState: allTypes.gameState.defaults,
  testComplete: false,
  setTestComplete: () => {},
  toggleSettingsModal: () => {},
  startGame: () => {},
  setGameMessage: () => {}
};

export default NoteCardsContainer;
