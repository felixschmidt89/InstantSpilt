// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./InstantSplitIntroSection.module.css";

/**
 * Component for rendering the introductory section explaining what InstantSplit is about.
 * @param {boolean} isInvitation - If true, the sentence about retaining data and opting out will be hidden.
 * @returns {JSX.Element} React component. */
const InstantSplitIntroSection = ({ isInvitation = false }) => {
  return (
    <div className={styles.introContainer}>
      {isInvitation ? (
        <p className={styles.introText}>
          InstantSplit puts accessibility & users first:
        </p>
      ) : (
        <p className={styles.introText}>
          InstantSplit is the hassle-free way to settle expenses putting
          accessibility & users first:
        </p>
      )}
      <ul className={styles.list}>
        <li className={styles.listItem}>
          no user registration or mandatory app installation
        </li>{" "}
        <li className={styles.listItem}>no cookies</li>{" "}
        <li className={styles.listItem}>no user tracking</li>{" "}
        <li className={styles.listItem}>complete inactivity data purge</li>{" "}
      </ul>
    </div>
  );
};

export default InstantSplitIntroSection;
