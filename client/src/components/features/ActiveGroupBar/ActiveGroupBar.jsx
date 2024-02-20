// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Component
import GroupActionsEmojiButton from "../../common/GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./ActiveGroupBar.module.css";

/**
 * Toolbar displaying a set of navigation icons for creating expenses, payments, and users, and for settling expenses within a group.
 * @param {boolean} [props.applyMargin=true] - Whether to apply margin for the element. Defaults to true.

 *
 * @returns {JSX.Element} React component. */
const ActiveGroupBar = ({ applyMargin = true }) => {
  const containerClassName = `${styles.groupActionsBar} ${applyMargin ? styles.withMargin : ""}`;
  return (
    <div
      className={containerClassName}
      role='toolbar'
      aria-label='active group bar'>
      {/* Button for navigating to group settings */}
      <GroupActionsEmojiButton
        route={"group-settings"}
        emoji={emojiConstants.settings}
        translateX={0}
        explanationText={"settings"}
        ariaLabel='group settings emoji'
      />
      {/* Button for navigating to settling expenses */}
      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        explanationText={"settle"}
        ariaLabel='settle expenses emoji'
        translateY={-0.1}
        scale={1.1}
      />
      {/* Button for navigating to adding users */}
      <GroupActionsEmojiButton
        route={"create-users"}
        emoji={emojiConstants.user}
        explanationText={"+member"}
        ariaLabel='add group member emoji'
        scale={0.97}
        translateY={-0.05}
      />

      {/* Button for navigating to adding payments */}
      <GroupActionsEmojiButton
        route={"create-payment"}
        emoji={emojiConstants.payment}
        explanationText={"+payment"}
        ariaLabel='add payment emoji'
      />

      {/* Button for navigating to adding expenses */}
      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        translateX={0.8}
        explanationText={"+expense"}
        ariaLabel='add expense emoji'
      />
    </div>
  );
};

export default ActiveGroupBar;
