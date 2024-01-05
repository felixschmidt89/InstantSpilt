import React from "react";
import emojiConstants from "../../../constants/emojiConstants";
import GroupActionsButton from "../GroupActionsButton/GroupActionsButton";
import styles from "./GroupActionsBar.module.css";

/**
 * Displays a set of navigation icons: for creating expenses, payments, and users - and for settling expenses.
 */
const GroupActionsBar = () => {
  return (
    <div className={styles.buttonContainer}>
      {/* Button for creating expenses */}
      <GroupActionsButton
        route={"create-expense"}
        buttonText={emojiConstants.expense}
        tooltipText='add expense'
      />

      {/* Button for creating payments */}
      <GroupActionsButton
        route={"create-payment"}
        buttonText={<span>{emojiConstants.payment}</span>}
        tooltipText='add payment'
      />

      {/* Button for creating users */}
      <GroupActionsButton
        route={"create-users-inapp"}
        buttonText={<span>{emojiConstants.user}</span>}
        tooltipText='add user'
      />

      {/* Button for settling expenses */}
      <GroupActionsButton
        route={"settle-expenses"}
        buttonText={<span>{emojiConstants.settle}</span>}
        tooltipText='settle expenses'
      />
    </div>
  );
};

export default GroupActionsBar;
