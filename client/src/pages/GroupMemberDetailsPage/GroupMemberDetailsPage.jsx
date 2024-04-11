// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../constants/dataConstants";
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchGroupMemberData from "../../hooks/useFetchGroupMemberData";
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
import GroupMemberTotals from "../../components/features/GroupMemberTotals/UserTotals/GroupMemberTotals";

// Styles
import styles from "./GroupMemberDetailsPage.module.css";

const GroupMemberDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();
  const { groupMemberData, isFetched: groupMemberDataIsFetched } =
    useFetchGroupMemberData(userId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);
  const settingsEmoji = useSettingsEmoji();

  // Set userBalance to 0 if it's less than or equal to BALANCE_THRESHOLD so balance is considered settled
  if (
    groupMemberData &&
    Math.abs(groupMemberData.userBalance) <= BALANCE_THRESHOLD
  ) {
    groupMemberData.userBalance = 0;
  }

  const balanceClass =
    groupMemberData && groupMemberData.userBalance >= 0
      ? styles.positiveBalance
      : styles.negativeBalance;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("groupmember-details-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"groupmember-details"} />
      <InAppNavigationBar back={true} />
      {groupMemberDataIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <span className={styles.emoji}>
            <Emoji
              label={"group member emoji"}
              emoji={emojiConstants.member}></Emoji>
          </span>
          <h1>{groupMemberData.userName} </h1>
          <h2>
            {t("groupmember-details-page-balance-header")}{" "}
            <span className={balanceClass}>
              {groupMemberData.userBalance.toFixed(2)}
              {groupCurrency}
            </span>
          </h2>
          <div className={styles.userBalances}>
            <GroupMemberTotals
              groupMemberData={groupMemberData}
              groupCurrency={groupCurrency}
            />
          </div>
          <div className={styles.transactionHistoryButton}>
            <RouteButton
              route={`groupmember-transaction-history/${groupCode}/${userId}`}
              buttonText={t(
                "groupmember-details-page-transactions-history-button-text"
              )}
              setPreviousRoute={true}
              margin='0px'
            />
          </div>
          <div className={styles.userSettings}>
            <h3>
              {t("groupmember-details-page-settings-header")}{" "}
              <Emoji ariaLabel='settings emoji' emoji={settingsEmoji} />
            </h3>{" "}
            <h3>{t("groupmember-details-page-change-name-header")}</h3>
            <ChangeResourceName
              resourceId={userId}
              resourceType='user'
              resourceName={groupMemberData.userName}
              groupCode={groupCode}
              inputWidth={20}
              navigateToMain={false}
            />
          </div>
          <div className={styles.deleteGroupMemberButton}>
            <DeleteResource resourceId={userId} resourceType='users' />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default GroupMemberDetailsPage;
