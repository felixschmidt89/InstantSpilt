import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./NavigateIcon.module.css";

const NavigateIcon = ({ icon, route, tooltip }) => {
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
      {showTooltip && <div className={styles.tooltip}>{tooltip}</div>}
    </div>
  );
};

export default NavigateIcon;
