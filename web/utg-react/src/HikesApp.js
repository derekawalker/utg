import React from "react";
import Places from "./components/Places";
import { useFetchPlaces } from "./utils/hooks/useFetchPlaces";

const HikesApp = props => {
  // const endpoint = "./data/hikes.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places/hike";

  const { data, loading, error } = useFetchPlaces(endpoint);

  return <Places data={data} loading={loading} error={error} type="hike" />;
};

export default HikesApp;
