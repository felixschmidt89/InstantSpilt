// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./UsersWithNegativeBalance.module.css";

/**
 * Component for rendering users with a negative balance.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.negativeBalanceUsers - An array of users with negative balance.
 *  @param {string} props.groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} - React component.
 */
const UsersWithNegativeBalance = ({ negativeBalanceUsers, groupCode }) => {
  if (negativeBalanceUsers.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Needs to pay back:</h2>
      <ul>
        {negativeBalanceUsers.map((user) => (
          <li key={user.id} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <strong>
                <Link
                  className={styles.userName}
                  to={`/user-details/${groupCode}/${user.id}`}>
                  {user.userName}
                </Link>
              </strong>
              <div
                className={`${styles.userBalance} ${styles.negativeBalance}`}>
                {Math.abs(user.userBalance).toFixed(2)}€
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithNegativeBalance;
