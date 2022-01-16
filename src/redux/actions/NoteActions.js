/** @module NoteActions */

import _ from "lodash";

import {
  ADD_ALL_NOTES,
  ADD_TEST_POOL,
  UPDATE_TEST_POOL_ITEM,
  CLEAR_COMPLETED_POOL,
  INCREMENT_COMPLETED_POOL
} from "../ActionTypes";

import {
  START_NOTE_BY_STRING,
  NOTE_PROGRESSION,
  NOTES_STAFF
} from "../../data/constants";

/**
 * @function addAllNotes
 * @description populates noteState.allNotes
 * @param {Array} allNotesArray
 */
export const addAllNotes = allNotesArray => ({
  type: ADD_ALL_NOTES,
  payload: allNotesArray
});

/**
 * @function addTestPool
 * @description populates noteState.testPool
 * @param {Array} testPoolArray
 */
export const addTestPool = testPoolArray => ({
  type: ADD_TEST_POOL,
  payload: testPoolArray
});

/**
 * @function updateTestPool
 * @description update specific noteObject in noteState.testPool
 * @param {Array} updatedTestPoolArray
 */
export const updateTestPool = updatedTestPoolArray => ({
  type: UPDATE_TEST_POOL_ITEM,
  payload: updatedTestPoolArray
});

/**
 * @function clearCompletedPool
 * @description resets/clears noteState.completedPool
 */
export const clearCompletedPool = () => ({
  type: CLEAR_COMPLETED_POOL
});

/**
 * @function incrementCompletedPool
 * @description adds noteObject to noteState.completedPool
 * @param {Object} noteObject
 */
export const incrementCompletedPool = noteObject => ({
  type: INCREMENT_COMPLETED_POOL,
  payload: noteObject
});

/**
 * @function updateNoteInTestPool
 * @description determins index of noteObject and removes from noteState.testPool
 * @param {Object} noteObject
 */
export const updateNoteInTestPool = noteObject => (dispatch, getState) => {
  const {
    noteState: { testPool }
  } = getState();

  const testPoolIdsArray = (testPool ?? []).map(note => note.id);
  const index = testPoolIdsArray.indexOf(noteObject?.id);

  const updatedTestPool = [...testPool];
  updatedTestPool[index] = noteObject;
  dispatch(updateTestPool(noteObject));
};

/**
 * @function removeNoteFromTestPool
 * @description removes item with index from noteState.testPool
 * @param {Number} index
 */
export const removeNoteFromTestPool = index => (dispatch, getState) => {
  const {
    noteState: { testPool }
  } = getState();

  const updatedTestPool = [...testPool];
  updatedTestPool.splice(index, 1);
  if (index !== -1) {
    return dispatch(updateTestPool(updatedTestPool));
  }
  return false;
};

/**
 * @function initializeAllNotes
 * @description dynamically generate guitar notes data
 */
export const initializeAllNotes = () => dispatch => {
  const staffAndLedgersArray = [];
  for (let i = 0; i <= 17; i += 1) {
    let ledgerLine = null;
    switch (true) {
      case i === 0:
        ledgerLine = -1;
        break;
      case i >= 12:
        ledgerLine = Math.floor(i / 2) - 5;
        break;
      default:
        ledgerLine = null;
    }
    staffAndLedgersArray.push({
      note: NOTES_STAFF?.[(i + 6) % 7],
      staffValue: i,
      ledgerLine
    });
  }

  const allNotesArray = [];
  START_NOTE_BY_STRING.forEach((string, idx) => {
    const stringIdx = idx + 1;
    const startNoteIdx = (NOTE_PROGRESSION ?? [])
      .map(note => note.note)
      .indexOf(string.toUpperCase());
    let numberOfFrets = 3;
    switch (idx) {
      case 0:
        numberOfFrets = 6;
        break;
      case 1:
      case 3:
      case 5:
        numberOfFrets = 4;
        break;
      default:
        numberOfFrets = 3;
    }
    for (let i = 0; i <= numberOfFrets; i += 1) {
      const noteObject = NOTE_PROGRESSION?.[(startNoteIdx + i) % 12];
      const noteName = `${noteObject?.note}${noteObject?.key?.symbol ?? ""}`;

      const staffAndLedgerChunk = (allNotesArray ?? []).filter(
        note => note.name === noteName
      ).length;
      const staffAndLedgerArrayChunk = staffAndLedgersArray.slice(
        staffAndLedgerChunk * 7,
        Math.min((staffAndLedgerChunk + 1) * 7, staffAndLedgersArray.length)
      );
      const staffAndLedgerObject = staffAndLedgerArrayChunk.find(
        note => note.note === noteObject.note
      );

      allNotesArray.push({
        id: `${noteName}-${stringIdx}`,
        name: noteName,
        modifier: `${stringIdx === 1 ? "high" : ""}`,
        guitarOnly: Boolean(stringIdx > 4),
        staffValue: staffAndLedgerObject.staffValue,
        ledgerLine: staffAndLedgerObject.ledgerLine ?? null,
        key: noteObject?.key?.text ?? null,
        stringValue: stringIdx,
        tabValue: i
      });
    }
  });

  dispatch(addAllNotes(_.sortBy(allNotesArray, "staffValue")));
};
