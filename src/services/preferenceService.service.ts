import { PREFERNCE_URL } from '@Utils/urls.util';
import { CustomAxiosRequestConfig } from '@/types/axios.type';

const prefernceService = {
  postPrefernce: (preferences: string[]): CustomAxiosRequestConfig => ({
    method: 'POST',
    url: PREFERNCE_URL,
    data: { preferences },
    privateRoute: true,
  }),
  getPrefernce: (): CustomAxiosRequestConfig => ({
    method: 'GET',
    url: PREFERNCE_URL,
    privateRoute: true,
  }),
};
export default prefernceService;
