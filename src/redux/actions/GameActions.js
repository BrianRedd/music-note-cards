/** @module GameActions */

import { addTestPool } from "./NoteActions";

import {
  SET_TEST_STATUS,
  SET_CURRENT_TEST_NOTE,
  SET_GAME_MESSAGE
} from "../ActionTypes";
import * as constant from "../../data/constants";

/**
 * @function setTestStatus
 * @description settings gameState.testStatus
 * @param {String} testStatus
 */
export const setTestStatus = testStatus => ({
  type: SET_TEST_STATUS,
  payload: testStatus
});

/**
 * @function setCurrentTestNote
 * @description sets gameState.currentTestNote
 * @param {Object} currentTestNote
 */
export const setCurrentTestNote = currentTestNote => ({
  type: SET_CURRENT_TEST_NOTE,
  payload: currentTestNote
});

/**
 * @function setGameMessage
 * @description sets gameState.message
 * @param {Object} messageObject
 * @param {String} messageObject.severity
 * @param {String} messageObject.text
 */
export const setGameMessage = messageObject => ({
  type: SET_GAME_MESSAGE,
  payload: messageObject
});

/**
 * @function setTestNote
 * @description randomize a note from noteState.testPool and dispatch to gameState.currentTestNote
 */
export const setTestNote =
  (filteredNotes = null) =>
  (dispatch, getState) => {
    const { noteState } = getState();
    const testPool =
      (noteState?.testPool ?? []).length > 0
        ? noteState?.testPool
        : filteredNotes;
    const randomNumber = Math.floor(Math.random() * testPool.length);
    dispatch(setCurrentTestNote(testPool[randomNumber]));
  };

/**
 * @function startGame
 * @description set testPool based on settings and start game
 */
export const startGame = () => (dispatch, getState) => {
  const {
    noteState: { allNotes },
    settingsState: { settings }
  } = getState();
  let filteredNotes = allNotes.map(note => ({
    ...note,
    lastAttemptStatus: "untested",
    numberOfAttempts: 0,
    wrongGuesses: []
  }));
  // number of frets
  filteredNotes = filteredNotes.filter(
    note => note.tabValue <= settings?.numberOfFrets
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
  dispatch(addTestPool(filteredNotes));
  dispatch(setTestNote(filteredNotes));
  dispatch(setTestStatus(constant.GAME_STATUS_INPROGRESS));
};

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
  const startNoteByStringIndices = constant.START_NOTE_BY_STRING.map(note =>
    consolidatedNoteProgression.indexOf(note.toUpperCase())
  );
  const selectedNoteIndex =
    (startNoteByStringIndices[stringValue] + staffValue) % 12;

  return constant.NOTE_PROGRESSION[selectedNoteIndex];
};

/**
 * @function makeFretboardSelection
 * @description test selected fret against state and dispatch appropriate actions
 * @param {String} selection
 */
export const makeFretboardSelection = selection => (dispatch, getState) => {
  const {
    gameState: { currentTestNote }
    // noteState: { testPool }
  } = getState();
  // eslint-disable-next-line no-console
  console.log(
    "makeFretboardSelection; selection:",
    selection,
    "\ncurrentTestNote:",
    currentTestNote
  );

  const isCorrect =
    selection ===
    `${currentTestNote?.stringValue}-${currentTestNote?.tabValue}`;
  let text = "";
  if (isCorrect) {
    text = `${currentTestNote.name} is Correct!`;
  } else {
    const selectedNoteObject = getSelectedNoteObject(selection);
    text = `${selectedNoteObject.note}${
      selectedNoteObject.key ? "#" : ""
    } is Incorrect! Should Be ${currentTestNote.name}`;
  }
  dispatch(
    setGameMessage({
      severity: isCorrect ? constant.SEVERITY_SUCCESS : constant.SEVERITY_ERROR,
      text
    })
  );
  dispatch(setTestNote());
};
