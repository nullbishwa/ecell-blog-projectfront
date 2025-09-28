import { useEffect, useState } from "react";
import API from "../api";

/**
 * Custom hook for fetching data from backend
 * @param {string} url - API endpoint (relative to baseURL in api.js)
 */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await API.get(url);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
