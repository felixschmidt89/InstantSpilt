// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./NotEnoughUsers.module.css";
/**
 * Component for rendering a call to action to add members to a group
 *
 * @returns {JSX.Element} React component. */
const NotEnoughUsers = () => (
  <p className={styles.failMessage}>
    To start settling expenses add group members{" "}
    <span className={styles.emojiParanthesis}>
      (<Emoji label={"user emoji"} emoji={emojiConstants.user}></Emoji>)
    </span>{" "}
    below{" "}
    <span className={styles.emojiParanthesis}>
      (
      <Emoji label={"pont down emoji"} emoji={emojiConstants.pointDown}></Emoji>
      )
    </span>
    .
  </p>
);

export default NotEnoughUsers;
