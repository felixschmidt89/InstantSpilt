// React and Third-Party Libraries
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./ConfirmationModal.module.css";

/**
 * Component for displaying a confirmation message with options to confirm or cancel.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display in the modal.
 * @param {Function} props.onConfirm - Callback function to execute on confirmation.
 * @param {Function} props.onCancel - Callback function to execute on cancellation.
 * @param {boolean} props.isVisible - Flag indicating whether the modal is visible.
 * @param {Object} props.error - Error object to display in the modal, if any.
 * @returns {JSX.Element} React component.
 */
const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
  isVisible,
  error,
}) => {
  // Prevent modal from being closed when clicking the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Close modal when clicking outside of the modal
  const handleOutsideClick = () => {
    onCancel();
  };

  return (
    isVisible && (
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div className={styles.modalContent} onClick={handleModalClick}>
          <p>{message}</p>
          {error ? (
            <>
              <ErrorDisplay error={error} remWidth={30} errorFontColor={true} />
              <button onClick={onCancel}>OK</button>
            </>
          ) : (
            <>
              <ReactIconNavigate
                icon={IoCheckmarkCircleOutline}
                onClick={onConfirm}
                marginRight={"1"}
                iconSize='3'
              />
              <ReactIconNavigate
                icon={IoCloseCircleOutline}
                onClick={onCancel}
                iconSize='3'
              />
            </>
          )}
        </div>
      </div>
    )
  );
};
export default ConfirmationModal;
