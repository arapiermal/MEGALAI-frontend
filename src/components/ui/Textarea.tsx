import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="form-group">
      {label && <label className="label">{label}</label>}
      <textarea className="textarea" {...props} />
    </div>
  );
};

export default Textarea;
