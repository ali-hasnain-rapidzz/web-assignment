import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string; // Tailwind color class, e.g., "text-blue-600"
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'text-blue-600',
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} border-4 border-t-transparent border-solid rounded-full animate-spin`}
        role="status"
      />
    </div>
  );
};

export default Loader;
