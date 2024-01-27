import React from "react";

/**
 * Component for rendering emojis with ARIA attributes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - ARIA label for the emoji.
 * @param {string} props.emoji - The emoji to be displayed.
 * @param {string} [props.className] - Additional class name for styling.
 * @returns {JSX.Element} React component. */
const Emoji = ({ label, emoji, className }) => (
  <span role='img' aria-label={label} className={className}>
    {emoji}
  </span>
);

export default Emoji;
