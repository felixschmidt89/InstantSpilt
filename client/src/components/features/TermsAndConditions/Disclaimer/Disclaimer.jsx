// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./Disclaimer.module.css";

/**
 * Component for rendering a terms and conditions disclaimer.
 * @param {string} lastUpdateDate - The last time, the Terms and Conditions have been updated
 * @returns {JSX.Element} React component. */
const Disclaimer = ({ lastUpdateDate }) => {
  return (
    <div className={styles.container}>
      <h2>Disclaimer</h2>
      <p className={styles.disclaimer}>
        By using InstantSplit, you acknowledge and accept our terms and
        conditions. If you do not agree with these terms, please do not use the
        application. These terms and conditions were last updated on{" "}
        <strong>{lastUpdateDate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
