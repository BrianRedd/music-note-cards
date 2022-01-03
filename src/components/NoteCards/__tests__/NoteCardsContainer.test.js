/** @module NoteCardsContainer.test */

import { findByTestAttr, commonSetup } from "../../../testUtils/utilsTest";
import TestedComponent from "../NoteCardsContainer";

const defaultProps = {};

test("renders without error", () => {
  const wrapper = commonSetup(TestedComponent, defaultProps);
  const component = findByTestAttr(
    wrapper,
    "container-note-cards"
  );
  expect(component.length).toBe(1);
});
