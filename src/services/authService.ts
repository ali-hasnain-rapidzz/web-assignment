import { AxiosRequestConfig } from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../utils/urls';


 const authService = {
  register: (name: string, email: string, password: string): AxiosRequestConfig => ({
        method: 'POST',
        url: REGISTER_URL,
        data: { name, email, password },
      }),
  login: (email: string, password: string): AxiosRequestConfig => {
    return {
      method: 'POST',
      url: LOGIN_URL,
      data: {
        email,
        password,
      },
    };
  },
};
export default  authService