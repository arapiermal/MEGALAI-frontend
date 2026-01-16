import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import ProviderSelector from '../components/ai/ProviderSelector';
import ModelSelector from '../components/ai/ModelSelector';
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
    const parsedObjectives = objectives
      .split(/\n|,/)
      .map((objective) => objective.trim())
      .filter(Boolean);
    const lesson = await generateLesson({ topic, grade, objectives: parsedObjectives });
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
      {result && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{result.title}</h3>
          <p>{result.overview}</p>
          <div>
            <strong>Objectives</strong>
            <ul>
              {result.objectives.map((objective, index) => (
                <li key={`${objective}-${index}`}>{objective}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Activities</strong>
            <ul>
              {result.activities.map((activity, index) => (
                <li key={`${activity}-${index}`}>{activity}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Assessment</strong>
            <p>{result.assessment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonGeneratorPage;
