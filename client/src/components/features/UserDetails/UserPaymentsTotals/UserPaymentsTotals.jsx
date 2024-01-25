// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./UserPaymentsTotals.module.css";

/**
 * Displays a user's payment totals: payments made and payments received.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing payment totals.
 * @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const UserPaymentsTotals = ({ userData, groupCurrency }) => {
  return (
    <div role='region' aria-label='User Payments Totals'>
      <h3>
        <span className={styles.paymentText}>payment totals</span>
        <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
      </h3>
      <ul>
        {/* total payments made amount with 2 decimal places */}
        <li>
          <span className={styles.paymentText}>
            payments made: {userData.totalPaymentsMadeAmount.toFixed(2)}
            {groupCurrency}
          </span>
          <Emoji
            label={"payment to other user emoji"}
            emoji={emojiConstants.paymentsMade}></Emoji>
        </li>
        <li>
          <span className={styles.paymentText}>
            {/* total payments received amount with 2 decimal places */}
            payments received: {userData.totalPaymentsReceivedAmount.toFixed(2)}
            {groupCurrency}
          </span>
          <Emoji
            label={"payment from other user emoji"}
            emoji={emojiConstants.paymentsReceived}></Emoji>
        </li>
      </ul>
    </div>
  );
};

export default UserPaymentsTotals;
