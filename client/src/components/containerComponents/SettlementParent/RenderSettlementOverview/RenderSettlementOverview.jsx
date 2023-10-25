import React from "react";
import { Link } from "react-router-dom";
import styles from "./RenderSettlementOverview.module.css";

export default function RenderSettlementOverview({
  negativeBalanceUsers,
  positiveBalanceUsers,
}) {
  return (
    <>
      <h2>Needs to pay back:</h2>
      <ul>
        {negativeBalanceUsers.map((user) => (
          <li key={`${user.id}`} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <strong>
                {/* Link to the user page */}
                <Link className={styles.userName} to={`/user-page/${user.id}`}>
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
      <h2>Should get paid:</h2>
      <ul>
        {positiveBalanceUsers.map((user) => (
          <li key={`${user.id}`} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <strong>
                {/* Link to the user page */}
                <Link className={styles.userName} to={`/user-page/${user.id}`}>
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
    </>
  );
}
