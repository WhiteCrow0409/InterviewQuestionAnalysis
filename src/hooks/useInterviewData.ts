import { useState, useEffect, useMemo } from 'react';
import { InterviewData, FilterState, TopicAnalysis } from '../types';
import interviewData from '../data/intiut.json';

export const useInterviewData = () => {
  const [data] = useState<InterviewData[]>(interviewData as InterviewData[]);
  const [filters, setFilters] = useState<FilterState>({
    company: '',
    role: '',
    duration: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesCompany = !filters.company || 
        item.company_name.toLowerCase().includes(filters.company.toLowerCase());
      
      const matchesRole = !filters.role || 
        item.role.toLowerCase().includes(filters.role.toLowerCase());
      
      const matchesDuration = !filters.duration || 
        item.duration.toLowerCase().includes(filters.duration.toLowerCase());
      
      const matchesSearch = !searchTerm || 
        item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topics_tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCompany && matchesRole && matchesDuration && matchesSearch;
    });
  }, [data, filters, searchTerm]);

  const topicAnalysis = useMemo(() => {
    const topicCounts = new Map<string, number>();
    let totalTopics = 0;

    filteredData.forEach(item => {
      item.topics_tags.forEach(topic => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        totalTopics++;
      });
    });

    const analysis: TopicAnalysis[] = Array.from(topicCounts.entries())
      .map(([topic, count]) => ({
        topic,
        count,
        percentage: (count / totalTopics) * 100
      }))
      .sort((a, b) => b.count - a.count);

    return analysis;
  }, [filteredData]);

  const uniqueCompanies = useMemo(() => 
    [...new Set(data.map(item => item.company_name))].sort(), [data]);

  const uniqueRoles = useMemo(() => 
    [...new Set(data.map(item => item.role))].sort(), [data]);

  const uniqueDurations = useMemo(() => 
    [...new Set(data.map(item => item.duration))].sort(), [data]);

  return {
    data: filteredData,
    topicAnalysis,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    uniqueCompanies,
    uniqueRoles,
    uniqueDurations
  };
};