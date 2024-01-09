import React from "react";
import styles from "./UserTransactionsHistory.module.css";
import UserPaymentsHistory from "../../UserPaymentsHistory/UserPaymentsHistory";
import UserExpensesHistory from "../../UserExpensesHistory/UserExpensesHistory";

const UserTransactionsHistory = ({
  userExpensesAndPayments,
  userId,
  onDeleteItem,
}) => {
  return (
    <div className={styles.container}>
      {userExpensesAndPayments.length > 0 ? (
        <ul>
          {userExpensesAndPayments.map((item) => (
            <li className={styles.item} key={item._id}>
              {item.expenseDescription ? (
                <UserExpensesHistory
                  item={item}
                  userId={userId}
                  onDelete={() => onDeleteItem(item.itemId)}
                />
              ) : (
                <UserPaymentsHistory
                  item={item}
                  userId={userId}
                  onDelete={() => onDeleteItem(item.itemId)}
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
