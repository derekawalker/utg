import { useEffect, useState } from "react";

export const useFetchPlaces = endpoint => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = endpoint;

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
  }, []);
  return { data, loading, error };
};
