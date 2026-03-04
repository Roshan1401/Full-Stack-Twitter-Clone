import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}/api/v1${url}`,
        data,
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.data;
      }

      throw new Error(response.data.message || "API request failed");
    } catch (error) {
      setError(error.message);
      console.error(`API request error: (${method} ${url})`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
}
