// React and Third-Party Libraries
import React from "react";

// Component
import SwitchViewButton from "../SwitchViewButton/SwitchViewButton";

// Styles
import styles from "./SwitchViewButtonsBar.module.css";

/**
 * Renders buttons to switch between groupBalance and groupHistory views.
 *
 * @param {string} view - The current view state. Default is view2 (balances).
 * @param {Function} handleSwitchView - Function to handle view switching.
 * @returns {JSX.Element} React component. */
const SwitchViewButtonsBar = ({ view, handleSwitchView }) => {
  return (
    <div className={styles.buttonContainer}>
      {/* Button to render balances view (default) */}
      <SwitchViewButton
        text='balances'
        isActive={view === "view2"}
        onClick={handleSwitchView}
      />
      {/* Button to render group view */}
      <SwitchViewButton
        text='history'
        isActive={view === "view1"}
        onClick={handleSwitchView}
      />
    </div>
  );
};

export default SwitchViewButtonsBar;
