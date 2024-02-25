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
 * @param {Function} props.updateView - Function to update the view state.
 * @returns {JSX.Element} React component. */
const SwitchViewButtonsBar = ({ view, updateView }) => {
  return (
    <div className={styles.buttonContainer}>
      {/* Button to render balances view (default) */}
      <SwitchViewButton
        text='balances'
        isActive={view === "view2"}
        onClick={() => updateView("view2")}
      />
      {/* Button to render group view */}
      <SwitchViewButton
        text='history'
        isActive={view === "view1"}
        onClick={() => updateView("view1")}
      />
    </div>
  );
};

export default SwitchViewButtonsBar;
