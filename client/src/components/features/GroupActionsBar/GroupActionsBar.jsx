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
 * @component
 * @returns {JSX.Element} - React component.
 */
const GroupActionsBar = () => {
  return (
    <div
      className={styles.groupActionsBar}
      role='toolbar'
      aria-label='Group Actions'>
      {/* Button for navigating to adding expenses */}
      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        tooltipText='add expense'
        ariaLabel='add expense emoji'
      />

      {/* Button for navigating to adding payments */}
      <GroupActionsEmojiButton
        route={"create-payment"}
        emoji={emojiConstants.payment}
        tooltipText='add payment'
        ariaLabel='add payment emoji'
      />

      {/* Button for navigating to adding users */}
      <GroupActionsEmojiButton
        route={"create-users-inapp"}
        emoji={emojiConstants.user}
        tooltipText='add user'
        ariaLabel='add user emoji'
      />

      {/* Button for navigating to settling expenses */}
      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        tooltipText='settle expenses'
        ariaLabel='settle expenses emoji'
      />
    </div>
  );
};

export default GroupActionsBar;
