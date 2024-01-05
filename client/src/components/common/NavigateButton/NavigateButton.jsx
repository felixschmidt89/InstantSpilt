import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import styles from "./NavigateButton.module.css";

export default function NavigateButton({
  route,
  buttonText,
  alignment = "center",
  margin = "10px",
  isIcon = false,
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

  const buttonStyle = { margin };

  return (
    <div className={containerClass}>
      <button
        className={styles.button}
        onClick={handleNextClick}
        style={buttonStyle}>
        {isIcon ? ( // Check if it's an icon
          <FontAwesomeIcon icon={buttonText} />
        ) : (
          buttonText // Render as text
        )}
      </button>
    </div>
  );
}
