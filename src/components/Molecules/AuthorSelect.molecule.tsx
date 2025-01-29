import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useAxios from '@/hooks/useAxios';
import { articleService } from '@/services/articleService.service';
import { debounce } from 'lodash';

// Type for authors options
interface IAuthor {
  label: string;
  value: string;
}

// Props for the AuthorFilter component
interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
  initialAuthors: IAuthor[]; // Initial authors from parent
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({ value, onChange, initialAuthors }) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]); // Store authors
  const [search, setSearch] = useState(''); // Search term
  const [page, setPage] = useState(1); // Pagination
  const { callApi, isLoading } = useAxios();

  // Fetch initial author from URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Get query params from URL
    const authorFromUrl = urlParams.get('author');
    if (authorFromUrl) {
      setSearch(authorFromUrl); // Set the initial search term from the URL
    }
  }, []);

  // Debounced version of the search function to optimize API calls
  const debouncedSearch = debounce((query: string) => {
    setPage(1); // Reset to page 1 when search term changes
    fetchAuthors(1, query, true); // Fetch new results
  }, 500);

  // Fetch authors from API
  const fetchAuthors = async (pageNumber: number, query: string, reset: boolean = false) => {
    const response = await callApi(articleService.getAuthorOptions(pageNumber, query));
    if (response) {
      setAuthors((prevAuthors) =>
        reset
          ? response.authors.map((name: string) => ({ label: name, value: name }))
          : [...prevAuthors, ...response.authors.map((name: string) => ({ label: name, value: name }))] // Paginate and add more authors
      );
    }
  };

  // Fetch authors when page changes (pagination)
  useEffect(() => {
    if (page > 1) {
      fetchAuthors(page, search); // Only call API when page > 1
    }
  }, [page]);

  // Load more authors when scrolled to the bottom
  const loadMoreAuthors = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1); // Trigger pagination
    }
  };

  // Set initial authors when they change
  useEffect(() => {
    setAuthors(initialAuthors);
  }, [initialAuthors]);

  return (
    <Select
      value={authors.find((option) => option.value === value) || null} // Set the selected author, handle null case
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
