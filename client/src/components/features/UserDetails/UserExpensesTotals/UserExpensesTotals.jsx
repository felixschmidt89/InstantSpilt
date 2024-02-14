// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./UserExpensesTotals.module.css";

/**
 * Renders a user's expense totals: expenses paid and expenses benefitted from
 *
 * @cmponent
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing expense totals.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const UserExpensesTotals = ({ userData, groupCurrency }) => {
  return (
    <div
      role='region'
      aria-label='User Expense Totals'
      className={styles.container}>
      <h3>
        expense totals{" "}
        <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
      </h3>
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
  );
};

export default UserExpensesTotals;
