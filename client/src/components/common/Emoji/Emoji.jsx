import React from "react";
import styles from "./Emoji.module.css"; // Import the CSS module

/**
 * Component for rendering emojis with ARIA attributes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - ARIA label for the emoji.
 * @param {string} props.emoji - The emoji to be displayed.
 * @param {string} [props.className] - Additional class name for styling.
 * @param {boolean} [props.shrinkOnSmallDevices=false] - Whether to shrink the emoji on small devices.
 * @returns {JSX.Element} React component. */
const Emoji = ({ label, emoji, className, shrinkOnSmallDevices = false }) => {
  const combinedClassName = className
    ? `${styles.emoji} ${className}`
    : styles.emoji;

  const emojiStyle = shrinkOnSmallDevices ? styles.emojiShrink : "";

  return (
    <span
      role='img'
      aria-label={label}
      className={`${combinedClassName} ${emojiStyle}`}>
      {emoji}
    </span>
  );
};

export default Emoji;
