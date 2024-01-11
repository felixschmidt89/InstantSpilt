import React from "react";
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {Object} props - Component props.
 * @param {string | object} props.error - The error message or error object to display.
 * @param {number} props.remWidth - The width in rem (default is 20).
 */
const ErrorDisplay = ({ error, remWidth = 20 }) => {
  if (!error) {
    return null;
  }

  // Determine the error message to display
  const errorMessage =
    typeof error === "string" ? error : error.message || "An error occurred";

  return (
    <p className={styles.errorMessage} style={{ width: `${remWidth}rem` }}>
      {errorMessage}
    </p>
  );
};

export default ErrorDisplay;
