import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SelectedCity from "./components/SelectedCity";
import "semantic-ui-css/semantic.min.css";
import "./fontawesome";

const selectedCityExists = document.getElementById("selected-city");
const placeSearchExists = document.getElementById("place-search");

if (typeof selectedCityExists !== "undefined" && selectedCityExists !== null) {
  ReactDOM.render(<SelectedCity />, document.getElementById("selected-city"));
}

if (typeof placeSearchExists !== "undefined" && placeSearchExists !== null) {
  ReactDOM.render(<App />, document.getElementById("place-search"));
}
