// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderExpenseDetails.module.css";

/**
 * Renders basic details of an expense: amount, description and expense payer
 *
 * @param {Object} props - The component props.
 * @param {Object} props.expenseInfo - The details of the expense.
 * @param {string} props.groupCurrency - The currency of the group.

 * @returns {JSX.Element} React component. */
const RenderExpenseDetails = ({ expenseInfo, groupCurrency }) => {
  return (
    <div className={styles.container}>
      {/* Displaying expense details with 2 decimal places */}
      <h2>
        {expenseInfo.expenseAmount.toFixed(2)}
        {groupCurrency}
      </h2>
      <p>
        <strong>description</strong>: {expenseInfo.expenseDescription}
      </p>
      <p>
        <strong>paid by</strong>: {expenseInfo.expensePayer.userName}
      </p>
    </div>
  );
};

export default RenderExpenseDetails;
