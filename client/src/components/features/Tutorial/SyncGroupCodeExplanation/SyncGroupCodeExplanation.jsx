// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./SyncGroupCodeExplanation.module.css";

/**
 * Renders an explanation how to sync groupCodes across devices and browsers.
 * @returns {JSX.Element} React component.
 */
const SyncGroupCodeExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>sync across devices & browsers</h2>
      <p>To access this group either</p>
      <ul className={styles.list}>
        <li>enter the groupCode manually or</li>
        <li>accept an invitation</li>
      </ul>
      <p>specifically on another device / in another browser.</p>
    </div>
  );
};

export default SyncGroupCodeExplanation;
