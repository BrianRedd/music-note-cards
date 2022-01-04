/** @module MainContainer */

import React from "react";

import * as allTypes from "../types/appTypes";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = () => {
  const settings = {
    ...allTypes.settings.defaults,
    // instrument: "ukelele",
    numberOfFrets: 7
  };
  return (
    <div data-test="container-main">
      <NoteCardsContainer settings={settings} />
    </div>
  );
};

export default MainContainer;
