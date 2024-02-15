// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./GroupActionsEmojiButton.module.css";

/**
 * Renders a button component with an emoji, emoji description, and navigates to a specified route on click.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} props.emoji - The emoji to be rendered.
 * @param {string} props.explanationText - The icon description text rendered below the component. Only rendered if given.
 * @param {string} props.ariaLabel - The ARIA label for accessibility.
 * @returns {JSX.Element} React component. */
const GroupActionsEmojiButton = ({
  route,
  emoji,
  explanationText,
  tooltipText,
  ariaLabel,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      aria-label={ariaLabel}>
      <span className={styles.icon}>{emoji}</span>
      {explanationText && (
        <span className={styles.iconExplanation}>{explanationText}</span>
      )}
    </div>
  );
};

export default GroupActionsEmojiButton;
