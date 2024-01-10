// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Components
import Emoji from "../Emoji/Emoji";

// Styles
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
      <Emoji
        label={"Resource created emoji"}
        emoji={emojiConstants.created}></Emoji>{" "}
      {new Date(createdAt).toLocaleString()}
    </p>
  );
};

export default RenderResourceCreated;
