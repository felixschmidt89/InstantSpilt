// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./HomeGetStartedSection.module.css";

/**
 * Component for rendering the get started section on the home page.
 *
 * @component
 * @returns {JSX.Element} - The rendered HomeGetStartedSection component.
 */
const HomeGetStartedSection = () => {
  return (
    <>
      <div className={styles.groupContainer}>
        <h2>Get started</h2>
        <Link to='/create-group' className={styles.groupLink}>
          <strong>Create a new group</strong>
        </Link>
        <Link to='/enter-groupcode' className={styles.groupLink}>
          <strong>Join an existing group</strong>
        </Link>
      </div>
    </>
  );
};

export default HomeGetStartedSection;
