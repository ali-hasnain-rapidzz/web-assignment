
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articleService } from '../services/articleService';

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

  const fetchArticleDetail = async () => {
    const response = await articleService.getArticleDetail(id as string);
    setArticle(response.data);
  };

  useEffect(() => {
    fetchArticleDetail();
  }, [id]);

  if (!article) return <div className="text-center py-4">Loading...</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-blue-600">{article.title}</h1>

        {/* Article Content */}
        <div className="mt-4 text-lg text-gray-700 space-y-4">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;