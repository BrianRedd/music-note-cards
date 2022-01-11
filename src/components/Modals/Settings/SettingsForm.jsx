/** @module SettingsForm */

import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import {
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
 * @function SettingsForm
 * @description Functional Presentational component for SettingsForm
 * @returns {React.Component} - Rendered component.
 */
const SettingsForm = props => {
  const { settingsObject, updateSettingsInState } = props;

  return (
    <Row>
      <Col xs={4}>
        <FormControl component="fieldset">
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
      </Col>
      <Col xs={4}>
        <FormLabel component="legend">Number of Frets</FormLabel>
        <FormControl className="w-75">
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
          <FormLabel component="legend">Keys</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={settingsObject?.excludeSharps}
                onChange={event => {
                  updateSettingsInState("excludeSharps", event.target.checked);
                }}
              />
            }
            label="Exclude Sharps"
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
