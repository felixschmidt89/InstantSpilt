import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
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
    <span className={styles.emojiParenthesis}>({emojiConstants.expense})</span>{" "}
    and payments{" "}
    <span className={styles.emojiParenthesis}>({emojiConstants.payment})</span>{" "}
    below 👇.
  </p>
);

export default NoTransactions;
