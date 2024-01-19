// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import GroupActionsBar from "../../GroupActionsBar/GroupActionsBar";
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./BottomSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's middle section (containing group actions bar).
 * @returns {JSX.Element} React component. */
const BottomSectionExplanation = () => {
  return (
    <div>
      <h2>Bottom section</h2>
      <div className={styles.noLink}>
        <GroupActionsBar />
      </div>
      <div className={styles.noLink}>
        Perform split actions:
        <ul>
          <li>
            Add expenses{" "}
            <span className={styles.emojiParenthesis}>
              (
              <Emoji
                label={"expense emoji"}
                emoji={emojiConstants.expense}></Emoji>
              )
            </span>
            , payments{" "}
            <span className={styles.emojiParenthesis}>
              (
              <Emoji
                label={"payment emoji"}
                emoji={emojiConstants.payment}></Emoji>
              )
            </span>{" "}
            and users{" "}
            <span className={styles.emojiParenthesis}>
              (<Emoji label={"user emoji"} emoji={emojiConstants.user}></Emoji>)
            </span>
            .
          </li>
          <li>
            Show unsettled balances and payment suggestions{" "}
            <span className={styles.emojiParenthesis}>
              (
              <Emoji
                label={"settle expense emoji"}
                emoji={emojiConstants.settle}></Emoji>
              )
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomSectionExplanation;