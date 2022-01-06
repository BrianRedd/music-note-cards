/** @module appTypes.js */

import { oneOf, shape, number, string, bool, arrayOf } from "prop-types";

export const instrumentOptions = ["guitar", "ukelele"];

export const settings = {
  types: shape({
    instrument: oneOf(instrumentOptions),
    numberOfFrets: number,
    excludedKeys: arrayOf(string)
  }),
  defaults: {
    instrument: instrumentOptions[1],
    numberOfFrets: 3,
    excludedKeys: ["sharp"]
  }
};

/*
NOTE STATE
----------*/

export const note = {
  types: shape({
    id: string,
    name: string,
    staffValue: number,
    guitarOnly: bool,
    ledgerLine: number,
    key: oneOf(["", "sharp", "natural", "flat"]),
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

/**
 * @const noteState
 * @description Types for noteState Redux store
 */
export const noteState = {
  types: shape({
    allNotes: arrayOf(note),
    activeNotes: arrayOf(note),
    completedNotes: arrayOf(note)
  }),
  defaults: {
    allNotes: [],
    activeNotes: [],
    completedNotes: []
  }
};
