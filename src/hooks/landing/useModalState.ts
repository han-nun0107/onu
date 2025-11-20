import { useState, useCallback } from "react";

export const useModalState = () => {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

  const handleOpen = useCallback((key: string) => {
    setOpenModals((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleClose = useCallback((key: string) => {
    setOpenModals((prev) => ({ ...prev, [key]: false }));
  }, []);

  const getIsOpen = useCallback(
    (key: string) => openModals[key] || false,
    [openModals],
  );

  const setIsOpen = useCallback(
    (key: string, isOpen: boolean) => {
      if (isOpen) {
        handleOpen(key);
      } else {
        handleClose(key);
      }
    },
    [handleOpen, handleClose],
  );

  return {
    getIsOpen,
    setIsOpen,
  };
};
