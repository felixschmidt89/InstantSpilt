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
      <ul className={styles.list}>
        <li>
          To access this group on another device, you'll need to enter the
          groupCode or accept a group invitation specifically on that device.
        </li>
        <li>
          The same applies, if you're using multiple web browsers on the same
          device.
        </li>
      </ul>
    </div>
  );
};

export default SyncGroupCodeExplanation;
