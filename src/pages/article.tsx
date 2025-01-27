import React, { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import ArticleCard from '../components/Organisms/ArticleCard';
import ArticleFilter from '../components/Organisms/ArticleFilter';
import InputField from '../components/atoms/InputField';
import useAxios from '../hooks/useAxios'; // Assuming you have the custom hook for API calls
import { dummyArticles } from '../utils/dummyResponses';
import { IArticle } from '../types/article.type';
import Button from '../components/atoms/Button';
import Loader from '../components/Organisms/Loader';

const Article: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
    source: '',
    author: '',
  });
  const [page, setPage] = useState(1);

  const [articles, setArticles] = useState<IArticle[]>();

  // Using the custom hook to call the API
  const { isLoading, callApi } = useAxios();

  const fetchArticles = async () => {
    const apiConfig = articleService.getArticleConfig(filters, page);
    const response = await callApi(apiConfig);
    if (response) {
      // Assuming response.data contains articles
      setArticles(dummyArticles);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filters, page]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="p-6">
        <div className="mb-6 flex items-center flex-col sm:flex-row sm:space-x-6">
          <InputField
            id="search"
            label="Search"
            type="text"
            placeholder="Search for articles.."
            value={filters.search}
            onChange={handleSearchChange}
            isSearchBar
          />
          <ArticleFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {articles?.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            label="Previous"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          />
          <span className="text-lg">{page}</span>
          <Button
            label="Next"
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
