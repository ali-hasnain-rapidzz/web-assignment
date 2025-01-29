import React from 'react';
import Select from 'react-select';

interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
  options: { label: string; value: string }[];
  loadMoreAuthors: () => void;
  isLoading: boolean;
  onSearchChange: (search: string) => void;
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({
  value,
  onChange,
  options,
  loadMoreAuthors,
  isLoading,
  onSearchChange,
}) => {
  return (
    <Select
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption: any) => onChange(selectedOption.value)}
      options={options}
      placeholder="Search and select author"
      onInputChange={(inputValue) => onSearchChange(inputValue)}
      onMenuScrollToBottom={loadMoreAuthors}
      isLoading={isLoading}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '300px', // Adjust dropdown width
        }),
        menu: (provided) => ({
          ...provided,
          width: '300px', // Ensure dropdown menu width matches
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'black', // Ensure dropdown menu width matches
        }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: '200px', // Set max height for scrolling
          overflowY: 'auto', // Enable scroll only inside options
        }),
      }}
    />
  );
};

export default AuthorFilter;
