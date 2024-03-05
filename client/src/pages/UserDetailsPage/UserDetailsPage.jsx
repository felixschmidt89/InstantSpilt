// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../constants/dataConstants";

// Hooks
import useFetchUserData from "../../hooks/useFetchUserInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";
import useSettingsEmoji from "../../hooks/useSettingsEmoji";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeResourceName from "../../components/common/ChangeResourceName/ChangeResourceName";
import Emoji from "../../components/common/Emoji/Emoji";
import UserTotals from "../../components/features/UserDetails/UserTotals/UserTotals";

// Styles
import styles from "./UserDetailsPage.module.css";

const UserDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();
  const { userData, isFetched: userDataIsFetched } = useFetchUserData(userId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);
  const settingsEmoji = useSettingsEmoji();

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
      <HelmetMetaTagsNetlify title={t("user-details-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"user-details"} />
      <InAppNavigationBar back={true} />
      {userDataIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <h1>{userData.userName}</h1>
          <h2>
            {t("user-details-page-user-balance-header")}{" "}
            <span className={balanceClass}>
              {userData.userBalance.toFixed(2)}
              {groupCurrency}
            </span>
          </h2>
          <div className={styles.userBalances}>
            <UserTotals userData={userData} groupCurrency={groupCurrency} />
            <div className={styles.transactionHistoryButton}>
              <RouteButton
                route={`user-transaction-history/${groupCode}/${userId}`}
                buttonText={t(
                  "user-details-page-transactions-history-button-text"
                )}
                setPreviousRoute={true}
                margin='0px'
              />
            </div>
          </div>
          <div className={styles.userSettings}>
            <h3>
              {t("user-details-page-user-settings-header")}{" "}
              <Emoji label='settings emoji' emoji={settingsEmoji} />
            </h3>{" "}
            <h3>{t("user-details-page-user-change-name-header")}</h3>
            <ChangeResourceName
              resourceId={userId}
              resourceType='user'
              resourceName={userData.userName}
              groupCode={groupCode}
              inputWidth={20}
              navigateToMain={false}
            />
          </div>
          <div className={styles.deleteUserButton}>
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
