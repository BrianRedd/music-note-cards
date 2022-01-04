/** @module NoteStaff */

import React from "react";
import PropTypes from "prop-types";

/**
 * @function NoteStaff
 * @description Functional Presentational component for NoteStaff
 * @returns {React.Component} - Rendered component.
 */
const NoteStaff = props => {
  const { pressedValue } = props;
  return (
    <div data-test="container-note-cards">
      <div>{pressedValue}</div>
    </div>
  );
};

NoteStaff.propTypes = {
  pressedValue: PropTypes.string
};

NoteStaff.defaultProps = {
  pressedValue: ""
};

export default NoteStaff;
