import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-3 text-base border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-white dark:bg-gray-800">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};