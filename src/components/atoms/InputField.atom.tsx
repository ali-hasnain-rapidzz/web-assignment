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
  error?: string; // Error message to display
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
  error, // Error message
}) => {
  return (
    <div
      className={`mb-4 ${isSearchBar ? 'mt-4 w-full sm:w-1/2 lg:w-1/3' : ''}`}
    >
      {/* Render label only for non-search input fields */}
      {!isSearchBar && label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>} {/* Add asterisk if required */}
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
          error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {/* Display error message if provided */}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
