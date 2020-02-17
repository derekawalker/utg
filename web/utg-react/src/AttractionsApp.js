import React from "react";
import Places from "./components/Places";
import { useFetchPlaces } from "./utils/hooks/useFetchPlaces";

const AttractionsApp = props => {
  // const endpoint = "./data/attractions.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places/attraction";

  const { data, loading, error } = useFetchPlaces(endpoint);

  return (
    <Places data={data} loading={loading} error={error} type="attraction" />
  );
};

export default AttractionsApp;
