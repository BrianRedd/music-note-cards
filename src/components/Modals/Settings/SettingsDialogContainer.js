/** @module SettingsDialogContainer */

import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Row, Col } from "reactstrap";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Switch
} from "@mui/material";

import * as allTypes from "../../../types/appTypes";
import * as constant from "../../../data/constants";

/**
 * @function SettingsDialogContainer
 * @description Functional Presentational component for SettingsDialogContainer
 * @returns {React.Component} - Rendered component.
 */
const SettingsDialogContainer = props => {
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
  return (
    <Dialog
      open={settingsState?.isModalOpen}
      onClose={toggleSettingsModal}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        Musical Note Cards Settings
      </DialogTitle>
      <DialogContent>
        <Row>
          <Col xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Instrument</FormLabel>
              <RadioGroup
                aria-label="instrument"
                name="controlled-radio-buttons-group"
                value={instrument}
                onChange={event => {
                  setInstrument(event.target.value);
                }}
              >
                <FormControlLabel
                  value={constant.INSTRUMENT_GUITAR}
                  control={<Radio />}
                  label="Guitar"
                />
                <FormControlLabel
                  value={constant.INSTRUMENT_UKELELE}
                  control={<Radio />}
                  label="Baritone Ukelele"
                />
              </RadioGroup>
            </FormControl>
          </Col>
          <Col xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Number of Frets</FormLabel>
              <Select
                value={numberOfFrets}
                onChange={event => {
                  setNumberOfFrets(event.target.value);
                }}
              >
                {(constant.OPTION_LIST.numberOfFrets ?? []).map(option => (
                  <MenuItem key={option} value={Number(option.split("_")[0])}>
                    {option.split("_")[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Keys</FormLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={excludeSharps}
                    onChange={event => {
                      setExcludeSharps(event.target.checked);
                    }}
                  />
                }
                label="Exclude Sharps"
              />
            </FormControl>
          </Col>
        </Row>
      </DialogContent>
      <DialogActions className="d-flex justify-content-between">
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
      </DialogActions>
    </Dialog>
  );
};

SettingsDialogContainer.propTypes = {
  settingsState: allTypes.settingsState.types,
  toggleSettingsModal: PropTypes.func,
  updateSettings: PropTypes.func,
  setTestStatus: PropTypes.func,
  resetSettings: PropTypes.func
};

SettingsDialogContainer.defaultProps = {
  settingsState: allTypes.settingsState.defaults,
  toggleSettingsModal: () => {},
  updateSettings: () => {},
  setTestStatus: () => {},
  resetSettings: () => {}
};

export default SettingsDialogContainer;
