// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

// Styles
import styles from "./CopyToClipboard.module.css";

/**
 * Component for rendering information and easily copying it to the clipboard, providing an instruction to copy and copy feedback to the user
 * @param {string} props.infoToCopy - The text to be copied to the clipboard.
 * @param {string} [props.inputFieldWidth="fit-content"] - The width of the input field.
 */
const CopyToClipboard = ({ infoToCopy, inputFieldWidth = "fit-content" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopyClick = () => {
    // select input field
    inputRef.current.select();
    // execute copy command
    document.execCommand("copy");
    // deselect the text
    inputRef.current.blur();
    setIsCopied(true);
  };

  return (
    <div>
      <input
        className={styles.inputField}
        type='text'
        value={infoToCopy}
        readOnly // Make input field read-only
        style={{ width: inputFieldWidth }}
        ref={inputRef}
      />
      <br />
      <button
        className={styles.button}
        onClick={handleCopyClick}
        disabled={isCopied} // Disable the button if 'isCopied' is true
      >
        <FontAwesomeIcon icon={faCopy} style={{ marginRight: "0.5rem" }} />
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyToClipboard;
