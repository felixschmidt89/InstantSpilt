// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RenderExpenseDetails.module.css";

/**
 * Component for rendering expense details.
 * @param {Object} props - The component props.
 * @param {Object} props.expenseInfo - expense information.
 * @param {number} props.expenseAmountPerBeneficiary - the amount per expense beneficiary.
 * @param {string} props.groupCurrency - currency set in group settings.
 * @returns {JSX.Element} React component.
 */
const RenderExpenseDetails = ({
  expenseInfo,
  expenseAmountPerBeneficiary,
  groupCurrency,
}) => {
  return (
    <ul className={styles.container}>
      <li className={styles.listItem}>
        <span className={styles.key}>total amount:</span>
        <span className={styles.value}>
          {expenseInfo.expenseAmount}
          {groupCurrency}
        </span>
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
