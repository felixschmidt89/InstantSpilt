// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RenderExpenseDetails.module.css";

const RenderExpenseDetails = ({
  expenseInfo,
  expenseAmountPerBeneficiary,
  groupCurrency,
}) => {
  return (
    <ul className={styles.container}>
      <li className={styles.listItem}>
        <span className={styles.key}>total amount:</span>
        <span className={styles.value}>{expenseInfo.expenseAmount}</span>
      </li>
      <li className={styles.listItem}>
        <span className={styles.key}>paid by:</span>
        <span className={styles.value}>
          {expenseInfo.expensePayer.userName}
        </span>
      </li>
      <li className={styles.listItem}>
        <span className={styles.key}> amount per beneficiary:</span>
        <span className={styles.value}>
          {expenseAmountPerBeneficiary.toFixed(2)}
          {groupCurrency}
        </span>
      </li>
    </ul>
  );
};

export default RenderExpenseDetails;
