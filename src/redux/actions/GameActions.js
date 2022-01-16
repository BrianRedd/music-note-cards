/** @module GameActions */

import _ from "lodash";

import {
  addTestPool,
  incrementCompletedPool,
  removeNoteFromTestPool,
  updateTestPool,
  clearCompletedPool
} from "./NoteActions";
import { toggleToggle } from "./ToggleActions";

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
    if (_.isEmpty(testPool)) {
      dispatch(toggleToggle("statistics-modal"));
      dispatch(
        setGameMessage({
          severity: constant.SEVERITY_WARNING,
          text: `${
            (noteState?.completedPool ?? []).length
          } Questions Answered; ${constant.GAME_MESSAGE_GAME_OVER}`
        })
      );
      dispatch(setTestStatus(constant.GAME_STATUS_COMPLETED));
      return;
    }
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
  dispatch(clearCompletedPool());
  let filteredNotes = allNotes.map(note => ({
    ...note,
    lastAttemptStatus: constant.TEST_NOTE_STATUS_UNTESTED,
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
  dispatch(
    setGameMessage({
      severity: constant.OPTION_LIST.severities[0],
      text: `${filteredNotes.length} Questions Ready: ${constant.GAME_MESSAGE_GOOD_LUCK}`
    })
  );
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
    gameState: { currentTestNote, testStatus },
    noteState: { testPool },
    settingsState: { settings }
  } = getState();

  if (testStatus !== constant.GAME_STATUS_INPROGRESS) {
    return;
  }

  const isCorrect =
    selection ===
    `${currentTestNote?.stringValue}-${currentTestNote?.tabValue}`;
  let text = "";

  const idx = (testPool ?? []).map(note => note.id).indexOf(currentTestNote.id);
  if (idx === -1) {
    dispatch(
      setGameMessage({
        severity: constant.SEVERITY_ERROR,
        text: "ERROR!"
      })
    );
    return;
  }
  const updatedTestNote = { ...testPool?.[idx] };
  updatedTestNote.numberOfAttempts += 1;

  const numberOfQuestions = (testPool ?? []).length - 1;

  if (isCorrect) {
    // Correct answer
    text = `${currentTestNote.name} is Correct!`;
    updatedTestNote.lastAttemptStatus = constant.TEST_NOTE_STATUS_CORRECT;
    dispatch(incrementCompletedPool(updatedTestNote));
    dispatch(removeNoteFromTestPool(idx));
  } else {
    // Incorrect answer
    const selectedNoteObject = getSelectedNoteObject(selection);
    text = `${selectedNoteObject.note}${
      selectedNoteObject.key ? "#" : ""
    } is Incorrect! Should Be ${currentTestNote.name}`;
    updatedTestNote.wrongGuesses.push(selection);
    updatedTestNote.lastAttemptStatus = constant.TEST_NOTE_STATUS_INCORRECT;
    if (settings?.removeWrongFromPool) {
      dispatch(incrementCompletedPool(updatedTestNote));
      dispatch(removeNoteFromTestPool(idx));
    } else {
      const updatedTestPool = [...testPool];
      updatedTestPool[idx] = updatedTestNote;
      dispatch(updateTestPool(updatedTestPool));
    }
  }
  dispatch(
    setGameMessage({
      severity: isCorrect ? constant.SEVERITY_SUCCESS : constant.SEVERITY_ERROR,
      text: `${text} (${numberOfQuestions} Question${
        numberOfQuestions === 1 ? "" : "s"
      } Left)`
    })
  );
  dispatch(setTestNote());
};
