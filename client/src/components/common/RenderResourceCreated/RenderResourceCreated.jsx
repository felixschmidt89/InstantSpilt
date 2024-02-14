// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RenderResourceCreated.module.css";

/**
 * Renders the creation timestamp of a resource.
 *
 * @param {Object} props - The component props.
 * @param {string} props.createdAt - The creation timestamp of the resource.
 * @param {string} [props.updatedAt] - The optional update timestamp of the resource.
 * @returns {JSX.Element} React component. */
const RenderResourceCreated = ({ createdAt, updatedAt }) => {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <span className={styles.key}>created: </span>
        <span className={styles.value}>
          {new Date(createdAt).toLocaleString()}
        </span>
      </li>
      {createdAt !== updatedAt && (
        <li className={styles.item}>
          <span className={styles.key}>updated:</span>
          <span className={styles.value}>
            {new Date(updatedAt).toLocaleString()}
          </span>
        </li>
      )}
    </ul>
  );
};

export default RenderResourceCreated;
