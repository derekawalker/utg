import React from "react";
import ReactDOM from "react-dom";
import PlacesApp from "./PlacesApp";
import AttractionsApp from "./AttractionsApp";
import LodgingApp from "./LodgingApp";
import RestaurantsApp from "./RestaurantsApp";
import HikesApp from "./HikesApp";
import PlaceDetails from "./components/PlaceDetails";
import GetData from "./components/GetData";
import SelectedCity from "./components/SelectedCity";
import "semantic-ui-css/semantic.min.css";
import "./fontawesome";

const selectedCityExists = document.getElementById("selected-city");
const placeSearchExists = document.getElementById("place-search");
const attractionsSearchExists = document.getElementById("attractions-search");
const lodgingSearchExists = document.getElementById("lodging-search");
const restaurantsSearchExists = document.getElementById("restaurants-search");
const hikesSearchExists = document.getElementById("hikes-search");
const getData = document.getElementById("get-data");

if (typeof selectedCityExists !== "undefined" && selectedCityExists !== null) {
  ReactDOM.render(<SelectedCity />, document.getElementById("selected-city"));
}

if (typeof placeSearchExists !== "undefined" && placeSearchExists !== null) {
  ReactDOM.render(<PlacesApp />, document.getElementById("place-search"));
}

if (
  typeof attractionsSearchExists !== "undefined" &&
  attractionsSearchExists !== null
) {
  ReactDOM.render(
    <AttractionsApp />,
    document.getElementById("attractions-search")
  );
}

if (
  typeof lodgingSearchExists !== "undefined" &&
  lodgingSearchExists !== null
) {
  ReactDOM.render(<LodgingApp />, document.getElementById("lodging-search"));
}

if (
  typeof restaurantsSearchExists !== "undefined" &&
  restaurantsSearchExists !== null
) {
  ReactDOM.render(
    <RestaurantsApp />,
    document.getElementById("restaurants-search")
  );
}

if (typeof hikesSearchExists !== "undefined" && hikesSearchExists !== null) {
  ReactDOM.render(<HikesApp />, document.getElementById("hikes-search"));
}

// ReactDOM.render(<PlaceDetails />, document.getElementById("place-details"));
if (typeof getData !== "undefined" && getData !== null) {
  ReactDOM.render(<GetData />, document.getElementById("get-data"));
}
