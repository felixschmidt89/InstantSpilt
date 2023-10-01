import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavigateButton.module.css";

export default function NavigateButton({
  route,
  buttonText,
  alignment,
  margin,
}) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  // Determine & add the appropriate class based on the 'alignment' prop
  let containerClass = styles.container;

  if (alignment === "left") {
    containerClass = `${containerClass} ${styles.leftAligned}`;
  } else if (alignment === "right") {
    containerClass = `${containerClass} ${styles.rightAligned}`;
  } else if (alignment === "center") {
    containerClass = `${containerClass} ${styles.centerAligned}`;
  }

  // Apply the margin style based on the 'margin' prop
  const buttonStyle = margin ? { margin } : {};

  return (
    <div className={containerClass}>
      <button
        className={styles.button}
        onClick={handleNextClick}
        style={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
}
