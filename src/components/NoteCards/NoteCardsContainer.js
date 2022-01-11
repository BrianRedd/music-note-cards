/** @module NoteCardsContainer */

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import _ from "lodash";

import * as allTypes from "../../types/appTypes";
// import * as constant from "./data/constants";
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
    toggleSettingsModal,
    startGame,
    testComplete,
    setTestComplete
  } = props;

  const [noteTestPool, setNoteTestPool] = useState([]);
  const [completedTestNotes, setCompletedTestNotes] = useState([]);
  const [currentNoteTest, setCurrentNoteTest] = useState({});
  const [randomNoteValue, setRandomNoteValue] = useState(-1);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertText, setAlertText] = useState("Begin!");
  const [theseSettings, setTheseSettings] = useState(settings);

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
    console.log("\nnoteTestPool:", noteTestPool);
    const updatedNoteTestPool = [...noteTestPool];
    const isCorrect = currentNoteTest?.tab === value;
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
      setAlertSeverity("success");
      setAlertText(`${currentNoteTest.name} is Correct!`);
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
      setNoteTestPool(updatedNoteTestPool);
      setAlertSeverity("error");
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
      setAlertSeverity("success");
      setAlertText("Test Complete!");
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
          alert={{
            severity: alertSeverity,
            text: alertText
          }}
          toggleSettingsModal={toggleSettingsModal}
        />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  settingsState: allTypes.settingsState.types,
  testComplete: PropTypes.bool,
  setTestComplete: PropTypes.func,
  toggleSettingsModal: PropTypes.func,
  startGame: PropTypes.func
};

NoteCardsContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  testComplete: false,
  setTestComplete: () => {},
  toggleSettingsModal: () => {},
  startGame: () => {}
};

export default NoteCardsContainer;
