/** @module Statistics.test */

import { findByTestAttr, commonSetup } from "../../../../utils/utilsTest";
import TestedComponent from "../Statistics";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(wrapper, "statistics-modal");
  expect(component.length).toBe(1);
});
