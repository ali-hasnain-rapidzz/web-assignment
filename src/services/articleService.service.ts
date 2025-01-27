import { AxiosRequestConfig } from 'axios';
import { ARTICLE_URL } from '@Utils/urls.util';

// Simulate an API call and return filtered articles
export const articleService = {
  // Dummy function to get article details
  getArticleDetail: (id: string): AxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, // Adjust this URL to your backend endpoint
      params: { id }, // Merge filters and page number
    };
  },
  getArticleConfig: (filters: any, page: number): AxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, // Adjust this URL to your backend endpoint
      params: { ...filters, page }, // Merge filters and page number
    };
  },
};
