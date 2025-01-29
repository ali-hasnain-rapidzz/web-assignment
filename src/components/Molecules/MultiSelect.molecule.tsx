import React from 'react';

interface Option {
  id: string;
  title: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
}) => {
  const handleOptionClick = (optionId: string) => {
    const newSelectedOptions = selectedOptions?.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];
    onChange(newSelectedOptions);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 text-black">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        {options?.map((option) => (
          <div
            key={option.id}
            className="flex text-black items-center cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-lg"
            onClick={() => handleOptionClick(option.id)}
          >
            <input
              type="checkbox"
              checked={selectedOptions?.includes(option.id)}
              onChange={() => handleOptionClick(option.id)}
              className="mr-2"
            />
            <div className="text-sm font-semibold text-black">
              {option.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
