// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

/**
 * Renders a user's expense totals: expenses paid and expenses benefitted from
 *
 * @cmponent
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing expense totals.
 * @returns {JSX.Element} React component. */
const UserExpensesTotals = ({ userData }) => {
  return (
    <div role='region' aria-label='User Expense Totals'>
      <h3>
        <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
        expense totals{" "}
      </h3>
      <ul>
        {/* total expenses paid amount with 2 decimal places */}
        <li>
          paid for: {userData.totalExpensesPaidAmount.toFixed(2)}€{" "}
          <Emoji label={"Paid for emoji"} emoji={emojiConstants.paidBy}></Emoji>
        </li>
        <li>
          {/* total expenses benefitted from amount with 2 decimal places */}
          benefitted from: {userData.totalExpenseBenefittedAmount.toFixed(
            2
          )}€{" "}
          <Emoji
            label={"benefitted from expense emoji"}
            emoji={emojiConstants.benefittedFrom}></Emoji>
        </li>
      </ul>
    </div>
  );
};

export default UserExpensesTotals;
