// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./MakeInstantSplitAnAppExplanation.module.css";
/*TODO: Add add to homescreen functonality  */
const MakeInstantSplitAnAppExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>make InstantSplit an app</h2>
      <div className={styles.explanation}>
        <div>
          Add Link to explanation of how to make InstantSplit an app.
          <a
            href='https://www.google.com/chrome/'
            target='_blank'
            rel='noopener noreferrer'>
            Chrome
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default MakeInstantSplitAnAppExplanation;
