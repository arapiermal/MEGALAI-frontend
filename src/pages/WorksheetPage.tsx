import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultPane from '../components/ai/ResultPane';
import { generateWorksheet } from '../lib/aiClient';
import { Worksheet } from '../lib/types';
import { useI18n } from '../i18n/i18n';

const WorksheetPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [result, setResult] = useState<Worksheet | null>(null);
  const { t } = useI18n();

  const handleGenerate = async () => {
    const worksheet = await generateWorksheet({ topic, grade });
    setResult(worksheet);
  };

  return (
    <div>
      <h1>{t('nav.worksheet')}</h1>
      <div className="card">
        <Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Input label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <Button onClick={handleGenerate}>{t('action.generate')}</Button>
      </div>
      {result && <ResultPane title="Worksheet" result={result} />}
    </div>
  );
};

export default WorksheetPage;
