import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articleService } from '../services/articleService';
import useAxios from '../hooks/useAxios';
import Loader from '../components/Layout/Loader';

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const { isLoading, callApi } = useAxios<any>();

  const fetchArticleDetail = async (id: string) => {
    // Prevent making the API call if it's already loading or id is not valid
    const apiConfig = articleService.getArticleDetail(id);
    const response = await callApi(apiConfig);
    if (response) {
      setArticle(response.data);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticleDetail(id);
    }
  }, [id]); // Run the effect only when the `id` changes

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-blue-600">
          {article?.title}
        </h1>
        <div className="mt-4 text-lg text-gray-700 space-y-4">
          <p>{article?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
