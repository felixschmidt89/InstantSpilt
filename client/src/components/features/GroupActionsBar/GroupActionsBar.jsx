// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Component
import GroupActionsEmojiButton from "../../common/GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./GroupActionsBar.module.css";

/**
 * Toolbar displaying a set of navigation icons for creating expenses, payments, and users, and for settling expenses within a group.
 *
 * @returns {JSX.Element} React component. */
const GroupActionsBar = () => {
  return (
    <div
      className={styles.groupActionsBar}
      role='toolbar'
      aria-label='Group Actions'>
      {/* Button for navigating to group settings */}
      <GroupActionsEmojiButton
        route={"group-settings"}
        emoji={emojiConstants.settings}
        explanationText={"settings"}
        tooltipText='group settings'
        ariaLabel='group settings emoji'
      />
      {/* Button for navigating to settling expenses */}
      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        explanationText={"settle"}
        tooltipText='settle expenses'
        ariaLabel='settle expenses emoji'
      />
      {/* Button for navigating to adding users */}
      <GroupActionsEmojiButton
        route={"create-users"}
        emoji={emojiConstants.user}
        explanationText={"+member"}
        tooltipText='add group member'
        ariaLabel='add group member emoji'
      />

      {/* Button for navigating to adding payments */}
      <GroupActionsEmojiButton
        route={"create-payment"}
        emoji={emojiConstants.payment}
        explanationText={"+payment"}
        tooltipText='add payment'
        ariaLabel='add payment emoji'
      />

      {/* Button for navigating to adding expenses */}
      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        explanationText={"+expense"}
        tooltipText='add expense'
        ariaLabel='add expense emoji'
      />
    </div>
  );
};

export default GroupActionsBar;
