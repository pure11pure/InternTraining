import { useState, useEffect } from "react";

export default function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("result", result);
        setData(result);
      } catch (error) {
        console.log("error", error);
        setError(error);
      } finally {
        console.log("loading", loading);
        setLoading(false);
      }

      fetchData();
    };
  }, [url]);

  return { data, loading, error };
}
