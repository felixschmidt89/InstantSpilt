import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";

/**
 * Displays a user's payment totals: payments made and payments received.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - User data containing payment totals.
 * @returns {JSX.Element} - Rendered component.
 */
const UserPaymentTotals = ({ userData }) => {
  return (
    <div role='region' aria-label='User Payments Totals'>
      <h3>{emojiConstants.payment} payment totals </h3>
      <ul>
        {/* total payments made amount with 2 decimal places */}
        <li>
          payments made: {userData.totalPaymentsMadeAmount.toFixed(2)}€{" "}
          {emojiConstants.paymentsMade}
        </li>
        <li>
          {/* total payments received amount with 2 decimal places */}
          payments received: {userData.totalPaymentsReceivedAmount.toFixed(
            2
          )}€ {emojiConstants.paymentsReceived}
        </li>
      </ul>
    </div>
  );
};

export default UserPaymentTotals;
