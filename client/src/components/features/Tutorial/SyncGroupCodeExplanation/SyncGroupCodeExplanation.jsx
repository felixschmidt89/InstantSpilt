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
      <p>InstantSplit's groupCode concept is device and browser-based:</p>
      <ul className={styles.list}>
        <li>
          If you've accessed a group from your phone, you won't automatically
          have access on your computer.
        </li>
        <li>
          To access the same group on another device, you'll need to: enter the
          groupCode manually or accept a group invitation specifically on that
          device.
        </li>
        <li>
          The same principle applies if you're using multiple browsers (e.g.
          Chrome, Safari, Firefox) on the same device.
        </li>
      </ul>
    </div>
  );
};

export default SyncGroupCodeExplanation;
