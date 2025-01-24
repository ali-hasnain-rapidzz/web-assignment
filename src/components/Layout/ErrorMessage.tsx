// src/components/Layout/ErrorMessage.tsx

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-2 mt-2 text-sm text-red-600 bg-red-100 rounded">
      {message}
    </div>
  );
};

export default ErrorMessage;
