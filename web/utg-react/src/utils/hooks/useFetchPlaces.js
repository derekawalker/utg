import { useEffect, useState } from "react";

export const useFetchPlaces = (endpoint, params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = endpoint;

    if (params && params.city) {
      url = `${url}/${params.city}`;
    } else {
      url = `${url}/all`;
    }

    // if (params && params.type) {
    //   url = `${url}/${params.type}`;
    // } else {
    //   url = `${url}/all`;
    // }

    fetch(url)
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (json) {
          setData(json);
        } else {
          setData([]);
        }
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [params]);
  return { data, loading, error };
};
