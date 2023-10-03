import React from "react";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import emojiConstants from "../../constants/emojiConstants";
import styles from "./UserPage.module.css";
import DeleteResourceButton from "../../components/DeleteResourceButton/DeleteResourceButton";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

const UserPage = () => {
  const { userId } = useParams();
  const userInfo = useFetchUserInfo(userId);

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD
  if (userInfo && Math.abs(userInfo.userBalance) <= BALANCE_THRESHOLD) {
    userInfo.userBalance = 0;
  }

  // Visually indicate userBalance state
  const balanceClass =
    userInfo && userInfo.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      {userInfo ? (
        <div>
          <h1>{userInfo.userName}</h1>
          <h2>
            Balance:
            <span className={balanceClass}>
              {userInfo.userBalance.toFixed(2)}€
            </span>
          </h2>
          <br />
          <div>
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
