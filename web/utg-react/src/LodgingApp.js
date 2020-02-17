import React from "react";
import Places from "./components/Places";
import { useFetchPlaces } from "./utils/hooks/useFetchPlaces";

const LodgingApp = props => {
  // const endpoint = "./data/lodging.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places/lodging";

  const { data, loading, error } = useFetchPlaces(endpoint);

  return <Places data={data} loading={loading} error={error} type="lodging" />;
};

export default LodgingApp;
