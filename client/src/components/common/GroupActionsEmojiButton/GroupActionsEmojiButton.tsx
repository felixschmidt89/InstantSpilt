// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./GroupActionsEmojiButton.module.css";

type GroupActionsEmojiButtonProps = {
  route: string;
  emoji: string;
  explanationText?: string;
  ariaLabel: string;
  translateX?: number;
  translateY?: number;
  scale?: number;
};

/**
 * Renders a button component with an emoji, action explanationText, and navigates to a specified route on click. Can be amended using translateX, translateY, and scale props.
 */
const GroupActionsEmojiButton = ({
  route,
  emoji,
  explanationText,
  ariaLabel,
  translateX = 0,
  translateY = 0,
  scale = 1,
}: GroupActionsEmojiButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      aria-label={ariaLabel}>
      <span
        className={styles.emoji}
        style={{
          transform: `translate(${translateX}rem, ${translateY}rem) scale(${scale})`,
        }}>
        {emoji}
      </span>
      {explanationText && (
        <span className={styles.iconExplanation}>{explanationText}</span>
      )}
    </div>
  );
};

export default GroupActionsEmojiButton;
