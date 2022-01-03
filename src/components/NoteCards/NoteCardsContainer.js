/** @module NoteCardsContainer */

import React from "react";
import { Row, Col } from "reactstrap";

import "./styles/notecards.scss";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = () => (
  <Row data-test="container-note-cards" className="note-cards-container">
    <Col xs={4}>
      <NoteStaff />
    </Col>
    <Col xs={8}>
      <FretBoard />
    </Col>
  </Row>
);

export default NoteCardsContainer;
