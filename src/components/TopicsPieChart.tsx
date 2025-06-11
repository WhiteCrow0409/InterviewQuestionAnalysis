import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TopicAnalysis } from '../types';

interface TopicsPieChartProps {
  data: TopicAnalysis[];
  title: string;
}

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#14B8A6', '#F43F5E', '#8B5A2B', '#059669', '#DC2626'
];

export const TopicsPieChart: React.FC<TopicsPieChartProps> = ({ data, title }) => {
  const topTopics = data.slice(0, 10);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{data.topic}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Count: <span className="font-medium text-blue-600 dark:text-blue-400">{data.count}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Percentage: <span className="font-medium text-blue-600 dark:text-blue-400">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-700/50">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topTopics}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              label={({ topic, percentage }) => 
                percentage > 5 ? `${topic} (${percentage.toFixed(1)}%)` : ''
              }
              animationBegin={0}
              animationDuration={800}
            >
              {topTopics.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};