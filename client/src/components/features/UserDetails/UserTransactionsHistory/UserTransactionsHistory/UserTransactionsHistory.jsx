import React from "react";
import styles from "./UserTransactionsHistory.module.css";
import RenderUserPayments from "../../UserPaymentsHistory/UserPaymentsHistory";
import UserExpensesHistory from "../../UserExpensesHistory/UserExpensesHistory";

const UserTransactionsHistory = ({
  userExpensesAndPayments,
  handleRerender,
  userId,
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
                  handleRerender={handleRerender}
                  userId={userId}
                />
              ) : (
                <RenderUserPayments
                  item={item}
                  handleRerender={handleRerender}
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
