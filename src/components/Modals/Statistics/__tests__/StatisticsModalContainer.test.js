/** @module StatisticsModalContainer.test */

import { findByTestAttr, commonSetup } from "../../../../utils/utilsTest";
import { StatisticsModalContainerTest as TestedComponent } from "../StatisticsModalContainer";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "modal-container-statistics");
  expect(component.length).toBe(1);
});
