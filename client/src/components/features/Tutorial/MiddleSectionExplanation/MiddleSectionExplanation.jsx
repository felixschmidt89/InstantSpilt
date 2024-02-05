// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./MiddleSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's middle section (containing group balances and group history).
 * @returns {JSX.Element} React component. */
const MiddleSectionExplanation = () => {
  return (
    <div>
      <h2>user balances and group history</h2>
      <ul className={styles.noLink}>
        <li>
          <button className={styles.button}>Balances</button>
          <div>
            users&rsquo; balances; click name to view user's totals and
            transaction history and make changes.
          </div>
        </li>
        <li>
          <button className={styles.button}>History</button>
          <div>
            all group expenses and payments; click to view transactional details
            and update or delete.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MiddleSectionExplanation;
