import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { articleService } from '@Services/articleService.service';
import ArticleCard from '@Components/Organisms/ArticleCard.organism';
import ArticleFilter from '@Components/Organisms/ArticleFilter.organism';
import InputField from '@Components/Atoms/InputField.atom';
import useAxios from '@Hooks/useAxios';
import { IArticle, IAuthor } from '@Types/article.type';
import Button from '@Components/Atoms/Button.atom';
import Loader from '@Components/Organisms/Loader.organism';
import prefernceService from '@/services/preferenceService.service';


const Article: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract filters and page from URL on initial render
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    search: queryParams.get('search') || '',
    date: queryParams.get('date') || '',
    category: queryParams.get('category') || '',
    source: queryParams.get('source') || '',
    author: queryParams.get('author') || '',
  };
  const initialPage = Number(queryParams.get('page')) || 1;
  const [preferences, setPreferences] = useState<string[]>([]);
  const [initialAuthors, setInitialAuthors] = useState<IAuthor[]>([]);

  // State Initialization
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(initialPage);
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

  // Fetch articles when filters or page change
  const fetchArticles = useCallback(async () => {
    const apiConfig = articleService.getArticleConfig(
      { ...filters, search: debouncedSearch },
      page
    );
    const response = await callApi(apiConfig);
    if (response) {
      setArticles(response.data);
    }
  }, [debouncedSearch, page, filters.date, filters.category, filters.source, filters.author]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Update URL only when needed
  const updateUrlWithFilters = (updatedFilters: typeof filters, updatedPage: number) => {
    const queryParams = new URLSearchParams(location.search);
    
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
      else queryParams.delete(key);
    });

    queryParams.set('page', updatedPage.toString());

    const newUrl = `?${queryParams.toString()}`;

    if (location.search !== newUrl) {
      navigate(newUrl, { replace: true }); // Avoids creating unnecessary history entries
    }
  };

  // Handle filter updates (excluding search)
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setPage(1); // Reset page
    updateUrlWithFilters(updatedFilters, 1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlWithFilters(filters, newPage);
  };

    // Fetch user preferences (source options)
    const getUserPrefernce = async () => {
      const apiConfig = prefernceService.getPrefernce();
      const response = await callApi(apiConfig);
      setPreferences(response?.source_names);
    };

    const getAuthors = async () => {
      const apiConfig = articleService.getAuthorOptions(1, filters.author);
      const response = await callApi(apiConfig);
      if (response?.authors) {
        // Ensure authors are properly formatted as { label, value } objects
        const formattedAuthors = response.authors.map((name: string) => ({
          label: name,
          value: name,
        }));
        setInitialAuthors(formattedAuthors); // Set properly formatted authors
      }
    };
  
  
    useEffect(() => {
      getAuthors()
      getUserPrefernce();
    }, []);
  

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
          <ArticleFilter initialAuthors={initialAuthors} filters={filters} preferences={preferences} onFilterChange={handleFilterChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {articles?.length > 0 &&
            articles.map((article: IArticle) => <ArticleCard key={article.id} article={article} />)}
        </div>
        {articles?.length > 0 && (
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              label="Previous"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            />
            <span className="text-lg">{page}</span>
            <Button
              label="Next"
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
