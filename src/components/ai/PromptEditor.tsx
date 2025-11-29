import React from 'react';
import Textarea from '../ui/Textarea';

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const PromptEditor: React.FC<Props> = ({ label = 'Prompt', value, onChange }) => {
  return <Textarea label={label} value={value} onChange={(e) => onChange(e.target.value)} rows={5} />;
};

export default PromptEditor;
