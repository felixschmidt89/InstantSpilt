import React from "react";
import emojiConstants from "../../../constants/emojiConstants";
import GroupActionsButton from "../../common/GroupActionsButton/GroupActionsButton";
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
      {/* Button for creating expenses */}
      <GroupActionsButton
        route={"create-expense"}
        buttonText={emojiConstants.expense}
        tooltipText='add expense'
        ariaLabel='add expense emoji'
      />

      {/* Button for creating payments */}
      <GroupActionsButton
        route={"create-payment"}
        buttonText={<span>{emojiConstants.payment}</span>}
        tooltipText='add payment'
        ariaLabel='add payment emoji'
      />

      {/* Button for creating users */}
      <GroupActionsButton
        route={"create-users-inapp"}
        buttonText={<span>{emojiConstants.user}</span>}
        tooltipText='add user'
        ariaLabel='add user emoji'
      />

      {/* Button for settling expenses */}
      <GroupActionsButton
        route={"settle-expenses"}
        buttonText={<span>{emojiConstants.settle}</span>}
        tooltipText='settle expenses'
        ariaLabel='settle expenses emoji'
      />
    </div>
  );
};

export default GroupActionsBar;
