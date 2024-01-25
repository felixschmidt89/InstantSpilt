// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./UsersWithNegativeBalance.module.css";

/**
 * Component for rendering users with a negative balance.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.negativeBalanceUsers - An array of users with negative balance.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} - React component.
 */
const UsersWithNegativeBalance = ({ negativeBalanceUsers, groupCurrency }) => {
  if (negativeBalanceUsers.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>needs to pay back</h2>
      <ul>
        {negativeBalanceUsers.map((user) => (
          <li key={user.id} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.userName}</span>
              <div
                className={`${styles.userBalance} ${styles.negativeBalance}`}>
                {Math.abs(user.userBalance).toFixed(2)}
                {groupCurrency}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithNegativeBalance;
