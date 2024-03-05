// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "axios";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";
import { genericErrorMessage } from "../../constants/errorConstants";

// Hooks
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import UserTransactionsHistory from "../../components/features/UserTransactionsHistory/UserTransactionsHistory/UserTransactionsHistory";
import NoUserTransactions from "../../components/features/UserTransactionsHistory/NoUserTransactions/NoUserTransactions";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./UserTransactionHistoryPage.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserTransactionHistoryPage = () => {
  const { t } = useTranslation();
  const { groupCode, userId } = useParams();
  const [userExpensesAndPayments, setUserExpensesAndPayments] = useState([]);
  const { groupMembers, isFetched: groupMembersIsFetched } =
    useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  /**
   * Updates userExpensesAndPayments state to trigger a page rerender after the deletion of a resource.
   *
   * @param {string} itemId - The ID of the deleted resource.
   */
  const updateUserExpensesAndPaymentsAfterResourceDeletion = (itemId) => {
    const updatedItems = userExpensesAndPayments.filter(
      (item) => item._id !== itemId
    );
    devLog("User expenses and payments updated:", updatedItems);
    setUserExpensesAndPayments(updatedItems);
  };

  useEffect(() => {
    const fetchUserExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/${userId}/expenses-and-payments`
        );
        devLog(`User ${userId} expenses and payments fetched:`, response);
        const userTransactionalData = response.data.userExpensesAndPayments;
        devLog("userExpensesAndPayments:", userTransactionalData);
        setUserExpensesAndPayments(userTransactionalData);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching user expenses and payments:", error);
        setError(genericErrorMessage);
        setIsLoading(false);
      }
    };

    fetchUserExpensesAndPayments();
  }, [userId]);
  return (
    <main>
      <HelmetMetaTagsNetlify title={t("user-transaction-history-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"user-transaction-history"} />
      <InAppNavigationBar previousRoute={true} home={true} />
      {isLoading && currencyInfoIsFetched && groupMembersIsFetched ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{t("user-transaction-history-page-header")}</h1>
          {userExpensesAndPayments.length > 0 ? (
            <UserTransactionsHistory
              userExpensesAndPayments={userExpensesAndPayments}
              groupCode={groupCode}
              onDeleteResource={
                updateUserExpensesAndPaymentsAfterResourceDeletion
              }
              groupCurrency={groupCurrency}
              groupMembers={groupMembers}
            />
          ) : (
            <NoUserTransactions />
          )}
          <ErrorDisplay error={error} />
        </div>
      )}
    </main>
  );
};

export default UserTransactionHistoryPage;
