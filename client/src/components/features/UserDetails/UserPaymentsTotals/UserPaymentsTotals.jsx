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
    <div
      role='region'
      aria-label='User Payments Totals'
      className={styles.container}>
      <h3>
        payment totals{" "}
        <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
      </h3>
      <ul className={styles.list}>
        {/* total payments made amount with 2 decimal places */}
        <li className={styles.item}>
          <span className={styles.key}>payments made:</span>{" "}
          <span className={styles.value}>
            {userData.totalPaymentsMadeAmount.toFixed(2)}
            {groupCurrency}
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.key}>
            {/* total payments received amount with 2 decimal places */}
            payments received:
          </span>
          <span className={styles.value}>
            {userData.totalPaymentsReceivedAmount.toFixed(2)}
            {groupCurrency}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserPaymentsTotals;
