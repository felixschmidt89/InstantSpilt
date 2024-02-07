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
    <div className={styles.bottomSectionExplanation}>
      <h2>active group bar</h2>
      <div className={styles.noLink}>
        <GroupActionsBar />
      </div>
      <p className={styles.explanation}>
        Positioned at the bottom of the main app, this bar provides access to
        all capture and settle expenses related actions. Once all expenses and
        payments have been entered, click{" "}
        <Emoji
          label={"Expenses settled emoji"}
          emoji={emojiConstants.settle}></Emoji>
        to view & confirm ideal settlement payments.
      </p>
    </div>
  );
};

export default BottomSectionExplanation;
