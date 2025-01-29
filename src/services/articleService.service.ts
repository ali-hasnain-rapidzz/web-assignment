import { ARTICLE_URL, AUTHOR_URL } from '@Utils/urls.util';
import { CustomAxiosRequestConfig } from '@/types/axios.type';

// Simulate an API call and return filtered articles
export const articleService = {
  // Dummy function to get article details
  getArticleDetail: (id: string): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: `${ARTICLE_URL}/${id}`, // The ID is now part of the path
      privateRoute: true,
    };
  },
  getArticleConfig: (filters: any, page: number): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, // Adjust this URL to your backend endpoint
      params: { ...filters, page }, // Merge filters and page number
      privateRoute: true,
    };
  },
  getAuthorOptions: (
    page: number,
    search: string
  ): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: AUTHOR_URL, // The ID is now part of the path
      privateRoute: true,
      params: {
        page, // Pass the page parameter to get paginated authors
        limit: 20, // Number of authors to fetch per page
        search,
      },
    };
  },
};
