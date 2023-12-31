// DONE adding only meaningful necessary comments

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GroupActionsButton.module.css";

/**
 * Button component rendering text and tooltips and navigates to a specified route when clicked.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} props.buttonText - The text content of the button.
 * @param {string} props.tooltipText - The text content of the tooltip.
 * @returns {JSX.Element} - The rendered GroupActionButton component.
 */

const GroupActionsButton = ({ route, buttonText, tooltipText }) => {
  const navigate = useNavigate();

  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  // handle button click, navigates to specified route
  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)} // Show tooltip on mouse enter
        onMouseLeave={() => setShowTooltip(false)}>
        {/* Hide tooltip on mouse leave */}
        {buttonText} {/* Display button text */}
        {showTooltip && <div className={styles.tooltip}>{tooltipText}</div>}
        {/* Display tooltip if showTooltip is true */}
      </button>
    </div>
  );
};

export default GroupActionsButton;
