import { useState } from 'react';

const useModal = (callback: () => void = () => {}) => {
  const [open, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    callback();
  };

  return [open, handleOpen, handleClose] as [boolean, () => void, () => void];
};

export default useModal;
