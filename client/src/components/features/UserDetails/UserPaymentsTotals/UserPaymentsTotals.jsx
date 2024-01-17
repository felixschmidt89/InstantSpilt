// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

/**
 * Displays a user's payment totals: payments made and payments received.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing payment totals.
 * @returns {JSX.Element} React component. */
const UserPaymentsTotals = ({ userData }) => {
  return (
    <div role='region' aria-label='User Payments Totals'>
      <h3>
        <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>{" "}
        payment totals{" "}
      </h3>
      <ul>
        {/* total payments made amount with 2 decimal places */}
        <li>
          payments made: {userData.totalPaymentsMadeAmount.toFixed(2)}€{" "}
          <Emoji
            label={"payment to other user emoji"}
            emoji={emojiConstants.paymentsMade}></Emoji>
        </li>
        <li>
          {/* total payments received amount with 2 decimal places */}
          payments received: {userData.totalPaymentsReceivedAmount.toFixed(
            2
          )}€{" "}
          <Emoji
            label={"payment from other user emoji"}
            emoji={emojiConstants.paymentsReceived}></Emoji>
        </li>
      </ul>
    </div>
  );
};

export default UserPaymentsTotals;
