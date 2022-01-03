/** @module MainContainer */

import React from "react";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = () => (
  <div data-test="container-main">
    <NoteCardsContainer />
  </div>
);

export default MainContainer;
