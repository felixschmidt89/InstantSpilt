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
      <h2>Middle section:</h2>
      <ul className={styles.noLink}>
        <li>
          <button className={styles.button}>Balances</button>
          <div>
            Displays users&rsquo; current balances; click a name to view totals
            and transaction history
          </div>
        </li>
        <li>
          <button className={styles.button}>History</button>
          <div>
            Lists all group expenses and payments; click an amount to view
            transactional details & make changes.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MiddleSectionExplanation;
