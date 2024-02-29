// React and Third-Party Libraries
import React from "react";
import { LuMenu } from "react-icons/lu";
import { MdAddToHomeScreen } from "react-icons/md";

// Styles
import styles from "./InstallPwaEdge.module.css";

/**
 * Renders instructions for installing PWA via Edge Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaEdge = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience, install our app:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          Select <LuMenu className={styles.dotsIcon} /> in your browser,
        </li>
        <li>swipe left,</li>
        <li>
          and choose <MdAddToHomeScreen className={styles.homeScreenIcon} /> add
          to phone.
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaEdge;
