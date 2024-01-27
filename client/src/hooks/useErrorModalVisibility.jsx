import { useState } from "react";

/**
 * Hook for managing error modal visibility.
 *
 * @returns {Object} Object containing state and functions for error modal.
 * @property {boolean} isErrorModalVisible - Flag indicating whether the error modal is visible.
 * @property {Function} handleOnError - Function to trigger displaying the error modal.
 * @property {Function} handleCloseErrorModal - Function to close the error modal.
 */
const useErrorModalVisibility = () => {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleOnError = () => {
    setIsErrorModalVisible(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  return {
    isErrorModalVisible,
    handleOnError,
    handleCloseErrorModal,
  };
};

export default useErrorModalVisibility;
