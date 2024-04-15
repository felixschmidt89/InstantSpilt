// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./NotEnoughGroupMembers.module.css";
/**
 * Component for rendering a call to action to add members to a group
 *
 * @returns {JSX.Element} React component. */
const NotEnoughGroupMembers = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.failMessage}>
      {t("not-enough-groupmembers-start-adding")}{" "}
      <span className={styles.emojiParanthesis}>
        (<Emoji ariaLabel={"user emoji"} emoji={emojiConstants.member}></Emoji>)
      </span>{" "}
      {t("not-enough-groupmembers-below")}{" "}
      <span className={styles.emojiParanthesis}>
        (
        <Emoji
          ariaLabel={"point down emoji"}
          emoji={emojiConstants.pointDown}></Emoji>
        )
      </span>
      {t("not-enough-groupmembers-append")}.
    </p>
  );
};

export default NotEnoughGroupMembers;
