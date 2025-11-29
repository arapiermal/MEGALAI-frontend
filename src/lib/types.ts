export interface Lesson {
  topic: string;
  gradeLevel: string;
  objectives: string[];
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

export interface Worksheet {
  topic: string;
  sections: string[];
}

export interface RubricCriterion {
  name: string;
  levels: { [level: string]: string };
}

export interface Rubric {
  assignmentType: string;
  criteria: RubricCriterion[];
}

export interface ProgressSummary {
  roleView: string;
  stats: any;
}
