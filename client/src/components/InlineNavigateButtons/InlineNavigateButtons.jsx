import React from "react";
import NavigateButton from "../NavigateButton/NavigateButton";
import styles from "./InlineNavigateButtons.module.css";

const InlineNavigateButtons = ({ buttonData }) => {
  return (
    <div className={styles.buttonContainer}>
      {buttonData.map((buttonProps, index) => (
        <NavigateButton key={index} {...buttonProps} />
      ))}
    </div>
  );
};

export default InlineNavigateButtons;
