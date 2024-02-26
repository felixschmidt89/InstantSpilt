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
          <h3 className={styles.header}>{section.title}</h3>
          <p className={styles.content}>
            {section.content}
            {section.link && (
              <span>
                {" "}
                For more information, please refer to{" "}
                <a
                  href={section.link}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {section.linkText || "Privacy Policy"}
                </a>
                .
              </span>
            )}
          </p>{" "}
        </div>
      ))}
    </div>
  );
};

export default SingleTermsAndConditions;
