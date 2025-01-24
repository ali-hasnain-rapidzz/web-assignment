import Swal from 'sweetalert2';

interface SwalOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const showSwal = (options: SwalOptions) => {
  Swal.fire({
    title: options.title || 'Alert',
    text: options.text || '',
    icon: options.icon || 'info',
    confirmButtonText: options.confirmButtonText || 'OK',
    showCancelButton: options.showCancelButton || false,
    cancelButtonText: options.cancelButtonText || 'Cancel',
  }).then((result) => {
    if (result.isConfirmed && options.onConfirm) {
      options.onConfirm();
    } else if (
      result.dismiss === Swal.DismissReason.cancel &&
      options.onCancel
    ) {
      options.onCancel();
    }
  });
};
