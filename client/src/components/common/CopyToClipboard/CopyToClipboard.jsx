// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";

// Hooks
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../ErrorModal/ErrorModal";

// Styles
import styles from "./CopyToClipboard.module.css";

/**
 * Component for rendering information and easily copying it to the clipboard, providing a icon to copy and successful copy feedback to the user
 * @param {string} props.infoToCopy - The text to be copied to the clipboard.
 * @param {string} [props.inputFieldWidth] - The width of the input field. Defaults to 'fit-content'
 */
const CopyToClipboard = ({ infoToCopy, inputFieldWidth = "fit-content" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleCopyClick = async () => {
    try {
      // Copy text to clipboard
      await navigator.clipboard.writeText(inputRef.current.value);
      devLog("Copied to clipboard:", inputRef.current.value);
      setIsCopied(true);
      // Clear the text selection
      window.getSelection().removeAllRanges();
    } catch (error) {
      devLog("Error copying to clipboard:", error);
      setError("Error copying content, please copy manually.");
      displayErrorModal();
      setIsCopied(false);
    }
  };

  return (
    <span className={styles.container}>
      <input
        className={styles.inputField}
        type='text'
        value={infoToCopy}
        readOnly // Make input field read-only
        style={{ width: inputFieldWidth }}
        ref={inputRef}
      />
      <button
        className={`${styles.button} ${
          isCopied ? styles.isCopied : styles.notCopied
        }`}
        onClick={handleCopyClick}
        disabled={isCopied}>
        {isCopied ? <LuCopyCheck /> : <LuCopy />}
      </button>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </span>
  );
};

export default CopyToClipboard;
