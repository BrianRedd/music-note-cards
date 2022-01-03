/** @module NoteCardsContainer */

import React from "react";
import { Row, Col } from "reactstrap";

import * as allTypes from "./types/appTypes";

import "./styles/notecards.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = () => {
  const settings = {
    ...allTypes.settings.defaults,
    // instrument: "ukelele",
    numberOfFrets: 7
  };
  return (
    <Row data-test="container-note-cards" className="note-cards-container">
      <Col xs={4}>
        <NoteStaff />
      </Col>
      <Col xs={8}>
        <FretBoard settings={settings} />
      </Col>
    </Row>
  );
};

export default NoteCardsContainer;
