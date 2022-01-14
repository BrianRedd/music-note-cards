/** @module StatisticsModalContainer */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "@mui/material";

import actions from "../../../redux/Actions";
import * as allTypes from "../../../types/appTypes";

import Statistics from "./Statistics";

const mapStateToProps = state => ({
  noteState: state.noteState,
  toggleState: state.toggleState
});

const mapDispatchToProps = {
  toggleToggle: actions.toggleToggle
};

/**
 * @function StatisticsModalContainer
 * @description Functional Presentational component for StatisticsModalContainer
 * @returns {React.Component} - Rendered component.
 */
const StatisticsModalContainer = props => {
  const { noteState, toggleState, toggleToggle } = props;

  return (
    <Modal
      data-test="modal-container-statistics"
      isOpen={toggleState?.open?.includes("statistics-modal")}
      toggle={() => toggleToggle("statistics-modal")}
      size="xl"
      fullscreen="lg"
      centered
    >
      <ModalHeader toggle={() => toggleToggle("statistics-modal")}>
        Game Results
      </ModalHeader>
      <ModalBody>
        <Statistics noteState={noteState} />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button
          variant="outlined"
          onClick={() => {
            toggleToggle("statistics-modal");
          }}
        >
          Okay
        </Button>
      </ModalFooter>
    </Modal>
  );
};

StatisticsModalContainer.propTypes = {
  toggleState: allTypes.toggleState.types,
  noteState: allTypes.noteState.types,
  toggleToggle: PropTypes.func
};

StatisticsModalContainer.defaultProps = {
  toggleState: allTypes.toggleState.defaults,
  noteState: allTypes.noteState.defaults,
  toggleToggle: () => {}
};

export const StatisticsModalContainerTest = StatisticsModalContainer;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsModalContainer);
