/** @module SettingsModalContainer */

import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@mui/material";

import * as allTypes from "../../../types/appTypes";
import * as constant from "../../../data/constants";

import SettingsForm from "./SettingsForm";

/**
 * @function SettingsModalContainer
 * @description Functional Presentational component for SettingsModalContainer
 * @returns {React.Component} - Rendered component.
 */
const SettingsModalContainer = props => {
  const {
    settingsState,
    toggleSettingsModal,
    updateSettings,
    setTestStatus,
    resetSettings
  } = props;

  /**
   * @description local state values for settings
   */
  const [instrument, setInstrument] = useState(
    settingsState?.settings?.instrument
  );
  const [numberOfFrets, setNumberOfFrets] = useState(
    settingsState?.settings?.numberOfFrets
  );
  const [excludeSharps, setExcludeSharps] = useState(
    (settingsState?.settings?.excludedKeys ?? []).includes(
      constant.KEY.SHARP.text
    )
  );

  const updateSettingsInState = (field, value) => {
    switch (field) {
      case "instrument":
        setInstrument(value);
        break;
      case "numberOfFrets":
        setNumberOfFrets(value);
        break;
      case "excludeSharps":
        setExcludeSharps(value);
        break;
      default:
    }
  };

  return (
    <Modal
      data-test="modal-container-settings"
      isOpen={settingsState?.isModalOpen}
      toggle={toggleSettingsModal}
      size="xl"
      centered
    >
      <ModalHeader toggle={toggleSettingsModal}>
        Musical Note Cards Settings
      </ModalHeader>
      <ModalBody>
        <SettingsForm
          settingsObject={{
            instrument,
            numberOfFrets,
            excludeSharps
          }}
          updateSettingsInState={updateSettingsInState}
        />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <Button
          onClick={() => {
            setTestStatus(constant.GAME_STATUS_NEW);
            resetSettings();
            toggleSettingsModal();
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            const excludedKeys = [];
            if (excludeSharps) excludedKeys.push(constant.KEY.SHARP.text);
            const updatedSettings = {
              instrument,
              numberOfFrets,
              excludedKeys
            };
            if (
              !_.isEqual(
                { ...settingsState.settings, ...updatedSettings },
                settingsState?.settings
              )
            ) {
              setTestStatus(constant.GAME_STATUS_NEW);
            }
            updateSettings(updatedSettings);
            toggleSettingsModal();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

SettingsModalContainer.propTypes = {
  settingsState: allTypes.settingsState.types,
  toggleSettingsModal: PropTypes.func,
  updateSettings: PropTypes.func,
  setTestStatus: PropTypes.func,
  resetSettings: PropTypes.func
};

SettingsModalContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  toggleSettingsModal: () => {},
  updateSettings: () => {},
  setTestStatus: () => {},
  resetSettings: () => {}
};

export default SettingsModalContainer;
