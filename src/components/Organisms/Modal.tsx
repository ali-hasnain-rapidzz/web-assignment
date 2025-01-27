import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon from react-icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        {/* Close button with react-icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <AiOutlineClose /> {/* React icon for the close button */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
