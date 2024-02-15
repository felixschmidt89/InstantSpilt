import React from "react";
import styles from "./Emoji.module.css"; // Import the CSS module

/**
 * Component for rendering emojis with ARIA attributes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - ARIA label for the emoji.
 * @param {string} props.emoji - The emoji to be displayed.
 * @param {string} [props.className] - Additional class name for styling.
 * @returns {JSX.Element} React component. */
const Emoji = ({ label, emoji, className }) => {
  const combinedClassName = className
    ? `${styles.emoji} ${className}`
    : styles.emoji;

  return (
    <span role='img' aria-label={label} className={combinedClassName}>
      {emoji}
    </span>
  );
};

export default Emoji;
