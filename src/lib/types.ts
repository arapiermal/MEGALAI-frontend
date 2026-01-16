export interface UserRead {
  email: string;
  name: string;
  role: string;
  organization_id?: string | null;
  current_organization_id?: string | null;
  is_active: boolean;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserRead;
}

export interface LessonInput {
  topic: string;
  grade: string;
  objectives: string[];
}

export interface Lesson {
  title: string;
  overview: string;
  objectives: string[];
  activities: string[];
  assessment: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizInput {
  topic: string;
  num_questions: number;
}

export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

export interface WorksheetInput {
  topic: string;
  grade: string;
}

export interface Worksheet {
  topic: string;
  activities: string[];
}

export interface RubricCriterion {
  criterion: string;
  description: string;
  points: number;
}

export interface RubricInput {
  assignment_type: string;
  description?: string;
}

export interface Rubric {
  assignment_type: string;
  criteria: RubricCriterion[];
}

export interface TextToolInput {
  mode: string;
  text: string;
}

export interface TextToolResult {
  output: string;
}

export interface ProgressSummary {
  roleView: string;
  stats: any;
}
