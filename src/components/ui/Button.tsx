import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={`button ${variant === 'secondary' ? 'secondary' : ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
