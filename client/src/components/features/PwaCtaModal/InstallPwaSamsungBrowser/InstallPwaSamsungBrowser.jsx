// React and Third-Party Libraries
import React from "react";
import { LuMenu } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

// Styles
import styles from "./InstallPwaSamsungBrowser.module.css";

/**
 * Renders instructions for installing PWA via Samsung Browser Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaSamsungBrowser = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience, install our app:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          Select <LuMenu className={styles.dotsIcon} /> in your browser,
        </li>
        <li>
          press <LuPlus className={styles.installIcon} />
          (add page to),
        </li>
        <li>and choose home screen</li>
      </ul>
    </div>
  );
};

export default InstallPwaSamsungBrowser;
