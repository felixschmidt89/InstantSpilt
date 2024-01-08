import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";

/**
 * Displays a user's expense totals: expenses paid and expenses benefitted from
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing expense totals.
 * @returns {JSX.Element} - Rendered component.
 */
const UserExpenseTotals = ({ userData }) => {
  return (
    <div role='region' aria-label='User Expense Totals'>
      <h3>{emojiConstants.expense} expense totals </h3>
      <ul>
        {/* total expenses paid amount with 2 decimal places */}
        <li>
          paid for: {userData.totalExpensesPaidAmount.toFixed(2)}€{" "}
          {emojiConstants.paidFor}
        </li>
        <li>
          {/* total expenses benefitted from amount with 2 decimal places */}
          benefitted from: {userData.totalExpenseBenefittedAmount.toFixed(
            2
          )}€ {emojiConstants.benefittedFrom}
        </li>
      </ul>
    </div>
  );
};

export default UserExpenseTotals;
