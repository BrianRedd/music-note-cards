/** @module Main.test */

import { findByTestAttr, commonSetup } from "../../utils/utilsTest";
import TestedComponent from "../Main";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "presentation-main");
  expect(component.length).toBe(1);
});
