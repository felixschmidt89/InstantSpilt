// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./Disclaimer.module.css";

/**
 * Component for rendering a terms and conditions disclaimer.
 * @component
 * @param {string} lastUpdateDate - The last time, the Terms and Conditions have been updated
 * @returns {JSX.Element} - Disclaimer component
 */
const Disclaimer = ({ lastUpdateDate }) => {
  return (
    <div className={styles.disclaimer}>
      <h2>Disclaimer</h2>
      <p>
        By using InstantSplit, you acknowledge and accept our terms and
        conditions. <br />
        <strong>
          If you do not agree with these terms, please do not use the
          application.
        </strong>
        <br /> These terms and conditions were last updated on{" "}
        <strong>{lastUpdateDate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
