export interface InterviewData {
  company_name: string;
  role: string;
  duration: string;
  round: string;
  question: string;
  title: string;
  type: string;
  difficulty: string;
  topics_tags: string[];
  yoe: string;
  frequency: string;
  acceptance_rate: string;
  link: string;
  direct_link_to_interview: string;
  source_file: string;
}

export interface TopicAnalysis {
  topic: string;
  count: number;
  percentage: number;
}

export interface FilterState {
  company: string;
  role: string;
  duration: string;
}