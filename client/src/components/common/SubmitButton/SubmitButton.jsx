// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./SubmitButton.module.css";

const SubmitButton = ({ buttonText }) => {
  return (
    <button type='submit' className={styles.button}>
      {buttonText}
    </button>
  );
};

export default SubmitButton;
