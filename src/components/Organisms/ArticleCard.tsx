// src/components/Articles/ArticleCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    description: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 bg-white shadow-md rounded-md hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <h3 className="text-xl font-semibold text-blue-600">{article.title}</h3>
      <p className="mt-2 text-gray-700">{article.description}</p>
    </div>
  );
};

export default ArticleCard;
