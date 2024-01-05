import React from "react";
import styles from "./TermsAndConditions.module.css";

/**
 * Terms and Conditions component.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} props.lastUpdateDate - The date when the terms and conditions were last updated.
 * @param {Array} props.sections - An array of objects representing different sections of the terms and conditions.
 * @param {number} props.sections[].key - The unique key for each section.
 * @param {string} props.sections[].title - The title of each section.
 * @param {string} props.sections[].content - The content of each section.
 * @returns {JSX.Element} - The rendered TermsAndConditions component.
 */
const TermsAndConditions = ({ lastUpdateDate, sections }) => {
  return (
    <div className={styles.container}>
      {/* Display the main title */}
      <h1>Terms and Conditions</h1>
      {/* Render a note about accepting terms and conditions and last update */}
      <p className={styles.note}>
        By using InstantSplit, you acknowledge and accept our terms and
        conditions. If you do not agree with these terms, please do not use the
        application. These terms and conditions were last updated on{" "}
        <strong>{lastUpdateDate}</strong>.
      </p>
      {/* Map through the terms and conditions content and display each section */}
      {sections.map((section) => (
        <div key={section.key}>
          <h2 className={styles.header}>{section.title}</h2>
          <p className={styles.content}>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
