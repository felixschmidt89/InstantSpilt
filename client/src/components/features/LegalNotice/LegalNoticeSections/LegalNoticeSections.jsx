// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./LegalNoticeSections.module.css";

/**
 * Renders legal notice sections.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.LegalNoticeSections - An array of legal notice sections.
 * @returns {JSX.Element} React component. */
const LegalNoticeSections = ({ LegalNoticeSections }) => {
  return (
    <div className={styles.container}>
      {LegalNoticeSections.map((section) => (
        <section key={section.key}>
          <h2 className={styles.header}>{section.title}</h2>
          {section.content}
        </section>
      ))}
    </div>
  );
};

export default LegalNoticeSections;
