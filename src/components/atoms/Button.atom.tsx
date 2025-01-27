import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode; // Allow any JSX content as children
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  children,
}) => {
  // Define the dynamic class names
  const dynamicClasses = disabled
    ? 'bg-gray-400 cursor-not-allowed' // If disabled
    : 'bg-blue-600 hover:bg-blue-700'; // If enabled

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${dynamicClasses} px-4 py-2  rounded-md`}
      disabled={disabled}
    >
      {label && <span>{label}</span>}
      {children} {/* Render children if passed */}
    </button>
  );
};

export default Button;
