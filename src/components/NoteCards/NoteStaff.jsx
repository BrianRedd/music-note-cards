/** @module NoteStaff */

import React from "react";
import PropTypes from "prop-types";

/**
 * @function NoteStaff
 * @description Functional Presentational component for NoteStaff
 * @returns {React.Component} - Rendered component.
 */
const NoteStaff = props => {
  const { data } = props;

  return (
    <div data-test="container-note-cards">
      <div>{JSON.stringify(props, null, 2)}</div>
      <div>Data: {data}</div>
    </div>
  );
};

NoteStaff.propTypes = {
  data: PropTypes.string
};

NoteStaff.defaultProps = {
  data: "Hello World"
};

export default NoteStaff;
