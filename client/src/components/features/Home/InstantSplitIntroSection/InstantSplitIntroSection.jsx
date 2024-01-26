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
      <p className={styles.introText}>
        InstantSplit is the hassle-free way to settle group expenses with no
        user registration or app download while sharing minimal data.
      </p>
      <div className={styles.strong}>
        <span className={styles.noWrap}>No cookies.</span>{" "}
        <span className={styles.noWrap}>No visitor tracking.</span>{" "}
        <span className={styles.noWrap}>No monetization.</span>{" "}
      </div>
      <p className={styles.dataText}>
        InstantSplit prioritizes your privacy and automatically purges group
        data after {INACTIVE_DAYS} days of inactivity.
        {isInvitation ? null : (
          <>
            {" "}
            Should you wish to retain your data, you also have the option to opt
            out within the app.
          </>
        )}
      </p>
    </div>
  );
};

export default InstantSplitIntroSection;
