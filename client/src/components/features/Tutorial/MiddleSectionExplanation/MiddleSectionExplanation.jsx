// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./MiddleSectionExplanation.module.css";
import SwitchViewButtonsBar from "../../GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";

/**
 * Component for rendering explanation of the main application's middle section (containing group balances and group history).
 * @returns {JSX.Element} React component.
 */
const MiddleSectionExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>group views</h2>
      <p className={styles.explanation}>
        Main application screen, divided into two parts:
      </p>
      <div className={styles.noLink}>
        <SwitchViewButtonsBar view={"view2"} />
      </div>
      <div className={styles.elaboration}>
        <h3>balances</h3>
        <ul className={styles.list}>
          <li>All group members along with their current balances</li>
          <li>
            Click a name to view, update or delete the member and any associated
            transaction
          </li>
        </ul>
        <h3>history</h3>
        <ul className={styles.list}>
          <li>All expenses and payments of all group members</li>
          <li>
            Click a transaction to view details and make changes, such as
            updating or deleting.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MiddleSectionExplanation;
