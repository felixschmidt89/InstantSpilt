// React and Third-Party Libraries
import React from "react";

// Components
import UserSettingsBar from "../../UserSettingsBar/UserSettingsBar";

// Styles
import styles from "./TopSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's top section (containing user action bar).
 * @returns {JSX.Element} React component. */
const TopSectionExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>user settings</h2>
      <ul className={styles.explanation}>
        <li className={styles.noLink}>
          <UserSettingsBar />
        </li>
      </ul>
    </div>
  );
};

export default TopSectionExplanation;
