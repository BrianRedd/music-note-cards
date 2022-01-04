/** @module NoteCardsContainer */

import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import * as allTypes from "../../types/appTypes";

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

  const pressButton = value => {
    setPressedValue(value);
  };

  return (
    <Row data-test="container-note-cards" className="note-cards-container">
      <Col xs={4}>
        <NoteStaff pressedValue={pressedValue} />
      </Col>
      <Col xs={8}>
        <FretBoard settings={settings} pressButton={pressButton} />
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
