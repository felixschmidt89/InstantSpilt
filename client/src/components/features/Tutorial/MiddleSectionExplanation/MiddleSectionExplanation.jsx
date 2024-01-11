// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./MiddleSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's middle section (containing group balances and group history).
 * @component
 * @returns {JSX.Element} - MiddleSectionExplanation component
 */
const MiddleSectionExplanation = () => {
  return (
    <div>
      <h2>Middle section:</h2>
      <ul className={styles.noLink}>
        <li>
          <button className={styles.button}>Balances</button>
          <div>
            Displays users&rsquo; current balances; click a name for more user
            details.
          </div>
        </li>
        <li>
          <button className={styles.button}>History</button>
          <div>
            Lists all expenses and payments; click an amount to view
            transactional details or make changes.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MiddleSectionExplanation;
