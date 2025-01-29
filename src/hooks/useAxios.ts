import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { showToast } from '@Utils/toast.util'; // Import the showToast utility

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  privateRoute?: boolean; // Add a flag for private routes
}

interface UseAxiosResponse<T> {
  callApi: (config: ExtendedAxiosRequestConfig) => Promise<T | undefined>;
  isLoading: boolean;
}

const useAxios = <T = any>(): UseAxiosResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (
    config: ExtendedAxiosRequestConfig
  ): Promise<T | undefined> => {
    setIsLoading(true);

    try {
      const { privateRoute = false, headers, ...restConfig } = config;

      // Add Authorization header for private routes
      const token = privateRoute ? localStorage.getItem('token') : null;

      const updatedConfig: AxiosRequestConfig = {
        ...restConfig,
        headers: {
          ...headers,
          'ngrok-skip-browser-warning': '69420',
          ...(privateRoute && token
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
      };

      const response = await axios(updatedConfig);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred.';
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
