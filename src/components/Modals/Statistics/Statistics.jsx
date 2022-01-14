/** @module Statistics */

import React from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";

import * as constant from "../../../data/constants";
import * as allTypes from "../../../types/appTypes";

/**
 * @function Statistics
 * @description Functional Presentational component for Statistics
 * @returns {React.Component} - Rendered component.
 */
const Statistics = props => {
  const { noteState } = props;

  const stats = {
    numberCorrect: (noteState?.completedPool ?? []).filter(
      note => note.lastAttemptStatus === constant.TEST_NOTE_STATUS_CORRECT
    ).length,
    numberWrong:
      _.sum(
        (noteState?.testPool ?? []).map(
          note => (note.wrongGuesses ?? []).length
        )
      ) +
      _.sum(
        (noteState?.completedPool ?? []).map(
          note => (note.wrongGuesses ?? []).length
        )
      ),
    numberOfTestQuestions: (noteState?.completedPool ?? []).length,
    totalGuesses: _.sumBy(noteState?.completedPool ?? [], "numberOfAttempts")
  };

  return (
    <Row data-test="statistics-modal">
      <Col xs={4}>
        <div>
          Total Test Items: {stats.numberOfTestQuestions}
          <br />
          Total Guesses: {stats.totalGuesses}
          <br />
          Number of Correct Guesses: {stats.numberCorrect}
          <br />
          Number of Wrong Guesses: {stats.numberWrong}
          <br />
          Percentage Correct:{" "}
          {Math.round((stats.numberCorrect / stats.totalGuesses) * 1000) / 10}%
        </div>
      </Col>
    </Row>
  );
};

Statistics.propTypes = {
  noteState: allTypes.noteState.types
};

Statistics.defaultProps = {
  noteState: allTypes.noteState.types
};

export default Statistics;
