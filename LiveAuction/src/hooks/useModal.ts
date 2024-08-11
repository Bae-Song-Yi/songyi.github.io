import { useState, useCallback } from 'react';

export type IModalProps<T> = T & { close: () => void };

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [close]);

  return { isOpen, open, close };
};
