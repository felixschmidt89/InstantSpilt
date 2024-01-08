import React from "react";
import styles from "./UserDetails.module.css";
import { Link } from "react-router-dom";

/**
 * Component to nicely render user details
 *
 * @component
 * @param {Object[]} userDetails - The array of user details.
 * @returns {JSX.Element} - React component.
 */
const UserDetails = ({ userDetails }) => (
  <div className={styles.balancesContainer}>
    <ul>
      {userDetails.map((user) => (
        <li key={user.userId} className={styles.userListItem}>
          <div className={styles.userDetails}>
            <div className={styles.leftColumn}>
              {/* Link to the user page */}
              <Link
                className={styles.userName}
                to={`/user-page/${user.userId}`}>
                {user.userName}
              </Link>
            </div>
            <div className={styles.rightColumn}>
              {/* Visually indicate negative userBalance by setting different CSS classes and later rendering it in a different color */}
              <div
                className={`${styles.userBalance} ${
                  user.userBalance >= 0
                    ? styles.positiveBalance
                    : styles.negativeBalance
                }`}>
                {/* Fix remaining rounding issue in certain settings, e.g., 100€/3 will result in 33.33, 33.33, 33.4 */}
                {user.userBalance === 0.01
                  ? "0.00€"
                  : user.userBalance.toFixed(2) + "€"}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UserDetails;
