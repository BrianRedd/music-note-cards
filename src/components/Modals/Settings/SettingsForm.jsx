/** @module SettingsForm */

import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import {
  FormControl,
  FormLabel,
  InputLabel,
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
 * @function SettingsForm
 * @description Functional Presentational component for SettingsForm
 * @returns {React.Component} - Rendered component.
 */
const SettingsForm = props => {
  const { settingsObject, updateSettingsInState } = props;

  return (
    <Row data-test="form-settings">
      <Col xs={4}>
        <FormControl component="fieldset" className="mb-3">
          <FormLabel component="legend">Instrument</FormLabel>
          <RadioGroup
            aria-label="instrument"
            name="controlled-radio-buttons-group"
            value={settingsObject?.instrument}
            onChange={event => {
              updateSettingsInState("instrument", event.target.value);
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
        <FormControl className="w-75">
          <InputLabel component="legend">Number of Frets</InputLabel>
          <Select
            value={settingsObject?.numberOfFrets}
            onChange={event => {
              updateSettingsInState("numberOfFrets", event.target.value);
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
        <FormControl>
          <FormLabel component="legend">Game Options</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.removeWrongFromPool}
                onChange={event => {
                  updateSettingsInState(
                    "removeWrongFromPool",
                    event.target.checked
                  );
                }}
              />
            }
            label="Remove Wrong Answers from Test Pool"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.timed}
                onChange={event => {
                  updateSettingsInState("timed", event.target.checked);
                }}
                disabled
              />
            }
            label="Timed Test"
          />
        </FormControl>
      </Col>
      <Col xs={4}>
        <FormControl>
          <FormLabel component="legend">Keys</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.excludeSharp}
                onChange={event => {
                  updateSettingsInState("excludeSharp", event.target.checked);
                }}
              />
            }
            label="Exclude Sharps"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.excludeNatural}
                onChange={event => {
                  updateSettingsInState("excludeNatural", event.target.checked);
                }}
                disabled
              />
            }
            label="Exclude Naturals"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.excludeFlat}
                onChange={event => {
                  updateSettingsInState("excludeFlat", event.target.checked);
                }}
                disabled
              />
            }
            label="Exclude Flats"
          />
        </FormControl>
      </Col>
    </Row>
  );
};

SettingsForm.propTypes = {
  settingsObject: allTypes.settings.types,
  updateSettingsInState: PropTypes.func
};

SettingsForm.defaultProps = {
  settingsObject: allTypes.settings.types,
  updateSettingsInState: () => {}
};

export default SettingsForm;
