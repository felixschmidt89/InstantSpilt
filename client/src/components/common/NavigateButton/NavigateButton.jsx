import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./NavigateButton.module.css";

const NavigateButton = ({
  route,
  buttonText,
  alignment = "center",
  margin = "1rem",
  isIcon = false,
}) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  // Determine & add the appropriate class based on the 'alignment' prop
  const containerClass = `${styles.container} ${styles[`${alignment}Aligned`]}`;

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
};

export default NavigateButton;
