// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./GroupBalanceAndHistoryExplanation.module.css";
import SwitchViewButton from "../../GroupBalancesAndHistory/SwitchViewButton/SwitchViewButton";

/**
 * Component for rendering an explanation of group balances and group history views.
 * @returns {JSX.Element} React component.
 */
const GroupBalanceAndHistoryExplanation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.elaboration}>
        {/* Render unclickable balance button*/}
        <div className={styles.button}>
          <SwitchViewButton text='balances' isActive={"view2"} />{" "}
        </div>
        <ul className={styles.list}>
          <li>All group members along with their current balances</li>
          <li>
            Click a name to view, update or delete the member and any associated
            transaction
          </li>
        </ul>
        {/* Render unclickable history button*/}
        <div className={styles.button}>
          <SwitchViewButton text='history' isActive={"view1"} />{" "}
        </div>
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

export default GroupBalanceAndHistoryExplanation;
