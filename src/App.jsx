/** @module App */

import React from "react";
import { Provider } from "react-redux";

import store from "./redux/configureStore";

import "./styles/App.scss";

import MainContainer from "./components/MainContainer";

const App = () => (
  <Provider store={store}>
    <div data-test="container-app" className="app-container">
      <MainContainer />
    </div>
  </Provider>
);

export default App;
