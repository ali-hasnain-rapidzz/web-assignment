import React from 'react';

interface ParagraphProps {
  text: string;
  className?: string; // Optional className prop for custom styling
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className }) => {
  return (
    <p className={`text-base text-gray-700 ${className}`}>
      {text}
    </p>
  );
};

export default Paragraph;
