// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";

// Components
import ReactIconNavigate from "../InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./CopyToClipboard.module.css";

/**
 * Component for rendering information and easily copying it to the clipboard, providing an instruction to copy and copy feedback to the user
 * @param {string} props.infoToCopy - The text to be copied to the clipboard.
 * @param {string} [props.inputFieldWidth] - The width of the input field. Defaults to 'fit-content'
 */
const CopyToClipboard = ({ infoToCopy, inputFieldWidth = "fit-content" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

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
      setIsCopied(false);
    }
  };

  return (
    <div className={styles.container}>
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
        {isCopied ? (
          <ReactIconNavigate
            icon={LuCopyCheck}
            iconSize='1.8'
            translateY={0.2}
            cursorPointer={false}
          />
        ) : (
          <ReactIconNavigate icon={LuCopy} iconSize='1.8' translateY={0.2} />
        )}
      </button>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default CopyToClipboard;
