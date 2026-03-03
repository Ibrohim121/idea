'use client';

import Toast from './Toast';
import { useToast } from '../contexts/ToastContext';

export default function ToastClient() {
  const { isToastVisible, toastMessage, hideToast } = useToast();
  
  return (
    <Toast
      message={toastMessage}
      isVisible={isToastVisible}
      onClose={hideToast}
    />
  );
}
