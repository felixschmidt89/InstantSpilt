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
      <h2>switch between group views</h2>
      <SwitchViewButtonsBar view={"view2"} />
      <p className={styles.explanation}>
        <div>
          Positioned in the center and taking up most of the display, this
          section hosts:
        </div>
        <div>
          <ul className={styles.list}>
            <li>
              Balances: All group members along with their current balances.
              Click on a name to view or edit the member's details or entire
              transaction history.
            </li>
            <li>
              History: All transactions of a group. Click on a payment or an
              expense to view details and make changes, such as updates or
              deletions.
            </li>
          </ul>
        </div>
      </p>
    </div>
  );
};

export default MiddleSectionExplanation;
