import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 h-6 w-6 text-amber-500 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-6 w-6 text-blue-400 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};