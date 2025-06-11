import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};