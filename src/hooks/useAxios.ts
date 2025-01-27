import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { showToast } from '@Utils/toast.util'; // Import the showToast utility

interface UseAxiosResponse<T> {
  callApi: (config: AxiosRequestConfig) => Promise<T | undefined>;
  isLoading: boolean;
}

const useAxios = <T = any>(): UseAxiosResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (
    config: AxiosRequestConfig
  ): Promise<T | undefined> => {
    setIsLoading(true);

    try {
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        // Show the error toast here
        err.response?.data?.message || 'An unexpected error occurred.';
      showToast({
        title: 'Error',
        text: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      // return null;
    }
  };

  return { callApi, isLoading };
};

export default useAxios;
