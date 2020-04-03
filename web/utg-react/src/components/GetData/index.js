import React, { useState } from "react";
import _ from "lodash";
import axios from "axios";

// Custom components.
import { exportCSVFile } from "../../utils/data/data-export";

// Styled Components.
import { Wrapper } from "./styles";

/* eslint-disable no-undef */

const key = "AIzaSyBUfXaERagJUoTC503tynZfmWh5xoeTmS0";
const endpoint = "https://maps.googleapis.com/maps/api/place/details/json?";
const fields =
  "address_component,adr_address,formatted_address,geometry,name,permanently_closed,photo,place_id,type,url,vicinity";

const getImage = url => {
  console.log(url);
  let newurl = {};
  axios.get(url).then(resp => {
    console.log(resp);
    newurl.url = resp.request.responseURL;
    console.log(newurl);
    return newurl;
  });
};

const GetData = props => {
  const [formattedPlaceData, setFormattedPlaceData] = useState([]);
  const [googleID, setGoogleID] = useState(null);
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setGoogleID(e.target.value);
  };

  // ChIJXwIQaWAEU4cRoRjAJEyjaIQ;

  const handleSubmitForm = () => {
    var googleIDs = googleID.split(",");
    googleIDs.map(googleID => {
      if (!loading) {
        fetch(`${endpoint}place_id=${googleID}&key=${key}`)
          .then(response => response.json())
          .then(json => {
            if (json && json.result && json.result.reference) {
              setPlaceData(placeData => [...placeData, json.result]);
            }
            setLoading(false);
          })
          .catch(err => {
            setError(err, googleID);
            setLoading(false);
          });
      }
    });
  };

  const arraySibling = (array, value, length) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i].types[0] === value) {
        return array[i][length];
      }
    }
    return "";
  };

  let content = "Empty";

  const inputForm = (
    <div>
      <textarea
        placeholder="Google ID(s) - separate with comma"
        rows="6"
        columns="30"
        onChange={e => handleChange(e)}
      ></textarea>
      <button type="submit" onClick={() => handleSubmitForm()}>
        Get Data
      </button>
    </div>
  );

  const formatData = placeData => {
    let id = "";
    let street_number = "";
    let street = "";
    let neighborhood = "";
    let city = "";
    let county = "";
    let state = "";
    let country = "";
    let zip = "";
    let phone = "";
    let hours = "";
    let rating = "";
    let user_ratings_total = "";
    let lat = "";
    let long = "";
    let name = "";
    let main_photo = "";
    let photos = [];
    let types = [];
    let url = "";
    let website = "";
    let price = "";

    placeData.map(place => {
      let newPlace = {};
      if (place.reference) {
        id = place.reference;
        newPlace.id = id;
      } else {
        newPlace.id = "";
      }

      if (place.name) {
        name = place.name;
        newPlace.name = name.replace(/,/g, "-");
      } else {
        newPlace.name = "";
      }

      if (place.address_components) {
        street_number = arraySibling(
          place.address_components,
          "street_number",
          "long_name"
        );
        newPlace.street_number = street_number;
      } else {
        newPlace.street_number = "";
      }

      if (place.address_components) {
        street = arraySibling(place.address_components, "route", "long_name");
        newPlace.street = street.replace(/,/g, "-");
      } else {
        newPlace.street = "";
      }

      if (place.address_components) {
        neighborhood = arraySibling(
          place.address_components,
          "neighborhood",
          "long_name"
        );
        newPlace.neighborhood = neighborhood;
      } else {
        newPlace.neighborhood = "";
      }

      if (place.address_components) {
        city = arraySibling(place.address_components, "locality", "long_name");
        newPlace.city = city;
      } else {
        newPlace.city = "";
      }

      if (place.address_components) {
        county = arraySibling(
          place.address_components,
          "administrative_area_level_2",
          "long_name"
        );
        newPlace.county = county;
      } else {
        newPlace.county = "";
      }

      if (place.address_components) {
        state = arraySibling(
          place.address_components,
          "administrative_area_level_1",
          "short_name"
        );
        newPlace.state = state;
      } else {
        newPlace.state = "";
      }

      if (place.address_components) {
        country = arraySibling(
          place.address_components,
          "country",
          "short_name"
        );
        newPlace.country = country;
      } else {
        newPlace.country = "";
      }

      if (place.address_components) {
        zip = arraySibling(
          place.address_components,
          "postal_code",
          "long_name"
        );
        newPlace.zip = zip;
      } else {
        newPlace.zip = "";
      }

      if (place.geometry) {
        lat = place.geometry.location.lat;
        newPlace.lat = lat;
      } else {
        newPlace.lat = "";
      }

      if (place.geometry) {
        long = place.geometry.location.lng;
        newPlace.long = long;
      } else {
        newPlace.long = "";
      }

      if (place.photos && place.photos[0]) {
        main_photo = place.photos[0].photo_reference;
        let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=8000&photoreference=${main_photo}&key=${key}`;
        newPlace.main_photo = photoUrl;
      } else {
        newPlace.main_photo = "";
      }

      if (place.photos && place.photos[1]) {
        photos = place.photos;
        let photosArray = photos.map(photo => {
          let thisPhoto = [];
          let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=8000&photoreference=${main_photo}&key=${key}`;
          thisPhoto.push(photoUrl);
          return thisPhoto;
        });
        newPlace.photos = photosArray.join(";");
      } else {
        newPlace.photos = "";
      }

      if (place.types[0]) {
        types = place.types;
        let typesArray = types.map(type => {
          let thisTypes = [];
          thisTypes.push(type);

          return thisTypes;
        });
        newPlace.types = typesArray.join(";");
      } else {
        newPlace.types = "";
      }

      if (place.url) {
        url = place.url;
        newPlace.url = url.replace(/,/g, "");
      } else {
        newPlace.url = "";
      }

      if (place.website) {
        website = place.website;
        newPlace.website = website;
      } else {
        newPlace.website = "";
      }

      if (place.international_phone_number) {
        phone = place.international_phone_number;
        newPlace.phone = phone.replace("+1", "");
      } else {
        newPlace.phone = "";
      }

      if (place.opening_hours && place.opening_hours.weekday_text) {
        hours = place.opening_hours.weekday_text;
        newPlace.hours = hours.join(";");
      } else {
        newPlace.hours = "";
      }

      if (place.rating) {
        rating = place.rating;
        newPlace.rating = rating;
      } else {
        newPlace.rating = "";
      }

      if (place.user_ratings_total) {
        user_ratings_total = place.user_ratings_total;
        newPlace.user_ratings_total = user_ratings_total;
      } else {
        newPlace.user_ratings_total = "";
      }

      if (place.price_level) {
        price = place.price_level;
        newPlace.price = price;
      } else {
        newPlace.price = "";
      }

      setFormattedPlaceData(formattedPlaceData => [
        ...formattedPlaceData,
        newPlace
      ]);
    });

    // content = (
    //   <div>
    //     <div>{id}</div>
    //     <div>{name}</div>
    //     <div>{street_number}</div>
    //     <div>{street}</div>
    //     <div>{city}</div>
    //     <div>{county}</div>
    //     <div>{state}</div>
    //     <div>{country}</div>
    //     <div>{zip}</div>
    //     <div>{phone}</div>
    //     <div>{hours}</div>
    //     <div>{rating}</div>
    //     <div>{user_ratings_total}</div>
    //     <div>{lat}</div>
    //     <div>{long}</div>
    //     <div>{types}</div>
    //     <div>{url}</div>
    //     <div>{website}</div>
    //     <hr />
    //     <div>{exportLink}</div>
    //   </div>
    // );

    // )
  };

  const finalData = formattedPlaceData;
  const finalHeaders = [
    "id",
    "title",
    "street_number",
    "street",
    "neighborhood",
    "city",
    "county",
    "state",
    "country",
    "zip",
    "lat",
    "long",
    "main_photo",
    "photos",
    "types",
    "url",
    "website",
    "phone",
    "hours",
    "rating",
    "user_rating_total",
    "price"
  ];
  const finalFilename = "data-export";

  const handleExportClick = () => {
    exportCSVFile(finalHeaders, finalData, finalFilename);
  };

  const formatButton = (
    <button onClick={() => formatData(placeData)}>Format Data</button>
  );

  const exportLink = (
    <button onClick={() => handleExportClick()}>Export CSV</button>
  );

  return (
    <Wrapper>
      <div>{inputForm}</div>
      <hr />
      <div>{placeData.length ? formatButton : null}</div>
      <hr />
      <div>{content}</div>
      <hr />
      <div>{formattedPlaceData.length ? exportLink : null}</div>
    </Wrapper>
  );
};

export default GetData;
