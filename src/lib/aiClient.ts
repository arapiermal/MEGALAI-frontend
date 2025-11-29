import { Lesson, Quiz, Worksheet, Rubric } from './types';

export const generateLesson = async (input: {
  topic: string;
  grade: string;
  objectives: string;
}): Promise<Lesson> => {
  return Promise.resolve({
    topic: input.topic,
    gradeLevel: input.grade,
    objectives: input.objectives.split(',').map((o) => o.trim()).filter(Boolean),
    content: `Lesson plan for ${input.topic} at grade ${input.grade}. Objectives: ${input.objectives}.`,
  });
};

export const generateQuiz = async (input: {
  topic: string;
  numQuestions: number;
}): Promise<Quiz> => {
  const questions = Array.from({ length: input.numQuestions }).map((_, idx) => ({
    question: `Question ${idx + 1} about ${input.topic}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: idx % 4,
  }));
  return Promise.resolve({ topic: input.topic, questions });
};

export const generateWorksheet = async (input: { topic: string; grade: string }): Promise<Worksheet> => {
  return Promise.resolve({
    topic: input.topic,
    sections: [`Warmup for ${input.topic}`, `Practice problems for grade ${input.grade}`],
  });
};

export const generateRubric = async (input: { assignmentType: string; details: string }): Promise<Rubric> => {
  return Promise.resolve({
    assignmentType: input.assignmentType,
    criteria: [
      {
        name: 'Clarity',
        levels: { Excellent: 'Clear and concise', Good: 'Mostly clear', Fair: 'Some confusion' },
      },
      {
        name: 'Depth',
        levels: { Excellent: 'Thorough analysis', Good: 'Solid points', Fair: 'Limited depth' },
      },
    ],
  });
};

export const runTextTool = async (input: { mode: string; text: string }): Promise<string> => {
  return Promise.resolve(`${input.mode.toUpperCase()} RESULT: ${input.text.slice(0, 80)}...`);
};
