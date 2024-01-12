// React and Third-Party Libraries
import React from "react";

// Components
import RenderUserPayment from "../RenderUserPayment/RenderUserPayment";
import RenderUserExpense from "../RenderUserExpense/RenderUserExpense";

// Styles
import styles from "./UserTransactionsHistory.module.css";

/**
 * Parent component rendering user transactions history including every single expense and payment of a user.
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.userExpensesAndPayments - An array of user expenses and payments.
 * @param {string} props.userId - The ID of the user.
 * @param {Function} props.onDeleteItem - Callback function to handle deletion of an expense or a payment.
 * @returns {JSX.Element|null} - UserTransactionsHistory component or null if no transactions.
 */
const UserTransactionsHistory = ({
  userExpensesAndPayments,
  userId,
  onDeleteResource,
}) => {
  if (userExpensesAndPayments.length === 0) {
    return null;
  }
  console.log(userExpensesAndPayments);

  return (
    <div className={styles.container}>
      <ul>
        {userExpensesAndPayments.map((item) => (
          <li className={styles.item} key={item._id}>
            {item.itemType === "expense" ? (
              <RenderUserExpense
                item={item}
                userId={userId}
                onDeleteResource={onDeleteResource}
              />
            ) : (
              <RenderUserPayment
                item={item}
                userId={userId}
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
