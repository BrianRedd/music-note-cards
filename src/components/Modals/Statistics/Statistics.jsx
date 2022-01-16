/** @module Statistics */

import React from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";

import * as constant from "../../../data/constants";
import * as allTypes from "../../../types/appTypes";

import "./styles/statistics.scss";

/**
 * @function StatLine
 * @description statistics line component
 * @param {Object} lineProps
 * @param {String} lineProps.title
 * @param {String} lineProps.className
 * @param {Node} lineProps.children
 * @returns {React.Component}
 */
const StatLine = lineProps => {
  const { title, children, className } = lineProps;
  return (
    <div className={`statistic-line ${className ?? ""}`}>
      <span className="label">{title}:</span>
      <span>{children}</span>
    </div>
  );
};

/**
 * @function Statistics
 * @description Functional Presentational component for Statistics
 * @returns {React.Component} - Rendered component.
 */
const Statistics = props => {
  const { noteState } = props;

  const WrongAnswers = () => {
    const wrongAnswerArray = _.sortBy(
      (noteState?.completedPool ?? [])
        .filter(note => (note.wrongGuesses ?? []).length > 0)
        .map(note => ({
          id: note.id,
          name: note.name,
          noWrongAttempts: (note.wrongGuesses ?? 0).length,
          wrongAnswers: _.compact(
            (note.wrongGuesses ?? []).map(
              guess =>
                (noteState?.allNotes ?? []).find(
                  guessedNote =>
                    guess ===
                    `${guessedNote.stringValue}-${guessedNote.tabValue}`
                )?.name
            )
          )
        })),
      "id"
    );
    const wrongAnswers = wrongAnswerArray.map(answer => (
      <div key={answer.id}>
        <span className="note-name">{answer.name}: </span>
        <span className="note-attempts">
          {answer.noWrongAttempts} attempt
          {answer.noWrongAttempts !== 1 && "s"}
        </span>
        <span className="note-answers">({answer.wrongAnswers.join(", ")})</span>
      </div>
    ));
    return wrongAnswers;
  };

  const numberCorrect = (noteState?.completedPool ?? []).filter(
    note => note.lastAttemptStatus === constant.TEST_NOTE_STATUS_CORRECT
  ).length;
  const totalGuesses = _.sumBy(
    noteState?.completedPool ?? [],
    "numberOfAttempts"
  );
  const stats = {
    numberCorrect,
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
    totalGuesses,
    percentageCorrect: Math.round((numberCorrect / totalGuesses) * 1000) / 10
  };

  return (
    <Row data-test="statistics-modal">
      <Col xs={4}>
        <StatLine title="Total Test Items">
          {stats.numberOfTestQuestions}
        </StatLine>
        <StatLine title="Total Guesses">{stats.totalGuesses}</StatLine>
        <StatLine title="Number of Correct Guesses" className="color-green">
          {stats.numberCorrect}
        </StatLine>
        <StatLine title="Number of Wrong Guesses" className="color-red">
          {stats.numberWrong}
        </StatLine>
        <StatLine
          title="Percentage Correct"
          className={stats.percentageCorrect < 75 ? "color-red" : "color-green"}
        >
          {stats.percentageCorrect}%
        </StatLine>
      </Col>
      <Col
        xs={8}
        className="wrong-answers"
        style={{ columnCount: Math.min(Math.ceil(stats.numberWrong / 9), 3) }}
      >
        <div className="label">Wrong Answers</div>
        <WrongAnswers />
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
