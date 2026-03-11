// PEMM Assessment Types
export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: number;
  question: string;
  description: string;
  options: {
    value: 1 | 2 | 3 | 4 | 5;
    label: string;
    description: string;
  }[];
  area: 'infrastructure' | 'quality' | 'scalability';
}

export interface AssessmentResponse {
  questionId: number;
  answer: 1 | 2 | 3 | 4 | 5;
}

export interface AssessmentResult {
  totalScore: number;
  level: MaturityLevel;
  infrastructure: number;
  quality: number;
  scalability: number;
  weaknesses: Array<{
    area: string;
    score: number;
    label: string;
  }>;
  inDevelopment: Array<{
    area: string;
    score: number;
    label: string;
  }>;
  strengths: Array<{
    area: string;
    score: number;
    label: string;
  }>;
  criticalAlert: boolean;
}

export interface UserInfo {
  name: string;
  email?: string;
  teamSize?: string;
}
