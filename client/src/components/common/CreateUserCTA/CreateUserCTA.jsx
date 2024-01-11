// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Components
import GroupActionsButton from "../GroupActionsButton/GroupActionsButton";

// Styles
import styles from "./CreateUserCTA.module.css";

/**
 * Component for rendering a call-to-action (CTA) to create users.
 * @param {boolean} props.isPayment - Indicates whether the CTA is related to a payment. Defaults to true.
 * @returns {JSX.Element} - Rendered component.
 */
const CreateUserCTA = ({ isPayment = true }) => {
  return (
    <div>
      <p className={styles.callToAction}>
        To add {isPayment ? "a payment" : "an expense"}, ensure you have at
        least 2 users.
        <br />
        Please click the user icon below to proceed.
      </p>
      <GroupActionsButton
        route={"create-users-inapp"}
        buttonText={emojiConstants.user}
        tooltipText='add user'
        ariaLabel='add user emoji'
      />
    </div>
  );
};

export default CreateUserCTA;
