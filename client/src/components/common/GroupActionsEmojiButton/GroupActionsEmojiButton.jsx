// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./GroupActionsEmojiButton.module.css";

/**
 * Renders a button component with an emoji, tooltips, and navigates to a specified route on click.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} props.emoji - The emoji to be rendered.
 * @param {string} props.tooltipText - The text of the tooltip.
 * @param {string} props.ariaLabel - The ARIA label for accessibility.
 * @returns {JSX.Element} React component. */
const GroupActionsEmojiButton = ({ route, emoji, tooltipText, ariaLabel }) => {
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
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={ariaLabel}>
        {emoji}
        {showTooltip && <div className={styles.tooltip}>{tooltipText}</div>}
      </button>
    </div>
  );
};

export default GroupActionsEmojiButton;
