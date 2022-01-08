/** @module appTypes.js */

import { oneOf, shape, number, string, bool, arrayOf } from "prop-types";

export const optionList = {
  instruments: ["guitar", "ukelele"],
  keys: ["", "sharp", "natural", "flat"]
};

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
    testStatus: string,
    currentTestNote: note.types,
    message: shape({
      severity: string,
      text: string
    })
  }),
  defaults: {
    testStatus: "new",
    currentTestNote: note.defaults,
    message: {
      severity: "info",
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
    excludedKeys: arrayOf(string)
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
