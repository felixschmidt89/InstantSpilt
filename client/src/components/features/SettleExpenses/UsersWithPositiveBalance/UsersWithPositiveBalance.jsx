// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./UsersWithPositiveBalance.module.css";

/**
 * Component for rendering users with a positive balance.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.positiveBalanceUsers - An array of users with positive balances.
 * @returns {JSX.Element} React component. */
const UsersWithPositiveBalance = ({ positiveBalanceUsers }) => {
  if (positiveBalanceUsers.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Should get paid:</h2>
      <ul>
        {positiveBalanceUsers.map((user) => (
          <li key={user.id} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <strong>
                <Link
                  className={styles.userName}
                  to={`/user-details/${user.id}`}>
                  {user.userName}
                </Link>
              </strong>
              <div
                className={`${styles.userBalance} ${styles.positiveBalance}`}>
                {user.userBalance.toFixed(2)}€
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithPositiveBalance;
