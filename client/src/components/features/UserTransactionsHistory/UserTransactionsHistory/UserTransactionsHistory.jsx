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
 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDeleteItem - Callback function to handle deletion of an expense or a payment.
 * @returns {JSX.Element|null} React component or null if no transactions.
 */
const UserTransactionsHistory = ({
  userExpensesAndPayments,
  groupCode,
  onDeleteResource,
}) => {
  if (userExpensesAndPayments.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul>
        {userExpensesAndPayments.map((item) => (
          <li className={styles.item} key={item._id}>
            {item.itemType === "expense" ? (
              <RenderUserExpense
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
              />
            ) : (
              <RenderUserPayment
                item={item}
                groupCode={groupCode}
                onDeleteResource={onDeleteResource}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactionsHistory;