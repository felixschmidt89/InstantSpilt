// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../../constants/emojiConstants";

// Styles
import styles from "./NoTransactions.module.css";

/**
 * Component to display a call to action when there are no transactions.
 *
 * @component
 * @returns {JSX.Element} - React component.
 */
const NoTransactions = () => (
  <p className={styles.noTransactions}>
    Begin adding expenses{" "}
    <span
      className={styles.emojiParenthesis}
      role='img'
      aria-label='Expense Emoji'>
      ({emojiConstants.expense})
    </span>{" "}
    and payments{" "}
    <span
      className={styles.emojiParenthesis}
      role='img'
      aria-label='Payment Emoji'>
      ({emojiConstants.payment})
    </span>{" "}
    below{" "}
    <span
      className={styles.emojiParenthesis}
      role='img'
      aria-label='Point Down Emoji'>
      ({emojiConstants.pointdown})
    </span>
    .
  </p>
);

export default NoTransactions;
