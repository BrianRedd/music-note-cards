/** @module SettingsModalContainer */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@mui/material";

import actions from "../../../redux/Actions";
import * as allTypes from "../../../types/appTypes";
import * as constant from "../../../data/constants";

import SettingsForm from "./SettingsForm";

const mapStateToProps = state => ({
  settingsState: state.settingsState,
  toggleState: state.toggleState
});

const mapDispatchToProps = {
  toggleToggle: actions.toggleToggle,
  updateSettings: actions.updateSettings,
  resetSettings: actions.resetSettings,
  setTestStatus: actions.setTestStatus
};

/**
 * @function SettingsModalContainer
 * @description Functional Presentational component for SettingsModalContainer
 * @returns {React.Component} - Rendered component.
 */
const SettingsModalContainer = props => {
  const {
    settingsState,
    toggleState,
    toggleToggle,
    updateSettings,
    setTestStatus,
    resetSettings
  } = props;

  /**
   * @description local state values for settings
   */
  const [theseSettings, setTheseSettings] = useState({
    ...settingsState?.settings,
    excludeSharp: (settingsState?.settings?.excludedKeys ?? []).includes(
      constant.KEY.SHARP.text
    ),
    excludeFlat: (settingsState?.settings?.excludedKeys ?? []).includes(
      constant.KEY.FLAT.text
    ),
    excludeNatural: (settingsState?.settings?.excludedKeys ?? []).includes(
      constant.KEY.NATURAL.text
    )
  });

  /**
   * @function updatedSettings
   * @description take form field update and apply to theseSettings
   * @param {String} field
   * @param {String} value
   */
  const updateSettingsInState = (field, value) => {
    const updatedSettings = { ...theseSettings };
    if (field.startsWith("exclude")) {
      const booField = field.substring(7).toLowerCase();
      const idx = updatedSettings.excludedKeys.indexOf(booField);
      if (idx === -1) {
        updatedSettings.excludedKeys.push(booField);
      } else {
        updatedSettings.excludedKeys.splice(idx, 1);
      }
    }
    updatedSettings[field] = value;
    setTheseSettings(updatedSettings);
  };

  return (
    <Modal
      data-test="modal-container-settings"
      isOpen={toggleState?.open?.includes("settings-modal")}
      size="xl"
      fullscreen="lg"
      centered
      backdrop={false}
      keyboard={false}
    >
      <ModalHeader>Musical Note Cards Settings</ModalHeader>
      <ModalBody>
        <SettingsForm
          settingsObject={theseSettings}
          updateSettingsInState={updateSettingsInState}
        />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <Button
          onClick={() => {
            setTestStatus(constant.GAME_STATUS_NEW);
            resetSettings();
            toggleToggle("settings-modal");
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (
              !_.isEqual(
                { ...settingsState.settings, ...theseSettings },
                settingsState?.settings
              )
            ) {
              setTestStatus(constant.GAME_STATUS_NEW);
            }
            updateSettings(theseSettings);
            setTestStatus(constant.GAME_STATUS_NEW);
            toggleToggle("settings-modal");
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
  toggleState: allTypes.toggleState.types,
  toggleToggle: PropTypes.func,
  updateSettings: PropTypes.func,
  setTestStatus: PropTypes.func,
  resetSettings: PropTypes.func
};

SettingsModalContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  toggleState: allTypes.toggleState.defaults,
  toggleToggle: () => {},
  updateSettings: () => {},
  setTestStatus: () => {},
  resetSettings: () => {}
};

export const SettingsModalContainerTest = SettingsModalContainer;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModalContainer);
