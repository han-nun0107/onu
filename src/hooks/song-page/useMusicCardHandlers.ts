import { useCallback } from "react";

export const useMusicCardHandlers = (
  handleEditClick: () => void,
  handleDeleteClick: () => void,
) => {
  const handleEditButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleEditClick();
    },
    [handleEditClick],
  );

  const handleDeleteButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleDeleteClick();
    },
    [handleDeleteClick],
  );

  return {
    handleEditButtonClick,
    handleDeleteButtonClick,
  };
};

