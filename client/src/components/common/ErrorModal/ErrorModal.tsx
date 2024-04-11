// React and Third-Party Libraries
import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { smallButtonStyles } from "../../../constants/stylesConstants";

// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./ErrorModal.module.css";

type ErrorModalProps = {
  // error message to display in the modal.
  error: string | null;
  // callback function to execute on modal close
  onClose: () => void;
  // flag indicating whether the modal is visible
  isVisible: boolean;
};

/**
 * Component for rendering an error message inside a modal.
 */
const ErrorModal = ({ error, onClose, isVisible }: ErrorModalProps) => {
  const { t } = useTranslation();

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
              <span className={styles.errorMessage}>
                <ErrorDisplay
                  error={error}
                  remWidth={30}
                  errorFontColor={false}
                />
              </span>
              <Button
                style={smallButtonStyles}
                variant='outlined'
                onClick={onClose}
                color='grey'>
                {t("error-modal-close-modal-button-text")}
              </Button>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ErrorModal;
