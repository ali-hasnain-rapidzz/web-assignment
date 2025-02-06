import { ARTICLE_URL, AUTHOR_URL } from '@Utils/urls.util';
import { CustomAxiosRequestConfig } from '@/types/axios.type';

export const articleService = {
  getArticleDetail: (id: string): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: `${ARTICLE_URL}/${id}`, 
      privateRoute: true,
    };
  },
  getArticleConfig: (filters: any, page: number): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: ARTICLE_URL, 
      params: { ...filters, page },
      privateRoute: true,
    };
  },
  getAuthorOptions: (
    page: number,
    search?: string
  ): CustomAxiosRequestConfig => {
    return {
      method: 'GET',
      url: AUTHOR_URL, 
      privateRoute: true,
      params: {
        page, 
        limit: 20, 
        search,
      },
    };
  },
};
