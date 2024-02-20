// React and Third-Party Libraries
import React from "react";

// Components
import ActiveGroupBar from "../../ActiveGroupBar/ActiveGroupBar";

// Styles
import styles from "./ActiveGroupBarExplanation.module.css";

/**
 * Component for rendering ActiveGroupBar explanation.
 * @returns {JSX.Element} React component. */
const ActiveGroupBarExplanation = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>active group bar</h2>
        <p className={styles.explanation}>
          houses all functions related to capturing & settling expenses:
        </p>
      </div>{" "}
      <div className={styles.noLink}>
        <ActiveGroupBar applyMargin={false} />
      </div>
    </>
  );
};

export default ActiveGroupBarExplanation;
