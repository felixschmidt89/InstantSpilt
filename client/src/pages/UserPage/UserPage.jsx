import React from "react";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const { userId } = useParams();
  console.log(userId);
  const userInfo = useFetchUserInfo(userId);
  console.log(userInfo);

  const balanceClass =
    userInfo && userInfo.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <NavigateButton route={"instant-split"} buttonText={"back"} />

      {userInfo ? (
        <div>
          <h1>{userInfo.userName}</h1>
          <h2>
            Balance:{" "}
            <span className={balanceClass}>
              {userInfo.userBalance.toFixed(2)}€
            </span>
          </h2>
          <br />
          <h3>Expenses 🛒</h3>
          paid for: {userInfo.totalExpensesPaidAmount.toFixed(2)}€{" "}
          <p>
            benefitted from: {userInfo.totalExpenseBenefittedAmount.toFixed(2)}€
          </p>
          <h3>Payments 💸</h3>
          <p>Payments made: {userInfo.totalPaymentsMadeAmount.toFixed(2)}€</p>
          <p>
            Payments received: {userInfo.totalPaymentsReceivedAmount.toFixed(2)}
            €
          </p>
          <br />
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </main>
  );
};
export default UserPage;
