// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./HomeIntroSection.module.css";

/**
 * Component for rendering the introductory section on the home page.
 *
 * @returns {JSX.Element} React component. */
const HomeIntroSection = () => {
  return (
    <div className={styles.introContainer}>
      <h1>Welcome to InstantSplit!</h1>
      <p>
        InstantSplit is the hassle-free way to settle group expenses with no
        user registration or app download while sharing minimal data.
      </p>
      <div className={styles.strong}>
        <span className={styles.noWrap}>No cookies.</span>{" "}
        <span className={styles.noWrap}>No visitor tracking.</span>{" "}
        <span className={styles.noWrap}>No monetization.</span>{" "}
        <span className={styles.noWrap}>Ever.</span>
      </div>
    </div>
  );
};

export default HomeIntroSection;
