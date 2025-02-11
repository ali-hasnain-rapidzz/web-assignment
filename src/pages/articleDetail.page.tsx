import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleService } from '@Services/articleService.service';
import useAxios from '@Hooks/useAxios';
import Loader from '@Components/Organisms/Loader.organism';
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const { isLoading, callApi } = useAxios<any>();

  const fetchArticleDetail = async (id: string) => {
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
  }, [id]); 

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Heading
          text={article?.title}
          level={1}
          className="text-3xl sm:text-4xl font-semibold text-blue-600"
        />
        <div className="mt-4 text-lg text-gray-700 space-y-4">
          <Paragraph text={article?.description} />
            <Link 
              to={article?.url} 
              className="text-blue-600 hover:underline inline"
            >
              <span> See More</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
