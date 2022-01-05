/** @module NoteCardsContainer */

import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";

import * as allTypes from "../../types/appTypes";
import * as constant from "./data/constants";
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
  const { settings } = props;

  const [noteTestPool, setNoteTestPool] = useState([]);
  const [completedTestNotes, setCompletedTestNotes] = useState([]);
  const [currentNoteTest, setCurrentNoteTest] = useState({});
  const [randomNoteValue, setRandomNoteValue] = useState(-1);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertText, setAlertText] = useState("Begin!");

  /**
   * @function useEffect
   * @description sets up filtered list of notes to test against
   */
  useEffect(() => {
    if (!noteTestPool.length) {
      // TODO: create noteArray based on settings
      let filteredNotes = availableNotes.map(note => ({
        ...note,
        lastAttemptStatus: "untested",
        numberOfAttempts: 0,
        wrongGuesses: []
      }));
      if (settings.instrument === "ukelele") {
        filteredNotes = filteredNotes.filter(note => !note.guitarOnly);
      }
      if (settings.excludedKeys.length > 0) {
        filteredNotes = filteredNotes.filter(
          note => !settings.excludedKeys.includes(note.key)
        );
      }
      setNoteTestPool(filteredNotes);
    }
  }, [noteTestPool, settings]);

  /**
   * @function randomizeNextNote
   * @description selects next note from remaining noteTestPool
   */
  const randomizeNextNote = useCallback(() => {
    const randomValue = Math.floor(Math.random() * noteTestPool.length);
    setRandomNoteValue(randomValue);
    const newNote = noteTestPool[randomValue];
    setCurrentNoteTest(newNote);
  }, [noteTestPool]);

  /**
   * @function useEffect
   * @description randomizes initial test note
   */
  useEffect(() => {
    if (noteTestPool.length && _.isEmpty(currentNoteTest)) {
      randomizeNextNote();
    }
  }, [noteTestPool, currentNoteTest, randomizeNextNote]);

  /**
   * @function makeFretboardSelection
   * @description when fretboard selection is made, test against currentNoteTest,
   * and update arrays based on success or failure
   * @param {String} value
   */
  const makeFretboardSelection = value => {
    const updatedNoteTestPool = [...noteTestPool];
    const isCorrect = currentNoteTest?.tabValue === value;
    // eslint-disable-next-line no-console
    console.log(
      "randomNoteValue:",
      randomNoteValue,
      "\nselected value:",
      value,
      "expected value:",
      currentNoteTest?.tabValue,
      "\nisCorrect:",
      isCorrect
    );
    if (isCorrect) {
      const updatedCompletedTestNotes = [...completedTestNotes];
      updatedCompletedTestNotes.push({
        ...currentNoteTest,
        lastAttemptStatus: "correct",
        numberOfAttempts:
          (noteTestPool?.[randomNoteValue]?.numberOfAttempts ?? 0) + 1
      });
      updatedNoteTestPool.splice(randomNoteValue, 1);
      // eslint-disable-next-line no-console
      console.log(
        "updatedCompletedTestNotes:",
        updatedCompletedTestNotes,
        "\nupdatedNoteTestPool:",
        updatedNoteTestPool
      );
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
      // eslint-disable-next-line no-console
      console.log(
        "updatedNoteTestPool:",
        updatedNoteTestPool,
        "\nwrongGuesses:",
        wrongGuesses
      );
      setNoteTestPool(updatedNoteTestPool);
      setAlertSeverity("error");
      setAlertText(
        `${
          constant.NOTE_PROGRESSION[
            (constant.START_NOTE_BY_STRING[value.split("-")[1]] +
              Number(value.split("-")[0])) %
              12
          ]
        } is Incorrect! Should Be ${currentNoteTest.name}`
      );
    }
    randomizeNextNote();
  };

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4}>
        {!_.isEmpty(currentNoteTest) && (
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
        />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  settings: allTypes.settings.types
};

NoteCardsContainer.defaultProps = {
  settings: allTypes.settings.defaults
};

export default NoteCardsContainer;
