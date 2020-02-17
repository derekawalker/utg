import React from "react";
import Places from "./components/Places";
import { useFetchPlaces } from "./utils/hooks/useFetchPlaces";

const PlacesApp = props => {
  // const endpoint = "./data/places.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places";

  const { data, loading, error } = useFetchPlaces(endpoint);

  return <Places data={data} loading={loading} error={error} type="all" />;
};

export default PlacesApp;
