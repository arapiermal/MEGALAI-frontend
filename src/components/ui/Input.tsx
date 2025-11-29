import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="form-group">
      {label && <label className="label">{label}</label>}
      <input className="input" {...props} />
    </div>
  );
};

export default Input;
