import React from "react";
import styles from "./Emoji.module.css";

/**
 * Component for rendering unicolor emojis with ARIA attributes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - ARIA label for the emoji.
 * @param {string} props.emoji - The emoji to be displayed.
 * @param {number} [props.scale=1] - The scale factor for the emoji in rem unit. Defaults to 1.
 * @param {number} [props.translateX=0] - The horizontal translation of the emoji in rem unit. Defaults to 0.
 * @param {number} [props.translateY=0] - The vertical translation of the emoji in rem unit. Defaults to 0.
 * @returns {JSX.Element} React component.
 */
const Emoji = ({ label, emoji, scale = 1, translateX = 0, translateY = 0 }) => {
  const emojiStyle = {
    transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
  };

  return (
    <span
      role='img'
      aria-label={label}
      className={styles.emojiFont}
      style={emojiStyle}>
      {emoji}
    </span>
  );
};

export default Emoji;
