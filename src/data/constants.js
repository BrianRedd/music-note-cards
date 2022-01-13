/** @module constants */

export const INSTRUMENT_GUITAR = "guitar";
export const INSTRUMENT_UKELELE = "ukelele";

export const KEY = {
  SHARP: {
    text: "sharp",
    symbol: "#",
    symbolCode: "&#9839;"
  },
  NATURAL: {
    text: "natural",
    symbol: "+",
    symbolCode: "&#9838;"
  },
  FLAT: {
    text: "flat",
    symbol: "b",
    symbolCode: ">&#9837;"
  }
};

export const GAME_STATUS_NEW = "new";
export const GAME_STATUS_INPROGRESS = "in progress";
export const GAME_STATUS_COMPLETED = "completed";

export const TEST_NOTE_STATUS_UNTESTED = "untested";
export const TEST_NOTE_STATUS_CORRECT = "correct";
export const TEST_NOTE_STATUS_INCORRECT = "incorrect";

export const SEVERITY_INFO = "info";
export const SEVERITY_ERROR = "error";
export const SEVERITY_WARNING = "warning";
export const SEVERITY_SUCCESS = "success";

export const GAME_MESSAGE_NEW = "New Game!";
export const GAME_MESSAGE_GOOD_LUCK = "Good Luck!";
export const GAME_MESSAGE_GAME_OVER = "Game Over!";

export const OPTION_LIST = {
  instruments: [INSTRUMENT_GUITAR, INSTRUMENT_UKELELE],
  keys: ["", KEY?.SHARP?.text, KEY?.NATURAL?.text, KEY?.FLAT?.text],
  numberOfFrets: ["3_Three", "5_Five", "7_Seven"],
  gameStatuses: [
    GAME_STATUS_NEW,
    GAME_STATUS_INPROGRESS,
    GAME_STATUS_COMPLETED
  ],
  severities: [
    SEVERITY_INFO,
    SEVERITY_ERROR,
    SEVERITY_WARNING,
    SEVERITY_SUCCESS
  ]
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
