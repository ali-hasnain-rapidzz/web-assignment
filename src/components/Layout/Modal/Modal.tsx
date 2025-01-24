// src/components/Layout/Modal.tsx

import React from 'react';
import Button from '../Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <Button
          label={'&times;'}
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
