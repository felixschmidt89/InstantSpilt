// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../constants/dataConstants";
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchUserData from "../../hooks/useFetchUserInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import UserExpenseTotals from "../../components/features/UserDetails/UserExpensesTotals/UserExpensesTotals";
import UserPaymentTotals from "../../components/features/UserDetails/UserPaymentsTotals/UserPaymentsTotals";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeResourceName from "../../components/common/ChangeResourceName/ChangeResourceName";
import Emoji from "../../components/common/Emoji/Emoji";

// Styles
import styles from "./UserDetailsPage.module.css";

const UserDetailsPage = () => {
  const { groupCode, userId } = useParams();
  const { userData, isFetched: userDataIsFetched } = useFetchUserData(userId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD so balance is considered settled
  if (userData && Math.abs(userData.userBalance) <= BALANCE_THRESHOLD) {
    userData.userBalance = 0;
  }

  const balanceClass =
    userData && userData.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - user details' />
      <PiratePx COUNT_IDENTIFIER={"user-details"} />
      <InAppNavigationBar back={true} />
      {userDataIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <h1>{userData.userName}</h1>
          <h2>
            balance:{" "}
            <span className={balanceClass}>
              {userData.userBalance.toFixed(2)}
              {groupCurrency}
            </span>
          </h2>
          <div className={styles.userBalances}>
            <UserExpenseTotals
              userData={userData}
              groupCurrency={groupCurrency}
            />
            <UserPaymentTotals
              userData={userData}
              groupCurrency={groupCurrency}
            />
            <RouteButton
              route={`user-transaction-history/${groupCode}/${userId}`}
              buttonText='view transaction history'
              setPreviousRoute={true}
              margin='0px'
            />
          </div>
          <div className={styles.userSettings}>
            <h3>
              user settings{" "}
              <Emoji label='settings emoji' emoji={emojiConstants.settings} />
            </h3>{" "}
            <ChangeResourceName
              resourceId={userId}
              resourceType='user'
              resourceName={userData.userName}
              groupCode={groupCode}
              inputWidth={20}
              navigateToMain={false}
            />
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
