import React from "react";
import emojiConstants from "../../../constants/emojiConstants";
import GroupActionsButton from "../../common/GroupActionsButton/GroupActionsButton";
import styles from "./GroupActionsBar.module.css";

/**
 * Toolbar displaying a set of navigation icons for creating expenses, payments, and users,
 * and for settling expenses within a group.
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
      {/* Button for creating expenses */}
      <GroupActionsButton
        route={"create-expense"}
        buttonText={emojiConstants.expense}
        tooltipText='add expense'
        aria-label='add expense'
      />

      {/* Button for creating payments */}
      <GroupActionsButton
        route={"create-payment"}
        buttonText={<span>{emojiConstants.payment}</span>}
        tooltipText='add payment'
        aria-label='add payment'
      />

      {/* Button for creating users */}
      <GroupActionsButton
        route={"create-users-inapp"}
        buttonText={<span>{emojiConstants.user}</span>}
        tooltipText='add user'
        aria-label='add user'
      />

      {/* Button for settling expenses */}
      <GroupActionsButton
        route={"settle-expenses"}
        buttonText={<span>{emojiConstants.settle}</span>}
        tooltipText='settle expenses'
        aria-label='settle expenses'
      />
    </div>
  );
};

export default GroupActionsBar;
