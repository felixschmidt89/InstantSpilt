import React from "react";
import { useParams } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import styles from "./UserDetailsPage.module.css";
import useFetchUserData from "../../hooks/useFetchUserInfo";
import UserExpenseTotals from "../../components/features/UserDetails/UserExpensesTotals/UserExpensesTotals";
import UserPaymentTotals from "../../components/features/UserDetails/UserPaymentsTotals/UserPaymentsTotals";
import { BALANCE_THRESHOLD } from "../../constants/dataConstants";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import useSetPreviousRouteInLocalStorage from "../../hooks/useSetPreviousRouteInLocalStorage";

/**
 * Fetches and renders detailed information about a user, including name, balance, total expenses and payments.
 * allows for user deletion if user is not associated with any payment or expense
 */
const UserDetailsPage = () => {
  const { userId } = useParams();
  const { userData } = useFetchUserData(userId);

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD so balance is considered settled
  if (userData && Math.abs(userData.userBalance) <= BALANCE_THRESHOLD) {
    userData.userBalance = 0;
  }

  // Set different CSS classes depending on userBalance state to set different colors
  const balanceClass =
    userData && userData.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - user details' />
      <PiratePx COUNT_IDENTIFIER={"user-details"} />
      <InAppNavigationBar back={true} />

      {userData ? (
        <div className={styles.container}>
          <h1>{userData.userName}</h1>
          <h2>
            {/* Display the userBalance with different color depending on the value */}
            balance:{" "}
            <span className={balanceClass}>
              {userData.userBalance.toFixed(2)}€
            </span>
          </h2>
          <UserExpenseTotals userData={userData} />
          <UserPaymentTotals userData={userData} />
          <h3>transaction history</h3>
          <RouteButton
            route={`user-transaction-history/${userId}`}
            buttonText='view history'
            setPreviousRoute={true}
            margin='0px'
          />
          <div className={styles.deleteButton}>
            <DeleteResource resourceId={userId} resourceType='users' />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default UserDetailsPage;
