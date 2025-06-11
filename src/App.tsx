import React from 'react';
import { Building2, Users, Clock, TrendingUp } from 'lucide-react';
import { useInterviewData } from './hooks/useInterviewData';
import { useTheme } from './hooks/useTheme';
import { SearchBar } from './components/SearchBar';
import { FilterDropdown } from './components/FilterDropdown';
import { StatsCard } from './components/StatsCard';
import { TopicsPieChart } from './components/TopicsPieChart';
import { InterviewTable } from './components/InterviewTable';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    data,
    topicAnalysis,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    uniqueCompanies,
    uniqueRoles,
    uniqueDurations
  } = useInterviewData();

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ company: '', role: '', duration: '' });
    setSearchTerm('');
  };

  const stats = {
    totalQuestions: data.length,
    uniqueCompanies: new Set(data.map(item => item.company_name)).size,
    uniqueRoles: new Set(data.map(item => item.role)).size,
    topTopics: topicAnalysis.length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  Interview Questions Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Analyze interview patterns, topics, and trends across companies and roles
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            <div>
              <FilterDropdown
                label="Role"
                value={filters.role}
                options={uniqueRoles}
                onChange={(value) => updateFilter('role', value)}
                placeholder="All Roles"
              />
            </div>
            <div>
              <FilterDropdown
                label="Duration"
                value={filters.duration}
                options={uniqueDurations}
                onChange={(value) => updateFilter('duration', value)}
                placeholder="All Durations"
              />
            </div>
            <div>
              <FilterDropdown
                label="Company"
                value={filters.company}
                options={uniqueCompanies}
                onChange={(value) => updateFilter('company', value)}
                placeholder="All Companies"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Questions"
            value={stats.totalQuestions}
            icon={Building2}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Companies"
            value={stats.uniqueCompanies}
            icon={Building2}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard
            title="Roles"
            value={stats.uniqueRoles}
            icon={Users}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatsCard
            title="Topics"
            value={stats.topTopics}
            icon={TrendingUp}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          <TopicsPieChart
            data={topicAnalysis}
            title="Topic Distribution Analysis"
          />
        </div>

        {/* Interview Questions Table */}
        <InterviewTable data={data} />
      </div>
    </div>
  );
}

export default App;