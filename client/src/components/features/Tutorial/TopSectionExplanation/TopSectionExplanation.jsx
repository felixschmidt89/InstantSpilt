// React and Third-Party Libraries
import React from "react";

// Components
import UserActionsBar from "../../UserActionsBar/UserActionsBar";

// Styles
import styles from "./TopSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's top section (containing user action bar).
 * @returns {JSX.Element} React component. */
const TopSectionExplanation = () => {
  return (
    <div>
      <h2>user bar</h2>
      <div className={styles.noLink}>
        <UserActionsBar />
      </div>
      <p className={styles.explanation}>
        At the top of the main app, the user bar offers access to your group
        management settings, the app tutorial, and a feedback option. We value
        your input and are constantly seeking ways to improve!
      </p>
    </div>
  );
};

export default TopSectionExplanation;
