// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../../constants/emojiConstants";

// Components
import Emoji from "../../../../common/Emoji/Emoji";

// Styles
import styles from "./NoGroupTransactions.module.css";

/**
 * Component to render a call to action when there are no transactions associated with a group.
 *
 * @returns {JSX.Element} React component. */
const NoGroupTransactions = () => (
  <p className={styles.noTransactions}>
    Start adding expenses{" "}
    <span className={styles.emojiParenthesis}>
      (<Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>)
    </span>{" "}
    and payments{" "}
    <span className={styles.emojiParenthesis}>
      <span className={styles.emojiParenthesis}>
        (<Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>)
      </span>{" "}
    </span>{" "}
    below{" "}
    <span
      className={styles.emojiParenthesis}
      role='img'
      aria-label='Point Down Emoji'>
      (
      <Emoji label={"pont down emoji"} emoji={emojiConstants.pointDown}></Emoji>
      )
    </span>
    .
  </p>
);

export default NoGroupTransactions;
