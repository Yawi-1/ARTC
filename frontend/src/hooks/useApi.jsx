import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const callApi = useCallback(async ({
    method,
    url,
    data,
  }) => {

    try {

      setLoading(true);

      setError(null);

      const res = await axios({
        method,
        url: `http://localhost:3000/api${url}`,
        data,
        withCredentials: true,
      });

      return res.data;

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );

      console.log(err);

    } finally {

      setLoading(false);

    }

  }, []);

  return {
    callApi,
    loading,
    error,
  };
};

export default useApi;