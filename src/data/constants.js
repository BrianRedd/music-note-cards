/** @module constants */

export const INSTRUMENT_GUITAR = "guitar";
export const INSTRUMENT_UKELELE = "ukelele";

export const KEY_SHARP = "sharp";

export const GAME_STATUS_NEW = "new";

export const SEVERITY_INFO = "info";

export const optionList = {
  instruments: ["guitar", "ukelele"],
  keys: ["", KEY_SHARP, "natural", "flat"],
  numberOfFrets: ["3_Three", "5_Five", "7_Seven"],
  gameStatuses: [GAME_STATUS_NEW, "in progress", "completed"],
  severities: [SEVERITY_INFO, "error", "warning", "success"]
};
