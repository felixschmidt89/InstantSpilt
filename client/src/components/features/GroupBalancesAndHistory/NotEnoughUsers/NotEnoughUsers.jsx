// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

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
const NotEnoughUsers = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.failMessage}>
      {t("not-enough-users-start-adding")}{" "}
      <span className={styles.emojiParanthesis}>
        (<Emoji label={"user emoji"} emoji={emojiConstants.user}></Emoji>)
      </span>{" "}
      {t("no-group-transactions-below")}{" "}
      <span className={styles.emojiParanthesis}>
        (
        <Emoji
          label={"pont down emoji"}
          emoji={emojiConstants.pointDown}></Emoji>
        )
      </span>
      {t("not-enough-users-append")}.
    </p>
  );
};

export default NotEnoughUsers;
