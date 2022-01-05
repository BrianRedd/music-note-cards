/** @module appTypes.js */

import { oneOf, shape, number, string, bool, arrayOf } from "prop-types";

export const instrumentOptions = ["guitar", "ukelele"];

export const settings = {
  types: shape({
    instrument: oneOf(instrumentOptions),
    numberOfFrets: number,
    excludeSharps: arrayOf(string)
  }),
  defaults: {
    instrument: instrumentOptions[0],
    numberOfFrets: 7,
    excludeSharps: []
  }
};

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
