// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import { INACTIVE_DAYS } from "../../../../constants/dataConstants";

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
      <div className={styles.strong}>
        <span className={styles.noWrap}>
          No user registration or app installation.
        </span>{" "}
        <span className={styles.noWrap}>No cookies.</span>{" "}
        <span className={styles.noWrap}>No visitor tracking.</span>{" "}
        <span className={styles.noWrap}>No monetization.</span>{" "}
        <span className={styles.noWrap}>Complete inactivity data purge.</span>{" "}
      </div>
    </div>
  );
};

export default InstantSplitIntroSection;
