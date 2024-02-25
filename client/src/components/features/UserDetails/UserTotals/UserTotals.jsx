// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./UserTotals.module.css";

/**
 * Renders a user's expenses and payments totals: expenses/payments paid and expenses/payments benefitted from
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing expense totals.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const UserTotals = ({ userData, groupCurrency }) => {
  return (
    <div className={styles.container}>
      <div
        role='region'
        aria-label='User Expense Totals'
        className={styles.totalsContainer}>
        <h3>expense totals</h3>
        <ul className={styles.list}>
          {/* total expenses paid amount with 2 decimal places */}
          <li className={styles.item}>
            <span className={styles.key}>paid for:</span>
            <span className={styles.value}>
              {userData.totalExpensesPaidAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.key}>
              {/* total expenses benefitted from amount with 2 decimal places */}
              benefitted from:
            </span>
            <span className={styles.value}>
              {userData.totalExpenseBenefittedAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
        </ul>
      </div>
      <div
        role='region'
        aria-label='User Payments Totals'
        className={styles.totalsContainer}>
        <h3>payment totals</h3>
        <ul className={styles.list}>
          {/* total payments made amount with 2 decimal places */}
          <li className={styles.item}>
            <span className={styles.key}>payments made:</span>{" "}
            <span className={styles.value}>
              {userData.totalPaymentsMadeAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.key}>
              {/* total payments received amount with 2 decimal places */}
              payments received:
            </span>
            <span className={styles.value}>
              {userData.totalPaymentsReceivedAmount.toFixed(2)}
              {groupCurrency}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTotals;
