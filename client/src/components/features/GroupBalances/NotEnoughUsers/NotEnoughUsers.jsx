import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./NotEnoughUsers.module.css";

/**
 * Displays a call to action when there are not enough in the group.
 *
 * @component
 * @returns {JSX.Element} - React component.
 */
const NotEnoughUsers = () => (
  <p className={styles.failMessage}>
    Add users{" "}
    <span className={styles.emojiParanthesis}>({emojiConstants.user})</span>{" "}
    below 👇 to start settling expenses.
  </p>
);

export default NotEnoughUsers;
