import React, { useState } from 'react';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultPane from '../components/ai/ResultPane';
import { runTextTool } from '../lib/aiClient';
import { useI18n } from '../i18n/i18n';

const TextToolsPage: React.FC = () => {
  const [mode, setMode] = useState('translate');
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { t } = useI18n();

  const handleRun = async () => {
    const res = await runTextTool({ mode, text });
    setResult(res);
  };

  return (
    <div>
      <h1>{t('nav.textTools')}</h1>
      <div className="card">
        <Select
          label="Mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          options={[
            { value: 'translate', label: 'Translate' },
            { value: 'simplify', label: 'Simplify' },
            { value: 'summarize', label: 'Summarize' },
            { value: 'level', label: 'Leveler' },
          ]}
        />
        <Textarea label="Text" value={text} onChange={(e) => setText(e.target.value)} rows={4} />
        <Button onClick={handleRun}>{t('action.generate')}</Button>
      </div>
      {result && <ResultPane title="Result" result={result} />}
    </div>
  );
};

export default TextToolsPage;
