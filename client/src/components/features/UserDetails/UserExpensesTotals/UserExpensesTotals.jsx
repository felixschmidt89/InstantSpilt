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
    <div role='region' aria-label='User Expense Totals'>
      <h3>
        <span className={styles.expenseText}>expense totals</span>
        <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
      </h3>
      <ul>
        {/* total expenses paid amount with 2 decimal places */}
        <li>
          <span className={styles.expenseText}>
            paid for: {userData.totalExpensesPaidAmount.toFixed(2)}
            {groupCurrency}
          </span>
          <Emoji label={"Paid for emoji"} emoji={emojiConstants.paidBy}></Emoji>
        </li>
        <li>
          <span className={styles.expenseText}>
            {/* total expenses benefitted from amount with 2 decimal places */}
            benefitted from: {userData.totalExpenseBenefittedAmount.toFixed(2)}
            {groupCurrency}
          </span>
          <Emoji
            label={"benefitted from expense emoji"}
            emoji={emojiConstants.benefittedFrom}></Emoji>
        </li>
      </ul>
    </div>
  );
};

export default UserExpensesTotals;
