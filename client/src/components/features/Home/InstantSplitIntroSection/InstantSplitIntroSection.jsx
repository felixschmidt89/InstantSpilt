// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./InstantSplitIntroSection.module.css";

/**
 * Component for rendering the introductory section explaining what InstantSplit is about.
 *
 * @returns {JSX.Element} React component. */
const InstantSplitIntroSection = () => {
  return (
    <div className={styles.introContainer}>
      <p>
        InstantSplit is the hassle-free way to settle group expenses with no
        user registration or app download while sharing minimal data.
      </p>
      <div className={styles.strong}>
        <span className={styles.noWrap}>No cookies.</span>{" "}
        <span className={styles.noWrap}>No visitor tracking.</span>{" "}
        <span className={styles.noWrap}>No monetization.</span>{" "}
      </div>
    </div>
  );
};

export default InstantSplitIntroSection;
