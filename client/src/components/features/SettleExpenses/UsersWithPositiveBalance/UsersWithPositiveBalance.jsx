// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./UsersWithPositiveBalance.module.css";

/**
 * Component for rendering users with a positive balance.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.positiveBalanceUsers - An array of users with positive balances.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const UsersWithPositiveBalance = ({ positiveBalanceUsers, groupCurrency }) => {
  if (positiveBalanceUsers.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>should get paid</h2>
      <ul>
        {positiveBalanceUsers.map((user) => (
          <li key={user.id} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.userName}</span>

              <div
                className={`${styles.userBalance} ${styles.positiveBalance}`}>
                {user.userBalance.toFixed(2)}
                {groupCurrency}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithPositiveBalance;
