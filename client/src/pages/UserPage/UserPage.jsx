// DONE adding only meaningful necessary comments

import React from "react";
import { useParams } from "react-router-dom";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import emojiConstants from "../../constants/emojiConstants";
import styles from "./UserPage.module.css";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import DeleteResourceButton from "../../components/reuseableComponents/DeleteResourceButton/DeleteResourceButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

/**
 * Fetches and renders detailed information about a user, including name, balance, total expenses and payments.
 * allows for user deletion if user is not associated with any payment or expense
 */
const UserPage = () => {
  const { userId } = useParams();
  const userInfo = useFetchUserInfo(userId);

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD so balance is considered settled
  if (userInfo && Math.abs(userInfo.userBalance) <= BALANCE_THRESHOLD) {
    userInfo.userBalance = 0;
  }

  // Set different css classes depending on userBalance state to set different colors
  const balanceClass =
    userInfo && userInfo.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - User details' />
      {/* Button to go back to the "instant-split" page */}
      <PiratePx COUNT_IDENTIFIER={"user-page/:userId"} />;
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      {userInfo ? (
        <div>
          <h1>{userInfo.userName}</h1>
          <h2>
            {/* Display the userBalance with different color depending on the value */}
            Balance:
            <span className={balanceClass}>
              {userInfo.userBalance.toFixed(2)}€
            </span>
          </h2>
          <br />
          <div>
            {/* Display the total expenses paid for and benefitted from */}

            <h3>Expenses {emojiConstants.expense}</h3>
            <p>
              paid for: {userInfo.totalExpensesPaidAmount.toFixed(2)}€{" "}
              {emojiConstants.paidFor}
            </p>
            <p>
              benefitted from:{" "}
              {userInfo.totalExpenseBenefittedAmount.toFixed(2)}€{" "}
              {emojiConstants.benefittedFrom}
            </p>
          </div>
          <div>
            {/* Display the total sum of payments made and received */}
            <h3>Payments {emojiConstants.payment}</h3>
            <p>
              Payments made: {userInfo.totalPaymentsMadeAmount.toFixed(2)}€{" "}
              {emojiConstants.paymentsMade}
            </p>
            <p>
              Payments received:{" "}
              {userInfo.totalPaymentsReceivedAmount.toFixed(2)}€{" "}
              {emojiConstants.paymentsReceived}
            </p>
          </div>
          <br />
        </div>
      ) : (
        <Spinner />
      )}
      <DeleteResourceButton resourceId={userId} resourceType='users' />{" "}
    </main>
  );
};
export default UserPage;
