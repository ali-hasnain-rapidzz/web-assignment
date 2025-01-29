import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import useAxios from '@/hooks/useAxios';
import { articleService } from '@/services/articleService.service';
import { debounce } from 'lodash';
import { AuthorFilterProps, IAuthor } from '@/types/article.type';

const AuthorFilter: React.FC<AuthorFilterProps> = ({ value, onChange, initialAuthors }) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]); // Store authors
  const [search, setSearch] = useState(''); // Search term
  const [page, setPage] = useState(1); // Pagination
  const { callApi, isLoading } = useAxios();

  // Fetch initial author from URL query parameters and reload authors based on the query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Get query params from URL
    const authorFromUrl = urlParams.get('author');
    if (authorFromUrl) {
      setSearch(authorFromUrl); // Set the search term from the URL query
      setPage(1); // Reset pagination to start from page 1
      fetchAuthors(1, authorFromUrl, true); // Fetch authors with the query term
    } else {
      setSearch(''); // If no author param, reset search term
      fetchAuthors(1, '', true); // Fetch authors without any query
    }
  }, []); // Empty dependency array ensures this only runs on component mount

  // Debounced version of the search function to optimize API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setPage(1); // Reset to page 1 when search term changes
      fetchAuthors(1, query, true); // Fetch new results with updated search query
    }, 500),
    []
  );

  // Fetch authors from the API based on page number and query
  const fetchAuthors = async (pageNumber: number, query: string, reset: boolean = false) => {
    const response = await callApi(articleService.getAuthorOptions(pageNumber, query));
    if (response) {
      const newAuthors = response.authors.map((name: string) => ({ label: name, value: name }));
      setAuthors((prevAuthors) => (reset ? newAuthors : [...prevAuthors, ...newAuthors]));
    }
  };

  // Fetch authors when page changes (pagination)
  useEffect(() => {
    if (page > 1) fetchAuthors(page, search); // Only fetch when page > 1
  }, [page]);

  // Load more authors when scrolled to the bottom
  const loadMoreAuthors = () => {
    if (!isLoading) setPage((prev) => prev + 1); // Trigger pagination
  };

  // Sync initial authors from props
  useEffect(() => {
    setAuthors(initialAuthors);
  }, [initialAuthors]);

  // Find the author that matches the value from the URL or initialAuthors
  const selectedAuthor =
    authors.find((author) => author.value === value) ||
    authors.find((author) => author.value === search) ||
    null;

  return (
    <Select
      value={selectedAuthor} // Set the selected author, handle null case
      onChange={(selected: { value: string } | null) => onChange(selected?.value || '')} // Update parent when selection changes
      options={authors}
      placeholder="Search and select author"
      onInputChange={(input: string) => {
        setSearch(input); // Update search query
        debouncedSearch(input); // Trigger debounced search
      }}
      onMenuScrollToBottom={loadMoreAuthors} // Trigger load more authors when scrolled to the bottom
      isLoading={isLoading} // Show loading state
      isClearable // Allow clearing selection
      styles={{
        control: (provided) => ({ ...provided, width: '300px' }),
        menu: (provided) => ({ ...provided, width: '300px' }),
        placeholder: (provided) => ({ ...provided, color: 'black' }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: '200px',
          overflowY: 'auto',
        }),
      }}
    />
  );
};

export default AuthorFilter;
