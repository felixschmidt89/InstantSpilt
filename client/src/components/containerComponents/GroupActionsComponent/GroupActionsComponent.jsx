import React from "react";
import styles from "./GroupActionsComponent.module.css";
import emojiConstants from "../../../constants/emojiConstants";
import GroupActionButton from "../../reuseableComponents/GroupActionsButton/GroupActionsButton";

/**
 * Displays a set of navigation icons: for creating expenses, payments, and users - and for settling expenses.
 */
const GroupActionsComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      {/* Button for creating expenses */}
      <GroupActionButton
        route={"create-expense"}
        buttonText={emojiConstants.expense}
        tooltipText='add expense'
      />

      {/* Button for creating payments */}
      <GroupActionButton
        route={"create-payment"}
        buttonText={<span>{emojiConstants.payment}</span>}
        tooltipText='add payment'
      />

      {/* Button for creating users */}
      <GroupActionButton
        route={"create-users-inapp"}
        buttonText={<span>{emojiConstants.user}</span>}
        tooltipText='add user'
      />

      {/* Button for settling expenses */}
      <GroupActionButton
        route={"settle-expenses"}
        buttonText={<span>{emojiConstants.settle}</span>}
        tooltipText='settle expenses'
      />
    </div>
  );
};

export default GroupActionsComponent;
