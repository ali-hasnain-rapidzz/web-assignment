import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { showToast } from '../utils/toastUtils'; // Import the showToast utility

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
        err.response?.data?.message || 'An unexpected error occurred.';      
      // Show the error toast here
      showToast({
        title: 'Error',
        text: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { callApi, isLoading };
};

export default useAxios;
