/** @module SettingsModalContainer.test */

import { findByTestAttr, commonSetup } from "../../../../utils/utilsTest";
import TestedComponent from "../SettingsModalContainer";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "modal-container-settings");
  expect(component.length).toBe(1);
});
