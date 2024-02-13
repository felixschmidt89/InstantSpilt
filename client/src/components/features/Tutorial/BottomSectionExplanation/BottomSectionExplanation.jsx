// React and Third-Party Libraries
import React from "react";

// Components
import GroupActionsBar from "../../GroupActionsBar/GroupActionsBar";

// Styles
import styles from "./BottomSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's middle section (containing group actions bar).
 * @returns {JSX.Element} React component. */
const BottomSectionExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>active group bar</h2>
      <p className={styles.explanation}>
        Below main application screen, houses all functions related to capturing
        & settling expenses:
      </p>
      <div className={styles.noLink}>
        <GroupActionsBar />
      </div>
    </div>
  );
};

export default BottomSectionExplanation;
