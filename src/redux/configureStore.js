/** @module configureStore */

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import noteState from "./reducers/noteReducer";
import gameState from "./reducers/gameReducer";
import settingsState from "./reducers/settingsReducer";

const logger = createLogger({ collapsed: true, diff: true });

/**
 * @constant ConfigureStore
 * @description generates application Redux store
 */
const ConfigureStore = () => {
  const storeTemplate = createStore(
    combineReducers({
      noteState,
      gameState,
      settingsState
    }),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable no-underscore-dangle */
    applyMiddleware(thunk, logger)
  );
  return storeTemplate;
};

const store = ConfigureStore();

export default store;
