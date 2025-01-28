import React, { useState, useEffect } from 'react';
import { articleService } from '@Services/articleService.service';
import ArticleCard from '@Components/Organisms/ArticleCard.organism';
import ArticleFilter from '@Components/Organisms/ArticleFilter.organism';
import InputField from '@Components/Atoms/InputField.atom';
import useAxios from '@Hooks/useAxios'; // Assuming you have the custom hook for API calls
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

  // Handle search change and update the filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Debounce effect: Update debouncedSearch after a delay
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout); // Clean up previous timeout
    };
  }, [filters.search]); // Runs when filters.search changes

  // Fetch articles from API when debouncedSearch or page changes
  const fetchArticles = async () => {
    const apiConfig = articleService.getArticleConfig({ ...filters, search: debouncedSearch }, page);
    const response = await callApi(apiConfig);
    if (response) {
      setArticles(response.data);
    }
  };

  // Trigger the fetchArticles when debouncedSearch or page changes
  useEffect(() => {
    fetchArticles();
  }, [debouncedSearch, page, filters]); // Run when debouncedSearch or page changes

  // Handle filter change (e.g., for category, date, etc.)
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
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
