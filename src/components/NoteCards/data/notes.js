/** @module notes.js */

const availableNotes = [
  {
    id: "A-0",
    name: "A",
    staffValue: 0,
    guitarOnly: false,
    ledgerLine: -1,
    key: null,
    tabValue: "4-1"
  },
  {
    id: "G-1",
    name: "G",
    staffValue: 1,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "3-1"
  },
  {
    id: "F-1",
    name: "F",
    staffValue: 2,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "1-1"
  },
  {
    id: "E-1",
    name: "E",
    staffValue: 3,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "0-1"
  },
  {
    id: "D-1",
    name: "D",
    staffValue: 4,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "3-2"
  },
  {
    id: "C-1",
    name: "C",
    staffValue: 5,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "1-2"
  },
  {
    id: "B-1",
    name: "B",
    staffValue: 6,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "0-2"
  },
  {
    id: "A-1",
    name: "A",
    staffValue: 7,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "2-3"
  },
  {
    id: "G-2",
    name: "G",
    staffValue: 8,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "0-3"
  },
  {
    id: "F-2",
    name: "F",
    staffValue: 9,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "3-4"
  },
  {
    id: "E-2",
    name: "E",
    staffValue: 10,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "2-4"
  },
  {
    id: "D-2",
    name: "D",
    staffValue: 11,
    guitarOnly: false,
    ledgerLine: null,
    key: null,
    tabValue: "0-4"
  },
  {
    id: "C-2",
    name: "C",
    staffValue: 12,
    guitarOnly: true,
    ledgerLine: 1,
    key: null,
    tabValue: "3-5"
  },
  {
    id: "B-2",
    name: "B",
    staffValue: 13,
    guitarOnly: true,
    ledgerLine: 1,
    key: null,
    tabValue: "2-5"
  },
  {
    id: "A-2",
    name: "A",
    staffValue: 14,
    guitarOnly: true,
    ledgerLine: 2,
    key: null,
    tabValue: "0-5"
  },
  {
    id: "G-3",
    name: "G",
    staffValue: 15,
    guitarOnly: true,
    ledgerLine: 2,
    key: null,
    tabValue: "3-6"
  },
  {
    id: "F-3",
    name: "F",
    staffValue: 16,
    guitarOnly: true,
    ledgerLine: 3,
    key: null,
    tabValue: "1-6"
  },
  {
    id: "E-3",
    name: "E",
    staffValue: 17,
    guitarOnly: true,
    ledgerLine: 3,
    key: null,
    tabValue: "0-6"
  },
  {
    id: "A#-0",
    name: "A#",
    staffValue: 0,
    guitarOnly: false,
    ledgerLine: -1,
    key: "sharp",
    tabValue: "5-1"
  },
  {
    id: "F#-1",
    name: "F#",
    staffValue: 2,
    guitarOnly: false,
    ledgerLine: null,
    key: "sharp",
    tabValue: "2-1"
  },
  {
    id: "C#-1",
    name: "C#",
    staffValue: 5,
    guitarOnly: false,
    ledgerLine: null,
    key: "sharp",
    tabValue: "2-2"
  },
  {
    id: "A#-1",
    name: "A#",
    staffValue: 7,
    guitarOnly: false,
    ledgerLine: null,
    key: "sharp",
    tabValue: "3-3"
  },
  {
    id: "F#-2",
    name: "F#",
    staffValue: 9,
    guitarOnly: false,
    ledgerLine: null,
    key: "sharp",
    tabValue: "4-4"
  },
  {
    id: "C#-2",
    name: "C#",
    staffValue: 12,
    guitarOnly: true,
    ledgerLine: 1,
    key: "sharp",
    tabValue: "4-5"
  },
  {
    id: "A#-2",
    name: "A#",
    staffValue: 14,
    guitarOnly: true,
    ledgerLine: 2,
    key: "sharp",
    tabValue: "1-5"
  },
  {
    id: "F#-3",
    name: "F#",
    staffValue: 16,
    guitarOnly: true,
    ledgerLine: 3,
    key: "sharp",
    tabValue: "2-6"
  }
];

export default availableNotes;
