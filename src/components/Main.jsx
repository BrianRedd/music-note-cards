/** @module Main */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import actions from "../redux/Actions";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";
import SettingsModalContainer from "./Modals/Settings/SettingsModalContainer";
import StatisticsModalContainer from "./Modals/Statistics/StatisticsModalContainer";

/**
 * @function Main
 * @description Functional Presentational component for Main
 * @returns {React.Component} - Rendered component.
 */
const Main = () => {
  const noteState = useSelector(state => state.noteState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isEmpty(noteState?.allNotes)) {
      dispatch(actions.initializeAllNotes());
    }
  });

  return (
    <div data-test="presentation-main">
      <NoteCardsContainer />
      <SettingsModalContainer />
      <StatisticsModalContainer />
    </div>
  );
};

export default Main;
