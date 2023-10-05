import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SplitExpensesActionsButton.module.css";

const GroupActionButton = ({ route, buttonText, tooltipText }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        {buttonText}
        {showTooltip && <div className={styles.tooltip}>{tooltipText}</div>}
      </button>
    </div>
  );
};

export default GroupActionButton;
