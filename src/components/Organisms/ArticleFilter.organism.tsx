import React from 'react';
import Select from '@Components/Atoms/Select.atom';
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
  preferences: string[];
  initialAuthors: { label: string; value: string }[]; // Pass initial authors
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({
  filters,
  onFilterChange,
  preferences,
  initialAuthors, // Receive initial authors
}) => {
  return (
    <div className="flex max-w-full flex-wrap gap-4 sm:flex-nowrap">
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
      <Select
        value={filters.source}
        onChange={(e) => onFilterChange({ source: e.target.value })}
        options={preferences?.map((item) => ({ label: item, value: item }))}
        placeholder="Select Source"
      />
      {/* Author Filter now manages its own API calls */}
      <AuthorFilter
        value={filters.author}
        onChange={(val) => onFilterChange({ author: val })}
        initialAuthors={initialAuthors} // Pass initial authors only once
      />
    </div>
  );
};

export default ArticleFilter;
