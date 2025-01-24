import React, { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import ArticleCard from '../components/Articles/ArticleCard';
import ArticleFilter from '../components/Articles/ArticleFilter';
import InputField from '../components/Layout/InputField';
import useAxios from '../hooks/useAxios'; // Assuming you have the custom hook for API calls
import { dummyArticles } from '../utils/dummyResponses';
import { IArticle } from '../types/article.type';
import Button from '../components/Layout/Button';
import Loader from '../components/Layout/Loader';

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
  const { error, isLoading, callApi } = useAxios();

  const fetchArticles = async () => {
    const apiConfig = articleService.getArticleConfig(filters, page);
    const response = await callApi(apiConfig);
    if (response) {
      // Assuming response.data contains articles
      setArticles(dummyArticles);
    } else {
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

        {isLoading && (
          <div className="flex justify-center items-center mt-6">
            <Loader/>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-2 mt-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
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
