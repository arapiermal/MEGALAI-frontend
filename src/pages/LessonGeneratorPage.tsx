import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import ProviderSelector from '../components/ai/ProviderSelector';
import ModelSelector from '../components/ai/ModelSelector';
import ResultPane from '../components/ai/ResultPane';
import { generateLesson } from '../lib/aiClient';
import { Lesson } from '../lib/types';
import { useI18n } from '../i18n/i18n';

const LessonGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [objectives, setObjectives] = useState('');
  const [result, setResult] = useState<Lesson | null>(null);
  const { t } = useI18n();

  const handleGenerate = async () => {
    const lesson = await generateLesson({ topic, grade, objectives });
    setResult(lesson);
  };

  return (
    <div>
      <h1>{t('nav.lessonGenerator')}</h1>
      <div className="card">
        <Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Input label="Grade level" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <Textarea
          label="Objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          rows={3}
        />
        <div className="flex">
          <ProviderSelector />
          <ModelSelector />
        </div>
        <Button onClick={handleGenerate}>{t('action.generate')}</Button>
      </div>
      {result && <ResultPane title="Lesson plan" result={result} />}
    </div>
  );
};

export default LessonGeneratorPage;
