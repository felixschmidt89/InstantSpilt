// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import GroupActionsEmojiButton from "../../../common/GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./CreateUserCTA.module.css";

/**
 * Component for rendering a call-to-action (CTA) to create users.
 * @param {boolean} props.isPayment - Indicates whether the CTA is related to a payment. Defaults to true.
 * @returns {JSX.Element} React component. */
const CreateUserCTA = ({ isPayment = true }) => {
  return (
    <div>
      <p className={styles.callToAction}>
        To add {isPayment ? "a payment" : "an expense"}, ensure you have at
        least 2 users.
        <br />
        Please click the user icon below to proceed.
      </p>
      <GroupActionsEmojiButton
        route={"create-users"}
        emoji={emojiConstants.user}
        tooltipText='add group member'
        ariaLabel='add group member emoji'
      />
    </div>
  );
};

export default CreateUserCTA;
