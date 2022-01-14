/** @module configureStore */

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import noteState from "./reducers/noteReducer";
import gameState from "./reducers/gameReducer";
import settingsState from "./reducers/settingsReducer";
import toggleState from "./reducers/toggleStateReducer";

const logger = createLogger({ collapsed: true, diff: true });

/**
 * @constant ConfigureStore
 * @description generates application Redux store
 */
const store = createStore(
  combineReducers({
    noteState,
    gameState,
    settingsState,
    toggleState
  }),
  undefined,
  applyMiddleware(thunk, logger)
);

export default store;
