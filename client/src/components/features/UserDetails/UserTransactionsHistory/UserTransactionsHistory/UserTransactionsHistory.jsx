import React from "react";
import styles from "./UserTransactionsHistory.module.css";
import UserPaymentsHistory from "../../UserPaymentsHistory/UserPaymentsHistory";
import UserExpensesHistory from "../../UserExpensesHistory/UserExpensesHistory";
import useTriggerRerender from "../../../../../hooks/useTriggerRerender";

const UserTransactionsHistory = ({ userExpensesAndPayments, userId }) => {
  // Custom hook to get groupCode and trigger rerender logic
  const { rerenderTrigger, toggleRerender } = useTriggerRerender();
  return (
    <div className={styles.container}>
      {userExpensesAndPayments.length > 0 ? (
        <ul>
          {userExpensesAndPayments.map((item) => (
            <li className={styles.item} key={item._id}>
              {item.expenseDescription ? (
                <UserExpensesHistory
                  item={item}
                  handleRerender={toggleRerender}
                  userId={userId}
                />
              ) : (
                <UserPaymentsHistory
                  item={item}
                  handleRerender={toggleRerender}
                  userId={userId}
                />
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default UserTransactionsHistory;
