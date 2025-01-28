// AuthorSelect.molecule.tsx

import React from 'react';
import Select from 'react-select';

interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
  options: { label: string, value: string }[];
  loadMoreAuthors: () => void;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({
  value,
  onChange,
  options,
  loadMoreAuthors,
  isLoading,
  search,
  onSearchChange
}) => {
  return (
    <div>
      {/* Search for authors */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)} // Update search term on change
        placeholder="Search for authors..."
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />

      <Select
        value={options.find(option => option.value === value)} // Find selected author
        onChange={(selectedOption: any) => onChange(selectedOption.value)} // Handle author change
        options={options}
        placeholder="Select Author"
        onMenuScrollToBottom={loadMoreAuthors} // Trigger load more authors when scrolled to bottom
        isLoading={isLoading} // Show loading state if true
        styles={{
          menu: (provided) => ({
            ...provided,
            maxHeight: 200,
            overflowY: 'auto',
          }),
        }}
      />
      {isLoading && <p>Loading more authors...</p>}
    </div>
  );
};

export default AuthorFilter;
