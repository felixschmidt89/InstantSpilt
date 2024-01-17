// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./SingleTermsAndConditions.module.css";

/**
 * Component to display a single section of terms and conditions.
 * @param {Array} sections - An array of objects representing sections with keys, titles, and content.
 * @returns {JSX.Element} React component. */
const SingleTermsAndConditions = ({ sections }) => {
  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <div key={section.key}>
          <h2 className={styles.header}>{section.title}</h2>
          <p className={styles.content}>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleTermsAndConditions;
