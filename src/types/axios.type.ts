import { AxiosRequestConfig } from 'axios';

// Extend AxiosRequestConfig to add the privateRoute field
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  privateRoute?: boolean; // Optional field to indicate private routes
}
