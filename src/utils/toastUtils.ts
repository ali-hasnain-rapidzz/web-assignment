// src/utils/toastUtils.ts
import { toast } from 'react-toastify';

interface ToastOptions {
  title?: string;
  text?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  autoClose?: number;
  onClose?: () => void;
}

export const showToast = (options: ToastOptions) => {
  const { title, text, type = 'info', autoClose = 5000, onClose } = options;

  // Show toast with the provided options
  toast[type](`${title ? `${title}: ` : ''}${text}`, {
    autoClose,
    onClose,
  });
};
