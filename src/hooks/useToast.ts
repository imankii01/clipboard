import { useState } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};