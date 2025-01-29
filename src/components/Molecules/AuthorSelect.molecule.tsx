import React from 'react';
import Select from 'react-select';

interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
  options: { label: string; value: string }[];
  loadMoreAuthors: () => void;
  isLoading: boolean;
  onSearchChange: (search: string) => void;
  fetchAuthorOptions: (page: number, search: string) => void; // API call function
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({
  value,
  onChange,
  options,
  loadMoreAuthors,
  isLoading,
  onSearchChange,
  fetchAuthorOptions,
}) => {

  const handleChange = (selectedOption: any) => {
    // If the option is empty (deselect), call the API with empty value
    const selectedValue = selectedOption?.value || '';
    onChange(selectedValue);

    // If deselected, call the API with an empty string to reset authors
    if (selectedValue === '') {
      fetchAuthorOptions(1, ''); // Call API with empty search value
    }
  };

  return (
    <Select
      value={options.find((option) => option.value === value)}
      onChange={handleChange}
      options={options}
      placeholder="Search and select author"
      onInputChange={(inputValue) => onSearchChange(inputValue)}
      onMenuScrollToBottom={loadMoreAuthors}
      isLoading={isLoading}
      isClearable={true} // Allow clearing the selection
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
          color: 'black', // Change placeholder color
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
