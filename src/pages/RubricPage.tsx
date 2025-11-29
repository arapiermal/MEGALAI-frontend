import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import ResultPane from '../components/ai/ResultPane';
import { generateRubric } from '../lib/aiClient';
import { Rubric } from '../lib/types';
import { useI18n } from '../i18n/i18n';

const RubricPage: React.FC = () => {
  const [assignmentType, setAssignmentType] = useState('Essay');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState<Rubric | null>(null);
  const { t } = useI18n();

  const handleGenerate = async () => {
    const rubric = await generateRubric({ assignmentType, details });
    setResult(rubric);
  };

  return (
    <div>
      <h1>{t('nav.rubric')}</h1>
      <div className="card">
        <Input
          label="Assignment type"
          value={assignmentType}
          onChange={(e) => setAssignmentType(e.target.value)}
        />
        <Textarea label="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <Button onClick={handleGenerate}>{t('action.generate')}</Button>
      </div>
      {result && <ResultPane title="Rubric" result={result} />}
    </div>
  );
};

export default RubricPage;
