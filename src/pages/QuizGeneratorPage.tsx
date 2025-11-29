import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultPane from '../components/ai/ResultPane';
import { generateQuiz } from '../lib/aiClient';
import { Quiz } from '../lib/types';
import { useI18n } from '../i18n/i18n';

const QuizGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [result, setResult] = useState<Quiz | null>(null);
  const { t } = useI18n();

  const handleGenerate = async () => {
    const quiz = await generateQuiz({ topic, numQuestions });
    setResult(quiz);
  };

  return (
    <div>
      <h1>{t('nav.quizGenerator')}</h1>
      <div className="card">
        <Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Input
          label="Number of questions"
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        />
        <Button onClick={handleGenerate}>{t('action.generate')}</Button>
      </div>
      {result && <ResultPane title="Quiz" result={result} />}
    </div>
  );
};

export default QuizGeneratorPage;
