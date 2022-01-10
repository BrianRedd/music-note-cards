/** @module appTypes.js */

import { oneOf, shape, number, string, bool, arrayOf } from "prop-types";

import { OPTION_LIST } from "../data/constants";

/**
 * @const noteState
 * @description Types for noteState Redux store
 */

export const note = {
  types: shape({
    id: string,
    name: string,
    staffValue: number,
    guitarOnly: bool,
    ledgerLine: number,
    key: oneOf(OPTION_LIST.keys),
    stringValue: number,
    tabValue: number
  }),
  defaults: {
    id: "",
    name: "",
    staffValue: null,
    guitarOnly: false,
    ledgerLine: null,
    key: "",
    stringValue: null,
    tabValue: null
  }
};
export const noteState = {
  types: shape({
    allNotes: arrayOf(note.types),
    testPool: arrayOf(note.types),
    completedPool: arrayOf(note.types)
  }),
  defaults: {
    allNotes: [],
    testPool: [],
    completedPool: []
  }
};

/**
 * @const gameState
 * @description Types for gameState Redux store
 */
export const gameState = {
  types: shape({
    testStatus: oneOf(OPTION_LIST.gameStatuses),
    currentTestNote: note.types,
    message: shape({
      severity: oneOf(OPTION_LIST.severities),
      text: string
    })
  }),
  defaults: {
    testStatus: OPTION_LIST.gameStatuses[0],
    currentTestNote: note.defaults,
    message: {
      severity: OPTION_LIST.severities[0],
      text: "New Game"
    }
  }
};

/**
 * @const settingsState
 * @description Types for settingsState Redux store
 */

export const settings = {
  types: shape({
    instrument: oneOf(OPTION_LIST.instruments),
    numberOfFrets: number,
    excludedKeys: arrayOf(oneOf(OPTION_LIST.keys))
  }),
  defaults: {
    instrument: OPTION_LIST.instruments[0],
    numberOfFrets: 7,
    excludedKeys: []
  }
};
export const settingsState = {
  types: shape({
    settings: settings.types,
    isModalOpen: bool
  }),
  defaults: {
    settings: settings.defaults,
    isModalOpen: true
  }
};
