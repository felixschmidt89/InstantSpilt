// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./GetStartedSection.module.css";

/**
 * Component for rendering the get started section on the home page.
 *
 * @returns {JSX.Element} React component. */
const GetStartedSection = () => {
  return (
    <>
      <div className={styles.groupContainer}>
        <h2>get started</h2>
        <Link to='/onboarding-create-group' className={styles.groupLink}>
          create a new group
        </Link>
        <Link to='/onboarding-enter-groupcode' className={styles.groupLink}>
          join an existing group
        </Link>
      </div>
    </>
  );
};

export default GetStartedSection;
