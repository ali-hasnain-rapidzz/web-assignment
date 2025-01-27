import React from 'react';
import { AiOutlineClose } from '@Components/Atoms/Icons.atom';
import Button from '@Components/Atoms/Button.atom';
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
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500  focus:outline-none bg-transparent"
        >
          <AiOutlineClose /> {/* React icon for the close button */}
        </Button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
