import React from "react";

import MainContainer from "./components/MainContainer";

import "./styles/App.scss";

const App = () => (
  <div data-test="container-app" className="app-container">
    <MainContainer />
  </div>
);

export default App;
