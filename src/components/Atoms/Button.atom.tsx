import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  children,
}) => {
  const dynamicClasses = disabled
    ? 'bg-gray-400 cursor-not-allowed' 
    : 'bg-blue-600 hover:bg-blue-700'; 

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${dynamicClasses} px-4 py-2  rounded-md`}
      disabled={disabled}
    >
      {label && <span>{label}</span>}
      {children} 
    </button>
  );
};

export default Button;
