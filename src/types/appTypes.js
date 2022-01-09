/** @module appTypes.js */

import { oneOf, shape, number, string, bool, arrayOf } from "prop-types";

import { optionList } from "../data/constants";

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
    key: oneOf(optionList.keys),
    tabValue: string
  }),
  defaults: {
    id: "",
    name: "",
    staffValue: null,
    guitarOnly: false,
    ledgerLine: null,
    key: "",
    tabValue: ""
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
    testStatus: oneOf(optionList.gameStatuses),
    currentTestNote: note.types,
    message: shape({
      severity: oneOf(optionList.severities),
      text: string
    })
  }),
  defaults: {
    testStatus: optionList.gameStatuses[0],
    currentTestNote: note.defaults,
    message: {
      severity: optionList.severities[0],
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
    instrument: oneOf(optionList.instruments),
    numberOfFrets: number,
    excludedKeys: arrayOf(oneOf(optionList.keys))
  }),
  defaults: {
    instrument: optionList.instruments[1],
    numberOfFrets: 3,
    excludedKeys: ["sharp"]
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
