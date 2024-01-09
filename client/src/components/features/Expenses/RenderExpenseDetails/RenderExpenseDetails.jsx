import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderExpenseDetails.module.css";

/**
 * Renders basic details of an expense: amount, description and expense payer
 *
 * @param {Object} props - The component props.
 * @param {Object} props.expenseInfo - The details of the expense.
 * @returns {JSX.Element} - Rendered component.
 */
const RenderExpenseDetails = ({ expenseInfo }) => {
  return (
    <div className={styles.container}>
      {/* Displaying expense details with 2 decimal places */}
      <h2>{expenseInfo.expenseAmount.toFixed(2)}€</h2>
      <p>Description: {expenseInfo.expenseDescription}</p>
      <p>
        {emojiConstants.paidFor}{" "}
        {/* Link to the user page of the expense payer */}
        <Link to={`/user-page/${expenseInfo.expensePayer._id}`}>
          {expenseInfo.expensePayer.userName}
        </Link>
      </p>
    </div>
  );
};

export default RenderExpenseDetails;