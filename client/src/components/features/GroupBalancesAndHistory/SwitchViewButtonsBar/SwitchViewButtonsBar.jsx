// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./SwitchViewButtonsBar.module.css";

/**
 * Renders buttons to switch between groupBalance and groupHistory views.
 *
 * @component
 * @param {string} view - The current view state.
 * @param {Function} handleSwitchView - Function to handle view switching.
 * @returns {JSX.Element} - React component.
 */
const SwitchViewButtonsBar = ({ view, handleSwitchView }) => {
  return (
    <div className={styles.buttonContainer}>
      {/* Button to render group Balances view (default) */}
      <button
        className={`${styles.button} ${
          view === "view2" ? styles.expensesButton : styles.balancesButton
        } ${view === "view2" ? "" : styles.inactiveButton}`} //
        onClick={handleSwitchView}
        disabled={view === "view2"}>
        Balances
      </button>
      {/* Button to render group History view */}
      <button
        className={`${styles.button} ${
          view === "view1" ? styles.expensesButton : styles.balancesButton
        } ${view === "view1" ? "" : styles.inactiveButton}`}
        onClick={handleSwitchView}
        disabled={view === "view1"}>
        History
      </button>
    </div>
  );
};

export default SwitchViewButtonsBar;
