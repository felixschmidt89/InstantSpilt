import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./NotEnoughUsers.module.css";

/**
 * Component for rendering a call to action to add users to a group
 *
 * @component
 * @returns {JSX.Element} - React component.
 */
const NotEnoughUsers = () => (
  <p className={styles.failMessage}>
    Add users{" "}
    <span
      className={styles.emojiParanthesis}
      role='img'
      aria-label='User Emoji'>
      ({emojiConstants.user})
    </span>{" "}
    below{" "}
    <span
      className={styles.emojiParanthesis}
      role='img'
      aria-label='Point down Emoji'>
      ({emojiConstants.pointdown})
    </span>{" "}
    to start settling expenses.
  </p>
);

export default NotEnoughUsers;
