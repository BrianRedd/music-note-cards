/** @module MainContainer */

import React, { useState } from "react";

import * as allTypes from "../types/appTypes";

import NoteCardsContainer from "./NoteCards/NoteCardsContainer";
import SettingsDialogContainer from "./Modals/Settings/SettingsDialogContainer";

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(true);
  const [settings, setSettings] = useState(allTypes.settings.defaults);
  const [testComplete, setTestComplete] = useState(false);

  return (
    <div data-test="container-main">
      <NoteCardsContainer
        settings={settings}
        setSettingsOpen={setSettingsOpen}
        testComplete={testComplete}
        setTestComplete={setTestComplete}
      />
      <SettingsDialogContainer
        isSettingsOpen={isSettingsOpen}
        setSettingsOpen={setSettingsOpen}
        settings={settings}
        setSettings={setSettings}
        setTestComplete={setTestComplete}
      />
    </div>
  );
};

export default MainContainer;
