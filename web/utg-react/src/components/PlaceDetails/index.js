import React from "react";
import _ from "lodash";

// Custom components.
import { useFetchPlaces } from "../../utils/hooks/useFetchPlaces";

// Styled Components.
import { Wrapper } from "./styles";

/* eslint-disable no-undef */

const key = "AIzaSyBUfXaERagJUoTC503tynZfmWh5xoeTmS0";
const endpoint = "https://maps.googleapis.com/maps/api/place/details/json?";
const fields =
  "address_component,adr_address,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,type,url,vicinity";

const PlaceDetails = props => {
  const place_id = "ChIJlTrKwp-rrIAR9ss2HJrnGb8";

  const { data } = useFetchPlaces(
    `${endpoint}place_id=${place_id}&fields=${fields}&key=${key}`
  );

  console.log(data);

  let street_number = "";
  let street = "";
  let city = "";
  let county = "";
  let state = "";
  let zip = "";
  let lat = "";
  let long = "";
  let icon = "";
  let name = "";
  let main_photo = {};
  let photos = [];
  let types = [];
  let url = "";

  if (!data || !data.result) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (data.result && data.result.address_components[0]) {
    street_number = data.result.address_components[0].long_name;
  }

  if (data.result && data.result.address_components[1]) {
    street = data.result.address_components[1].long_name;
  }

  if (data.result && data.result.address_components[2]) {
    city = data.result.address_components[2].long_name;
  }

  if (data.result && data.result.address_components[3]) {
    county = data.result.address_components[3].long_name;
  }

  if (data.result && data.result.address_components[4]) {
    state = data.result.address_components[4].long_name;
  }

  if (data.result && data.result.address_components[6]) {
    zip = data.result.address_components[6].long_name;
  }

  if (data.result && data.result.geometry) {
    lat = data.result.geometry.location.lat;
  }

  if (data.result && data.result.geometry) {
    long = data.result.geometry.location.lng;
  }

  if (data.result && data.result.icon) {
    icon = data.result.icon;
  }

  if (data.result && data.result.name) {
    name = data.result.name;
  }

  if (data.result && data.result.photos[0]) {
    main_photo = data.result.photos[0].photo_reference;
  }

  if (data.result && data.result.photos[0]) {
    photos = data.result.photos;
  }

  if (data.result && data.result.types[0]) {
    types = data.result.types;
  }

  if (data.result && data.result.url) {
    url = data.result.url;
  }

  const display_name = <h1>{name}</h1>;

  const display_address = (
    <div>
      {street_number} {street}, {city}, {county}, {state} {zip}
    </div>
  );

  const display_coordinates = (
    <div>
      {lat}, {long}
    </div>
  );

  const display_icon = (
    <div>
      <img src={icon} alt={types[0]} />
    </div>
  );

  const display_link = (
    <div>
      <a href={url} target="_blank">
        More Information
      </a>
    </div>
  );

  const display_photo = (
    <div>
      <img
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photoreference=${main_photo}&key=${key}`}
        alt={name}
      />
    </div>
  );

  const display_photos = photos.map((photo, index) => {
    return (
      <div key={index}>
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photoreference=${photo.photo_reference}&key=${key}`}
          alt={name}
        />
      </div>
    );
  });

  const display_type = <div>{types[0]}</div>;

  return (
    <Wrapper>
      {display_name}
      {display_type}
      {display_photo}
      {display_address}
      {display_coordinates}
      {display_icon}
      {display_link}
      {display_photos}
    </Wrapper>
  );
};

export default PlaceDetails;
