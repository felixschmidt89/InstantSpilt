// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderPaymentDetails.module.css";

/**
 * Renders payment details including payment amount, maker, and recipient.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.paymentInfo - Payment information.
 * @param {number} props.paymentInfo.paymentAmount - The amount of the payment.
 * @param {Object} props.paymentInfo.paymentMaker - The user who made the payment.
 * @param {Object} props.paymentInfo.paymentRecipient - The user who received the payment.
 *  @param {string} props.groupCurrency - The currency of the group.

 * @returns {JSX.Element} React component. */
const RenderPaymentDetails = ({ paymentInfo, groupCurrency }) => {
  return (
    <div className={styles.detailsContainer}>
      <h2>
        {paymentInfo.paymentAmount.toFixed(2)}
        {groupCurrency}
      </h2>
      <p className={styles.paymentDetails}>
        <span className={styles.userName}>
          {paymentInfo.paymentMaker.userName}
        </span>
        <span className={styles.emoji}>
          {" "}
          <Emoji
            label={"payment to other user emoji"}
            emoji={emojiConstants.paymentsMade}></Emoji>
        </span>
        <span className={styles.userName}>
          {paymentInfo.paymentRecipient.userName}
        </span>
      </p>
    </div>
  );
};

export default RenderPaymentDetails;
