// React and Third-Party Libraries
import React from "react";

// Components
import RenderUserPayment from "../RenderUserPayment/RenderUserPayment";
import RenderUserExpense from "../RenderUserExpense/RenderUserExpense";

// Styles
import styles from "./UserTransactionsHistory.module.css";

/**
 * Parent component rendering user transactions history including every single expense and payment of a user.
 * @param {Object} props - The component props.
 * @param {Array} props.userExpensesAndPayments - An array of user expenses and payments.
 * @param {Array} props.groupMembers - An array of the names of the group members.

 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDeleteItem - Callback function to handle deletion of an expense or a payment.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element|null} React component or null if no transactions.
 */
const UserTransactionsHistory = ({
  userExpensesAndPayments,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  if (userExpensesAndPayments.length === 0) {
    return null;
  }

  // Sort expenses and payments by date in descending order
  const sortedExpensesAndPayments = userExpensesAndPayments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.container}>
      <ul>
        {sortedExpensesAndPayments.map((item) => (
          <li className={styles.item} key={item._id}>
            {item.itemType === "expense" ? (
              <RenderUserExpense
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
                groupCurrency={groupCurrency}
                groupMembers={groupMembers}
              />
            ) : (
              <RenderUserPayment
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
                groupCurrency={groupCurrency}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactionsHistory;
