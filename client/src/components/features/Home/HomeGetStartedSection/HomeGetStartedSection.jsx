// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./HomeGetStartedSection.module.css";

/**
 * Component for rendering the get started section on the home page.
 *
 * @returns {JSX.Element} React component. */
const HomeGetStartedSection = () => {
  return (
    <>
      <div className={styles.groupContainer}>
        <h2>get started</h2>
        <Link to='/onboarding-create-group' className={styles.groupLink}>
          <strong>create a new group</strong>
        </Link>
        <Link to='/onboarding-enter-groupcode' className={styles.groupLink}>
          <strong>join an existing group</strong>
        </Link>
      </div>
    </>
  );
};

export default HomeGetStartedSection;
