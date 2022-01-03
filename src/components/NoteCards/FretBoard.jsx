/** @module FretBoard */

import React from "react";
import PropTypes from "prop-types";

/**
 * @function FretBoard
 * @description Functional Presentational component for FretBoard
 * @returns {React.Component} - Rendered component.
 */
const FretBoard = props => {
  const { data } = props;

  return (
    <div data-test="container-note-cards">
      <div>{JSON.stringify(props, null, 2)}</div>
      <div>Data: {data}</div>
    </div>
  );
};

FretBoard.propTypes = {
  data: PropTypes.string
};

FretBoard.defaultProps = {
  data: "Hello World"
};

export default FretBoard;
