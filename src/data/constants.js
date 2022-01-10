/** @module constants */

export const INSTRUMENT_GUITAR = "guitar";
export const INSTRUMENT_UKELELE = "ukelele";

export const KEY = {
  SHARP: {
    text: "sharp",
    symbol: "#"
  },
  NATURAL: {
    text: "natural",
    symbol: "+"
  },
  FLAT: {
    text: "sharp",
    symbol: "b"
  }
};

export const GAME_STATUS_NEW = "new";
export const GAME_STATUS_INPROGRESS = "in progress";

export const SEVERITY_INFO = "info";

export const OPTION_LIST = {
  instruments: ["guitar", "ukelele"],
  keys: ["", KEY?.SHARP?.text, "natural", KEY?.FLAT?.text],
  numberOfFrets: ["3_Three", "5_Five", "7_Seven"],
  gameStatuses: [GAME_STATUS_NEW, GAME_STATUS_INPROGRESS, "completed"],
  severities: [SEVERITY_INFO, "error", "warning", "success"]
};

export const NOTE_PROGRESSION = [
  {
    note: "A"
  },
  {
    note: "A",
    key: KEY.SHARP,
    altNote: "B",
    altKey: KEY.FLAT
  },
  {
    note: "B"
  },
  {
    note: "C"
  },
  {
    note: "C",
    key: KEY.SHARP,
    altNote: "D",
    altKey: KEY.FLAT
  },
  {
    note: "D"
  },
  {
    note: "D",
    key: KEY.SHARP,
    altNote: "E",
    altKey: KEY.FLAT
  },
  {
    note: "E"
  },
  {
    note: "F"
  },
  {
    note: "F",
    key: KEY.SHARP,
    altNote: "G",
    altKey: KEY.FLAT
  },
  {
    note: "G"
  },
  {
    note: "G",
    key: KEY.SHARP,
    altNote: "A",
    altKey: KEY.FLAT
  }
];

export const START_NOTE_BY_STRING = ["e", "B", "G", "D", "A", "E"];

export const NOTES_STAFF = ["G", "F", "E", "D", "C", "B", "A"];
