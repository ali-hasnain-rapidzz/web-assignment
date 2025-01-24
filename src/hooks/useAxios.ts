import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseAxiosResponse<T> {
  callApi: (config: AxiosRequestConfig) => Promise<T | undefined>;
  isLoading: boolean;
  error: string | null;
}

const useAxios = <T = any>(): UseAxiosResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (
    config: AxiosRequestConfig
  ): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { callApi, isLoading, error };
};

export default useAxios;
