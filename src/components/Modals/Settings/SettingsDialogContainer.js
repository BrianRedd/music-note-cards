/** @module SettingsDialogContainer */

import React, { useState } from "react";
import PropTypes from "prop-types";
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

/**
 * @function SettingsDialogContainer
 * @description Functional Presentational component for SettingsDialogContainer
 * @returns {React.Component} - Rendered component.
 */
const SettingsDialogContainer = props => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    settings,
    setSettings,
    setTestComplete
  } = props;

  const [instrument, setInstrument] = useState(settings?.instrument);
  const [numberOfFrets, setNumberOfFrets] = useState(settings?.numberOfFrets);
  const [excludeSharps, setExcludeSharps] = useState(
    (settings?.excludedKeys ?? []).includes("sharp")
  );

  return (
    <Dialog
      open={isSettingsOpen}
      onClose={() => setSettingsOpen(!isSettingsOpen)}
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
                  value="guitar"
                  control={<Radio />}
                  label="Guitar"
                />
                <FormControlLabel
                  value="ukelele"
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
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={5}>Five</MenuItem>
                <MenuItem value={7}>Seven</MenuItem>
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
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            const excludedKeys = [];
            if (excludeSharps) excludedKeys.push("sharp");
            setSettings({
              instrument,
              numberOfFrets,
              excludedKeys
            });
            setTestComplete(false);
            setSettingsOpen(!isSettingsOpen);
          }}
        >
          Save and Begin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SettingsDialogContainer.propTypes = {
  settings: allTypes.settings?.types,
  isSettingsOpen: PropTypes.bool,
  setSettings: PropTypes.func,
  setSettingsOpen: PropTypes.func,
  setTestComplete: PropTypes.func
};

SettingsDialogContainer.defaultProps = {
  settings: allTypes.settings?.defaults,
  isSettingsOpen: false,
  setSettings: () => {},
  setSettingsOpen: () => {},
  setTestComplete: () => {}
};

export default SettingsDialogContainer;
