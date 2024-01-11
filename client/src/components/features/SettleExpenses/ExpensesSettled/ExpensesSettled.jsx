// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./ExpensesSettled.module.css";

/**
 * Component for rendering a message indicating that all group expenses are settled.
 *
 * @component
 * @returns {JSX.Element} - React component.
 */
const ExpensesSettled = () => (
  <p className={styles.balancesSettled}>
    All settled.{" "}
    <Emoji
      label={"Expenses settled emoji"}
      emoji={emojiConstants.settle}></Emoji>
  </p>
);

export default ExpensesSettled;
