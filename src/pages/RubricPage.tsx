import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { generateRubric } from '../lib/aiClient';
import { Rubric } from '../lib/types';
import { useI18n } from '../i18n/i18n';

const RubricPage: React.FC = () => {
  const [assignmentType, setAssignmentType] = useState('Essay');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<Rubric | null>(null);
  const { t } = useI18n();

  const handleGenerate = async () => {
    const rubric = await generateRubric({ assignment_type: assignmentType, description });
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
        <Textarea
          label="Details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleGenerate}>{t('action.generate')}</Button>
      </div>
      {result && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{result.assignment_type}</h3>
          <ul>
            {result.criteria.map((criterion) => (
              <li key={criterion.criterion}>
                <strong>{criterion.criterion}</strong> ({criterion.points} points)
                <div>{criterion.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RubricPage;
