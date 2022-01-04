/** @module NoteCardsContainer */

import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";

import * as allTypes from "../../types/appTypes";
import * as constant from "./data/constants";
import availableNotes from "./data/notes";

import "./styles/notecardscontainer.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = props => {
  const { settings } = props;

  const [pressedValue, setPressedValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [randomNote, setRandomNote] = useState({});
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [numberWrong, setNumberWrong] = useState(0);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertText, setAlertText] = useState("Begin!");

  useEffect(() => {
    if (!notes.length) {
      // TODO: create noteArray based on settings
      let filteredNotes = [...availableNotes];
      if (settings.instrument === "ukelele") {
        filteredNotes = filteredNotes.filter(note => !note.guitarOnly);
      }
      setNotes(filteredNotes);
    }
  }, [notes, settings]);

  const randomizeNextNote = useCallback(() => {
    const newNote = notes[Math.floor(Math.random() * notes.length)];
    if (selectedNotes.includes(newNote.id)) {
      randomizeNextNote();
    }
    setRandomNote(notes[Math.floor(Math.random() * notes.length)]);
  }, [notes, selectedNotes]);

  useEffect(() => {
    if (notes.length && _.isEmpty(randomNote)) {
      randomizeNextNote();
    }
  }, [notes, randomNote, randomizeNextNote]);

  const updateSelectedNotes = noteObject => {
    // TODO: redo?
    if (selectedNotes.length + 1 === notes.length) {
      // eslint-disable-next-line no-console
      console.log("DONE!");
      setAlertSeverity("warning");
      setAlertText("This Batch Complete!");
      setSelectedNotes({});
    } else if (!notes.includes(noteObject.id)) {
      setSelectedNotes([...selectedNotes, noteObject.id]);
    }
  };

  const pressButton = value => {
    setPressedValue(value);
    const isCorrect = randomNote?.tabValue === value;
    if (isCorrect) {
      updateSelectedNotes(randomNote);
      setNumberCorrect(numberCorrect + 1);
      setAlertSeverity("success");
      setAlertText(`${randomNote.name} is Correct!`);
    } else {
      setNumberWrong(numberWrong + 1);
      setAlertSeverity("error");
      setAlertText(
        `${
          constant.NOTE_PROGRESSION[
            (constant.START_NOTE_BY_STRING[value.split("-")[1]] +
              Number(value.split("-")[0])) %
              12
          ]
        } is Incorrect! Should Be ${randomNote.name}`
      );
    }
    randomizeNextNote();
  };

  return (
    <Row data-test="container-note-cards" className="note-cards-container gx-0">
      <Col xs={4}>
        {!_.isEmpty(randomNote) && (
          <NoteStaff
            pressedValue={pressedValue}
            randomNote={randomNote}
            stats={{
              numberCorrect,
              numberWrong,
              numberRemaining: notes.length - selectedNotes.length
            }}
          />
        )}
      </Col>
      <Col xs={8}>
        <FretBoard
          settings={settings}
          pressButton={pressButton}
          alert={{
            severity: alertSeverity,
            text: alertText
          }}
        />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  settings: allTypes.settings.types
};

NoteCardsContainer.defaultProps = {
  settings: allTypes.settings.defaults
};

export default NoteCardsContainer;
