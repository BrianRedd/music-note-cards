/** @module NoteCardsContainer */

import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import NoteStaff from "./NoteStaff";
import FretBoard from "./FretBoard";

/**
 * @function NoteCardsContainer
 * @description Functional Presentational component for NoteCardsContainer
 * @returns {React.Component} - Rendered component.
 */
const NoteCardsContainer = props => {
  const { data } = props;

  return (
    <Row data-test="container-note-cards">
      <Col xs={4}>
        <NoteStaff data={data} />
      </Col>
      <Col xs={8}>
        <FretBoard data={data} />
      </Col>
    </Row>
  );
};

NoteCardsContainer.propTypes = {
  data: PropTypes.string
};

NoteCardsContainer.defaultProps = {
  data: "Hello World"
};

export default NoteCardsContainer;
