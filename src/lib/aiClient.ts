import { apiClient } from './apiClient';
import type {
  Lesson,
  LessonInput,
  Quiz,
  QuizInput,
  Worksheet,
  WorksheetInput,
  Rubric,
  RubricInput,
  TextToolInput,
  TextToolResult,
} from './types';

export const generateLesson = async (input: LessonInput): Promise<Lesson> => {
  const { data } = await apiClient.post<Lesson>('/ai/lesson', input);
  return data;
};

export const generateQuiz = async (input: QuizInput): Promise<Quiz> => {
  const { data } = await apiClient.post<Quiz>('/ai/quiz', input);
  return data;
};

export const generateWorksheet = async (input: WorksheetInput): Promise<Worksheet> => {
  const { data } = await apiClient.post<Worksheet>('/ai/worksheet', input);
  return data;
};

export const generateRubric = async (input: RubricInput): Promise<Rubric> => {
  const { data } = await apiClient.post<Rubric>('/ai/rubric', input);
  return data;
};

export const runTextTool = async (input: TextToolInput): Promise<TextToolResult> => {
  const { data } = await apiClient.post<TextToolResult>('/ai/text-tool', input);
  return data;
};
