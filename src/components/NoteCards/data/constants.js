/** data.js */

export const POSITION_MARKERS_G = [
  "3-3",
  "5-3",
  "7-3",
  "9-3",
  "12-1",
  "12-5",
  "15-3"
];

export const POSITION_MARKERS_U = ["5-2", "7-2", "10-2", "12-2"];

export const INSTRUMENT = {
  guitar: {
    numberOfStrings: 6,
    positionMarkerArray: POSITION_MARKERS_G
  },
  ukelele: {
    numberOfStrings: 4,
    positionMarkerArray: POSITION_MARKERS_U
  }
};

export const NOTE_PROGRESSION = [
  "A", // 0
  "A#", // 1
  "B", // 2
  "C", // 3
  "C#", // 4
  "D", // 5
  "D#", // 6
  "E", // 7
  "F", // 8
  "F#", // 9
  "G", // 10
  "G#" // 11
];

export const START_NOTE_BY_STRING = {
  1: 7,
  2: 2,
  3: 10,
  4: 5,
  5: 0,
  6: 7
};
