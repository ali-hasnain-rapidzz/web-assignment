import React, { useEffect, useState } from 'react';
import Select from '@Components/Atoms/Select.atom'; // Import the Select component
import prefernceService from '@/services/preferenceService.service';
import useAxios from '@/hooks/useAxios';
import { articleService } from '@/services/articleService.service';
import AuthorFilter from '../Molecules/AuthorSelect.molecule';
import { categoryOptions, dateOptions } from '@/utils/constants.util';

interface ArticleFilterProps {
  filters: {
    date: string;
    category: string;
    source: string;
    author: string;
  };
  onFilterChange: (newFilters: any) => void;
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [authorOptions, setAuthorOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [search, setSearch] = useState(''); // Track the search term for authors
  const [page, setPage] = useState(1); // Track the current page of authors
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const { callApi } = useAxios();

  // Fetch user preferences (source options)
  const getUserPrefernce = async () => {
    const apiConfig = prefernceService.getPrefernce();
    const response = await callApi(apiConfig);
    setPreferences(response?.source_names);
  };

  useEffect(() => {
    getUserPrefernce();
  }, []);

  // Fetch authors from the API
  const fetchAuthorOptions = async (page: number, search: string = '') => {
    setIsLoading(true);
    const response = await callApi(
      articleService.getAuthorOptions(page, search)
    );
    if(response){
      setAuthorOptions((prevAuthors) => [
        ...prevAuthors,
        ...response.authors?.map((item: string) => ({
          label: item,
          value: item,
        })),
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAuthorOptions(1, search); // Fetch authors when search or page changes
  }, [search, page]);

  // Handle loading more authors when scrolled to the bottom
  const loadMoreAuthors = () => {
    if (!isLoading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchAuthorOptions(nextPage, search); // Fetch authors for the next page
        return nextPage;
      });
    }
  };

  // Handle search input change
  const handleSearchChange = (e: string) => {
    setSearch(e); // Update the search term
    setPage(1); // Reset to the first page when search changes
    setAuthorOptions([]); // Clear existing author options
  };

  return (
    <div className="flex flex-wrap gap-4 sm:flex-nowrap">
      {/* Date Filter */}
      <Select
        value={filters.date}
        onChange={(e) => onFilterChange({ date: e.target.value })}
        options={dateOptions}
        placeholder="Select Date"
      />
      <Select
        value={filters.category}
        onChange={(e) => onFilterChange({ category: e.target.value })}
        options={categoryOptions}
        placeholder="Select Category"
      />

      {/* Source Filter */}
      <Select
        value={filters.source}
        onChange={(e) => onFilterChange({ source: e.target.value })}
        options={preferences.map((item) => ({ label: item, value: item }))}
        placeholder="Select Source"
      />
      {/* Author Filter with Search and Infinite Scroll */}
      <AuthorFilter
        value={filters?.author}
        onChange={(val) => onFilterChange({ author: val })}
        options={authorOptions}
        loadMoreAuthors={loadMoreAuthors} // Pass loadMoreAuthors function
        isLoading={isLoading} // Pass loading state to display when fetching
        onSearchChange={handleSearchChange} // Pass the handleSearchChange function
      />
    </div>
  );
};

export default ArticleFilter;
