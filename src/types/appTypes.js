/** @module appTypes.js */

import { oneOf, shape, number } from "prop-types";

export const instrumentOptions = ["guitar", "ukelele"];

export const settings = {
  types: shape({
    instrument: oneOf(instrumentOptions),
    numberOfFrets: number
  }),
  defaults: {
    instrument: instrumentOptions[0],
    numberOfFrets: 7
  }
};
