// React and Third-Party Libraries
import React from "react";
import { Button } from "@mui/material";

// Constants and Utils
import { smallButtonStyles } from "../../../constants/stylesConstants";

// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./ErrorModal.module.css";

/**
 * Component for rendering an error message inside a modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to display in the modal.
 * @param {Function} props.onClose - Callback function to execute on modal close.
 * @param {boolean} props.isVisible - Flag indicating whether the modal is visible.
 * @returns {JSX.Element} React component.
 */
const ErrorModal = ({ error, onClose, isVisible }) => {
  // Prevent modal from being closed when clicking the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Close modal when clicking outside of the modal or OK button
  const handleOutsideClick = () => {
    onClose();
  };

  return (
    isVisible && (
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div className={styles.modalContent} onClick={handleModalClick}>
          {isVisible && (
            <>
              <ErrorDisplay
                error={error}
                remWidth={30}
                errorFontColor={false}
              />
              <Button
                style={smallButtonStyles}
                variant='outlined'
                onClick={onClose}
                color='grey'>
                ok
              </Button>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ErrorModal;
