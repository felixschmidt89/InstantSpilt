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
      <h2>sync across devices</h2>
      <p className={styles.explanation}>
        InstantSplit's group code validation is device-based, meaning that if
        you've accessed a group from your phone, it won't automatically grant
        access on your computer. To access the same group on another device,
        you'll need to use the group code or invitation link specifically on
        that device. The same principle applies if you're using multiple
        browsers on the same device. For example, if you primarily use Chrome
        (as recommended by InstantSplit) but occasionally use Firefox, you'll
        need to use the group code or invitation link once to gain access to the
        group on Firefox.
      </p>
    </div>
  );
};

export default SyncGroupCodeExplanation;
