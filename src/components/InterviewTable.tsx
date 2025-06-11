import React, { useState } from 'react';
import { ExternalLink, Clock, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { InterviewData } from '../types';

interface InterviewTableProps {
  data: InterviewData[];
}

export const InterviewTable: React.FC<InterviewTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof InterviewData | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'medium':
      case 'moderate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const handleSort = (field: keyof InterviewData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const SortButton: React.FC<{ field: keyof InterviewData; children: React.ReactNode }> = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
        <ChevronUp className="h-4 w-4" /> : 
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Interview Questions</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Showing {paginatedData.length} of {sortedData.length} questions
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="title">Question</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="role">Role & Duration</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="difficulty">Difficulty</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Topics
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Links
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.title || item.question || 'Untitled Question'}
                    </div>
                    {item.question && item.title && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.question}
                      </div>
                    )}
                    {item.round && (
                      <div className="flex items-center mt-2">
                        <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.round}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.role}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.duration}</div>
                    {item.yoe && (
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">YOE: {item.yoe}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.topics_tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.topics_tags.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                        +{item.topics_tags.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150 hover:scale-110 transform"
                        title="LeetCode Link"
                      >
                        <BookOpen className="h-4 w-4" />
                      </a>
                    )}
                    {item.direct_link_to_interview && (
                      <a
                        href={item.direct_link_to_interview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-150 hover:scale-110 transform"
                        title="Interview Experience"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};