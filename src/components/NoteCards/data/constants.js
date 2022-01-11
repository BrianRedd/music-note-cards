/** data.js */

export const POSITION_MARKERS_G = [
  "3-3",
  "3-5",
  "3-7",
  "9-3-9",
  "1-12",
  "5-12",
  "3-15"
];

export const POSITION_MARKERS_U = ["2-5", "2-7", "2-10", "2-12"];

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
