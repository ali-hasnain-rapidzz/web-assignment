import { ARTICLE_URL } from '@Utils/urls.util';
import { CustomAxiosRequestConfig } from '@/types/axios.type';

// Simulate an API call and return filtered articles
export const articleService = {
  // Dummy function to get article details
  getArticleDetail: (id: string): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, // Adjust this URL to your backend endpoint
      params: { id }, // Merge filters and page number
      privateRoute: true
    };
  },
  getArticleConfig: (filters: any, page: number): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, // Adjust this URL to your backend endpoint
      params: { ...filters, page }, // Merge filters and page number
      privateRoute: true
    };
  },
};
