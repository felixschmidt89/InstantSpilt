// DONE adding only meaningful necessary comments

import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import emojiConstants from "../../constants/emojiConstants";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import DeleteResourceButton from "../../components/common/DeleteResourceButton/DeleteResourceButton";
import RouteButton from "../../components/common/RouteButton/RouteButton";
import styles from "./UserPage.module.css";

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
      <PiratePx COUNT_IDENTIFIER={"user-page"} />
      {/* Button to go back to the "instant-split" page */}
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
            balance:{" "}
            <span className={balanceClass}>
              {userInfo.userBalance.toFixed(2)}€
            </span>
          </h2>
          {/* Display the total expenses paid for and benefitted from */}
          <h3>{emojiConstants.expense} expense totals </h3>
          <ul>
            <li>
              {" "}
              paid for: {userInfo.totalExpensesPaidAmount.toFixed(2)}€{" "}
              {emojiConstants.paidFor}
            </li>
            <li>
              {" "}
              benefitted from:{" "}
              {userInfo.totalExpenseBenefittedAmount.toFixed(2)}€{" "}
              {emojiConstants.benefittedFrom}
            </li>
          </ul>
          <p></p>

          {/* Display the total sum of payments made and received */}
          <h3>{emojiConstants.payment} payments totals </h3>
          <ul>
            <li>
              {" "}
              payments made: {userInfo.totalPaymentsMadeAmount.toFixed(2)}€{" "}
              {emojiConstants.paymentsMade}
            </li>
            <li>
              {" "}
              payments received:{" "}
              {userInfo.totalPaymentsReceivedAmount.toFixed(2)}€{" "}
              {emojiConstants.paymentsReceived}
            </li>
          </ul>

          <h3>single expenses and payments </h3>
          <RouteButton
            route={`user-history/${userId}`}
            buttonText='view history'
            margin='0px'
          />
        </div>
      ) : (
        <Spinner />
      )}
      <span className={styles.deleteButton}>
        <DeleteResourceButton resourceId={userId} resourceType='users' />{" "}
      </span>
    </main>
  );
};
export default UserPage;
