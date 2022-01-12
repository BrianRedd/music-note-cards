/** @module App */

import React from "react";
import { Provider } from "react-redux";

import store from "./redux/configureStore";

import "./styles/App.scss";

import Main from "./components/Main";

const App = () => (
  <Provider store={store}>
    <div data-test="container-app" className="app-container">
      <Main />
    </div>
  </Provider>
);

export default App;
