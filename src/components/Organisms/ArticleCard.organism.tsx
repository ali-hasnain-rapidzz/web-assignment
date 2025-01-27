// src/components/Articles/ArticleCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';

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
      <Heading
        text={article.title}
        level={3}
        className="text-xl font-semibold text-blue-600"
      />
      <Paragraph text={article.description} className="mt-2 text-gray-700" />
    </div>
  );
};

export default ArticleCard;
