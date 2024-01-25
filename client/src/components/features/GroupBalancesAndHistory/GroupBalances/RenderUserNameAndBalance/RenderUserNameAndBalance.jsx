// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../../../../constants/dataConstants";

// Styles
import styles from "./RenderUserNameAndBalance.module.css";

/**
 * Component for rendering username and user balance
 *
 * @param {Object[]} userDetails - The array of user details.
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderUserNameAndBalance = ({
  userDetails,
  groupCode,
  groupCurrency,
}) => (
  <div className={styles.balancesContainer}>
    <ul>
      {userDetails.map((user) => (
        <li key={user.userId} className={styles.userListItem}>
          <div className={styles.userDetails}>
            <div className={styles.leftColumn}>
              {/* Link to the user page */}
              <Link
                className={styles.userName}
                to={`/user-details/${groupCode}/${user.userId}`}>
                {user.userName}
              </Link>
            </div>
            <div className={styles.rightColumn}>
              {/* Visually indicate negative userBalance*/}
              <div
                className={`${styles.userBalance} ${
                  user.userBalance >= 0
                    ? styles.positiveBalance
                    : styles.negativeBalance
                }`}>
                {/* Fix remaining rounding issue in certain settings, e.g., 100€/3 will result in 33.33, 33.33, 33.4 */}
                {user.userBalance === BALANCE_THRESHOLD ||
                user.userBalance === -BALANCE_THRESHOLD
                  ? `0.00${groupCurrency}`
                  : user.userBalance.toFixed(2) + `${groupCurrency}`}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RenderUserNameAndBalance;
