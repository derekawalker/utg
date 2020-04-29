import React from "react";
import Places from "./components/Places";
import { useFetchPlaces } from "./utils/hooks/useFetchPlaces";

const RestaurantsApp = (props) => {
  // const endpoint = "./data/restaurants.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places/restaurant";

  const { data, loading, error } = useFetchPlaces(endpoint);

  return (
    <Places data={data} loading={loading} error={error} type="restaurant" />
  );
};

export default RestaurantsApp;
