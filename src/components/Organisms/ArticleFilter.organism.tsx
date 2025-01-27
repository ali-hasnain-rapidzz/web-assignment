// src/components/Articles/ArticleFilter.tsx

import React from 'react';
import Select from '@Components/Atoms/Select.atom'; // Import the Select component

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
  // Define the options for each filter
  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  const categoryOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'sports', label: 'Sports' },
    { value: 'business', label: 'Business' },
  ];

  const sourceOptions = [
    { value: 'cnn', label: 'CNN' },
    { value: 'bbc', label: 'BBC' },
    { value: 'nytimes', label: 'NY Times' },
  ];

  const authorOptions = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
  ];

  return (
    <div className="flex flex-wrap  gap-4 sm:flex-nowrap">
      {/* Date Filter */}
      <Select
        value={filters.date}
        onChange={(e) => onFilterChange({ date: e.target.value })}
        options={dateOptions}
        placeholder="Select Date"
      />

      {/* Category Filter */}
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
        options={sourceOptions}
        placeholder="Select Source"
      />

      {/* Author Filter */}
      <Select
        value={filters.author}
        onChange={(e) => onFilterChange({ author: e.target.value })}
        options={authorOptions}
        placeholder="Select Author"
      />
    </div>
  );
};

export default ArticleFilter;
