/** @module NoteActions */

import {
  ADD_ALL_NOTES,
  ADD_TEST_POOL,
  UPDATE_TEST_POOL_ITEM,
  DECREMENT_TEST_POOL,
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
 * @function decrementTestPool
 * @description removes entry with index from noteState.testPool
 * @param {Object} noteObject
 */
export const decrementTestPool = index => ({
  type: DECREMENT_TEST_POOL,
  payload: index
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
 * @description determines index of noteObject and removes from noteState.testPool
 * @param {Object} noteObject
 */
export const removeNoteFromTestPool = noteObject => (dispatch, getState) => {
  const {
    noteState: { testPool }
  } = getState();

  const testPoolIdsArray = (testPool ?? []).map(note => note.id);
  const index = testPoolIdsArray.indexOf(noteObject?.id);

  if (index !== -1) {
    return dispatch(decrementTestPool({ index, noteObject }));
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
    const numberOfFrets = idx === 0 ? 6 : 3;
    for (let i = 0; i <= numberOfFrets; i += 1) {
      const noteObject = NOTE_PROGRESSION?.[(startNoteIdx + i) % 12];
      const noteName = `${noteObject?.note}${noteObject?.key?.symbol ?? ""}`;

      const staffAndLedgerChunk = (allNotesArray ?? []).filter(
        note => note.name === noteName
      ).length;
      const staffAndLedgerArrayChunk = staffAndLedgersArray.slice(
        staffAndLedgerChunk * 7,
        (staffAndLedgerChunk + 1) * 7
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
  dispatch(addAllNotes(allNotesArray));
};
