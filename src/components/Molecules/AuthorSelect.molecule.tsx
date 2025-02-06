import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import useAxios from '@/hooks/useAxios';
import { articleService } from '@/services/articleService.service';
import { debounce } from 'lodash';
import { AuthorFilterProps, IAuthor } from '@/types/article.type';

const AuthorFilter: React.FC<AuthorFilterProps> = ({ value, onChange, initialAuthors }) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]); 
  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(1); 
  const { callApi, isLoading } = useAxios();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); 
    const authorFromUrl = urlParams.get('author');
    if (authorFromUrl) {
      setSearch(authorFromUrl); 
      setPage(1); 
    } 
  }, []); 

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setPage(1); 
      fetchAuthors(1, query, true); 
    }, 500),
    []
  );

  const fetchAuthors = async (pageNumber: number, query: string, reset: boolean = false) => {
    const response = await callApi(articleService.getAuthorOptions(pageNumber, query));
    if (response) {
      const newAuthors = response.authors.map((name: string) => ({ label: name, value: name }));
      setAuthors((prevAuthors) => (reset ? newAuthors : [...prevAuthors, ...newAuthors]));
    }
  };

  useEffect(() => {
    if (page > 1) fetchAuthors(page, search); 
  }, [page]);

  const loadMoreAuthors = () => {
    if (!isLoading) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setAuthors(initialAuthors);
  }, [initialAuthors]);

  const selectedAuthor =
    authors.find((author) => author.value === value) ||
    authors.find((author) => author.value === search) ||
    null;

  return (
    <Select
      value={selectedAuthor}
      onChange={(selected: { value: string } | null) => onChange(selected?.value || '')} 
      options={authors}
      placeholder="Search and select author"
      onInputChange={(input: string) => {
        setSearch(input); 
        debouncedSearch(input); 
      }}
      onMenuScrollToBottom={loadMoreAuthors} 
      isLoading={isLoading}
      isClearable 
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
