// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./NoUserTransactions.module.css";

/**
 * Component rendering a message when there are no expenses or payments associated with the user.
 * @returns {JSX.Element} React component. */
const NoUserTransactions = () => {
  return (
    <p className={styles.noTransactions}>No associated expenses or payments.</p>
  );
};

export default NoUserTransactions;
