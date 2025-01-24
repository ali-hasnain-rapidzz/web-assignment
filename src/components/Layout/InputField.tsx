// src/components/Articles/InputField.tsx

import React from 'react';

interface InputFieldProps {
  id: string;
  label?: string; // Optional for search bar
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isSearchBar?: boolean; // Boolean to distinguish if it's a search bar or not
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  isSearchBar = false, // Default to false for regular input fields
}) => {
  return (
    <div
      className={`mb-4 ${isSearchBar ? 'mt-4 w-full sm:w-1/2 lg:w-1/3' : ''}`}
    >
      {/* Render label only for non-search input fields */}
      {!isSearchBar && label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isSearchBar ? '' : 'focus:ring-blue-500'
        }`}
      />
    </div>
  );
};

export default InputField;
