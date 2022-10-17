import React, { Component } from "react";
import Main from "./components/MainComponent";
import "./App.css";
import { DISHES } from "./shared/dishes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
