import React, { useState, useEffect, useCallback } from 'react';
import { articleService } from '@Services/articleService.service';
import ArticleCard from '@Components/Organisms/ArticleCard.organism';
import ArticleFilter from '@Components/Organisms/ArticleFilter.organism';
import InputField from '@Components/Atoms/InputField.atom';
import useAxios from '@Hooks/useAxios';
import { IArticle } from '@Types/article.type';
import Button from '@Components/Atoms/Button.atom';
import Loader from '@Components/Organisms/Loader.organism';

const Article: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
    source: '',
    author: '',
  });

  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const { isLoading, callApi } = useAxios();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  // Debounce search input
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [filters.search]);

  // Fetch articles when filters (except search) or pagination changes
  const fetchArticles = useCallback(async () => {
    const apiConfig = articleService.getArticleConfig(
      { ...filters, search: debouncedSearch }, // Use debounced search
      page
    );
    const response = await callApi(apiConfig);
    if (response) {
      setArticles(response.data);
    }
  }, [debouncedSearch, page, filters.date, filters.category, filters.source, filters.author]); // Exclude filters.search

  // Trigger API fetch when dependencies change
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handle filter updates (excluding search)
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter change
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-center flex-col sm:flex-row sm:space-x-6">
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
          {articles?.length > 0 && articles?.map((article: any) => (
            <div>
            <ArticleCard key={article.id} article={article} />
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
          ))}
        </div>
    
      </div>
    </div>
  );
};

export default Article;
