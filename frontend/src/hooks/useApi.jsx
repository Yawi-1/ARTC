import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async ({
    method = "GET",
    url,
    data = null,
    params = null,
    headers = {},
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        params,
        headers,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};

export default useApi;