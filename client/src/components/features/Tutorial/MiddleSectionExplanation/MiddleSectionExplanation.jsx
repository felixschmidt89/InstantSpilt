// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./MiddleSectionExplanation.module.css";
import SwitchViewButtonsBar from "../../GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";

/**
 * Component for rendering explanation of the main application's middle section (containing group balances and group history).
 * @returns {JSX.Element} React component. */
const MiddleSectionExplanation = () => {
  return (
    <div className={styles.noLink}>
      <h2>group views</h2>
      <SwitchViewButtonsBar view={"view2"} />
      <p className={styles.explanation}>
        The heart of the app, taking up most of the screen and divided into two
        parts:
        <div>
          <ul className={styles.list}>
            <li>
              Balances: All group members along with their current balances.
              Click a name to view, update or delete the member and any
              associated transaction.
            </li>
            <li>
              History: All transactions of a group. Click a transaction to view
              details and make changes, such as updating or deleting.
            </li>
          </ul>
        </div>
      </p>
    </div>
  );
};

export default MiddleSectionExplanation;
