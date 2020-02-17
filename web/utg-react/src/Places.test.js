import React from "react";
import ReactDOM from "react-dom";
import Places from "./PlacesApp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Places />, div);
});
