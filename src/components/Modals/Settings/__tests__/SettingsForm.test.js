/** @module SettingsForm.test */

import { findByTestAttr, commonSetup } from "../../../../utils/utilsTest";
import TestedComponent from "../SettingsForm";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "form-settings");
  expect(component.length).toBe(1);
});
