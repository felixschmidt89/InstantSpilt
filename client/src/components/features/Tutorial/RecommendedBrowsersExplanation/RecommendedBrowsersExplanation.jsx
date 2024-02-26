// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RecommendedBrowsersExplanation.module.css";

/**
 * Component for rendering explanation of the GroupCode for accessing a group and providing related information to store it.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} initialGroupName - The group name set during group creation.
 * @param {string} props.groupCode - The GroupCode for accessing the group.
 * @returns {JSX.Element} React component. */
const RecommendedBrowsersExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>recommended browsers</h2>
      <div className={styles.explanation}>
        <div className={styles.browserExplanationText}>
          While InstantSplit works on any operating system and web browser, we
          recommend{" "}
          <a
            href='https://www.google.com/chrome/'
            target='_blank'
            rel='noopener noreferrer'>
            Chrome
          </a>{" "}
          or{" "}
          <a
            href='https://www.apple.com/safari/'
            target='_blank'
            rel='noopener noreferrer'>
            Safari
          </a>{" "}
          for the best user experience.
        </div>
      </div>
    </div>
  );
};

export default RecommendedBrowsersExplanation;