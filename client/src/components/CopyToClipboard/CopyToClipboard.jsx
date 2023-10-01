import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import styles from "./CopyToClipboard.module.css";

const CopyToClipboard = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textField = document.createElement("input");
    textField.value = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setIsCopied(true);
  };

  return (
    <div>
      <input className={styles.inputField} type='text' value={url} readOnly />
      <br />
      <button
        className={styles.button}
        onClick={handleCopyClick}
        disabled={isCopied}>
        <FontAwesomeIcon icon={faCopy} />{" "}
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default CopyToClipboard;
