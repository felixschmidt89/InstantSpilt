import React from "react";
import emojiConstants from "../../../constants/emojiConstants";
import styles from "./RenderResourceCreated.module.css";

/**
 * Renders the creation timestamp of a resource.
 *
 * @param {Object} props - The component props.
 * @param {string} props.createdAt - The creation timestamp of the resource.
 * @returns {JSX.Element} - Rendered component.
 */
const RenderResourceCreated = ({ createdAt }) => {
  return (
    <p className={styles.createdText}>
      {emojiConstants.created} {new Date(createdAt).toLocaleString()}
    </p>
  );
};

export default RenderResourceCreated;
