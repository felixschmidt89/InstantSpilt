import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "./NavigateFontAwesomeIcon.module.css";

const NavigateFontAwesomeIcon = ({ icon, route, tooltip }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    navigate(`${route}`);
  };

  return (
    <div
      className={styles.iconContainer}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      <FontAwesomeIcon
        icon={icon}
        onClick={handleClick}
        className={styles.icon}
      />
      {tooltip && showTooltip && (
        <div className={styles.tooltip}>{tooltip}</div>
      )}
    </div>
  );
};

export default NavigateFontAwesomeIcon;
