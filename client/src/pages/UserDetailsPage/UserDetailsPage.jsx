import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import DeleteResourceButton from "../../components/common/DeleteResourceButton/DeleteResourceButton";
import RouteButton from "../../components/common/RouteButton/RouteButton";
import styles from "./UserDetailsPage.module.css";
import useFetchUserData from "../../hooks/useFetchUserInfo";
import UserExpenseTotals from "../../components/features/UserDetails/UserExpensesTotals/UserExpensesTotals";
import UserPaymentTotals from "../../components/features/UserDetails/UserPaymentsTotals/UserPaymentsTotals";

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

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
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      {userData ? (
        <div>
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
export default UserDetailsPage;
