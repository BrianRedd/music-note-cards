/** @module MainContainer */

import React from "react";
import PropTypes from "prop-types";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = props => {
  const { data } = props;

  return (
    <div data-test="container-main">
      <NoteCardsContainer data={data} />
    </div>
  );
};

MainContainer.propTypes = {
  data: PropTypes.string
};

MainContainer.defaultProps = {
  data: "This Data is not from Props"
};

export default MainContainer;
