/** @module MainContainer.test */

import { findByTestAttr, commonSetup } from "../../utils/utilsTest";
import TestedComponent from "../MainContainer";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "container-main");
  expect(component.length).toBe(1);
});
