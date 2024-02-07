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
      <div className={styles.iconContainer}>
        {/* Button for navigating to group settings */}
        <GroupActionsEmojiButton
          route={"group-settings"}
          emoji={emojiConstants.settings}
          tooltipText='group settings'
          ariaLabel='group settings emoji'
        />
        <span className={styles.iconExplanation}>settings</span>
      </div>

      <div className={styles.iconContainer}>
        {/* Button for navigating to settling expenses */}
        <GroupActionsEmojiButton
          route={"settle-expenses"}
          emoji={emojiConstants.settle}
          tooltipText='settle expenses'
          ariaLabel='settle expenses emoji'
        />
        <span className={styles.iconExplanation}>settle</span>
      </div>

      <div className={styles.iconContainer}>
        {/* Button for navigating to adding users */}
        <GroupActionsEmojiButton
          route={"create-users"}
          emoji={emojiConstants.user}
          tooltipText='add group member'
          ariaLabel='add group member emoji'
        />
        <span className={styles.iconExplanation}>+member</span>
      </div>

      <div className={styles.iconContainer}>
        {/* Button for navigating to adding payments */}
        <GroupActionsEmojiButton
          route={"create-payment"}
          emoji={emojiConstants.payment}
          tooltipText='add payment'
          ariaLabel='add payment emoji'
        />
        <span className={styles.iconExplanation}>+payment</span>
      </div>

      <div className={styles.iconContainer}>
        {/* Button for navigating to adding expenses */}
        <GroupActionsEmojiButton
          route={"create-expense"}
          emoji={emojiConstants.expense}
          tooltipText='add expense'
          ariaLabel='add expense emoji'
        />
        <span className={styles.iconExplanation}>+expense</span>
      </div>
    </div>
  );
};

export default GroupActionsBar;
