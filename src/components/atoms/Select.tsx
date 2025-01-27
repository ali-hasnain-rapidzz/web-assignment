import React from 'react';

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
